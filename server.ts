import express from "express";
import { createServer as createViteServer } from "vite";
import pg from "pg";
const { Pool } = pg;
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Initialize Database

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/login", async (req, res) => {
    const { code } = req.body;
    try {
      const result = await pool.query("SELECT * FROM users WHERE login_code = $1", [code]);
      const user = result.rows[0];
      if (user) {
        res.json({ success: true, user });
      } else {
        res.status(401).json({ success: false, message: "Invalid login code" });
      }
    } catch (e: any) {
      res.status(500).json({ success: false, message: e.message });
    }
  });

  // Admin Routes
  app.get("/api/admin/users", async (req, res) => {
    try {
      const result = await pool.query("SELECT * FROM users WHERE role = 'staff'");
      res.json(result.rows);
    } catch (e: any) {
      res.status(500).json({ success: false, message: e.message });
    }
  });

  app.post("/api/admin/users", async (req, res) => {
    const { name, login_code } = req.body;
    try {
      const result = await pool.query("INSERT INTO users (name, login_code, role) VALUES ($1, $2, 'staff') RETURNING id", [name, login_code]);
      res.json({ success: true, id: result.rows[0].id });
    } catch (e: any) {
      res.status(400).json({ success: false, message: e.message });
    }
  });

  // Client Routes
  app.get("/api/clients", async (req, res) => {
    try {
      const clientsResult = await pool.query(`
        SELECT c.*, 
        (SELECT COUNT(*) FROM employees e WHERE e.client_id = c.id) as employee_count
        FROM clients c
      `);
      
      const clients = clientsResult.rows;
      
      // Fetch contacts for each client
      const clientsWithContacts = await Promise.all(clients.map(async (client: any) => {
        const contactsResult = await pool.query("SELECT * FROM client_contacts WHERE client_id = $1", [client.id]);
        return { ...client, contacts: contactsResult.rows };
      }));
      
      res.json(clientsWithContacts);
    } catch (e: any) {
      res.status(500).json({ success: false, message: e.message });
    }
  });

  app.post("/api/clients", async (req, res) => {
    const { 
      company_name, location, sector, sector_other, unique_code, 
      cr_no, contract_type, contract_renewal_date, 
      created_by, contacts 
    } = req.body;
    
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      
      const clientResult = await client.query(`
        INSERT INTO clients (
          company_name, location, sector, sector_other, unique_code, 
          cr_no, contract_type, contract_renewal_date, created_by
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING id
      `, [
        company_name, location, sector, sector_other, unique_code, 
        cr_no, contract_type, contract_renewal_date, created_by
      ]);
      
      const clientId = clientResult.rows[0].id;
      
      if (contacts && Array.isArray(contacts)) {
        for (const contact of contacts) {
          await client.query(`
            INSERT INTO client_contacts (client_id, name, designation, mobile_no, email)
            VALUES ($1, $2, $3, $4, $5)
          `, [clientId, contact.name, contact.designation, contact.mobile_no, contact.email]);
        }
      }
      
      await client.query("COMMIT");
      res.json({ success: true, id: clientId });
    } catch (e: any) {
      await client.query("ROLLBACK");
      res.status(400).json({ success: false, message: e.message });
    } finally {
      client.release();
    }
  });

  app.put("/api/clients/:id", async (req, res) => {
    const { 
      company_name, location, sector, sector_other, unique_code, 
      cr_no, contract_type, contract_renewal_date, contacts 
    } = req.body;
    const clientId = req.params.id;

    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      
      await client.query(`
        UPDATE clients SET 
          company_name = $1, location = $2, sector = $3, sector_other = $4, 
          unique_code = $5, cr_no = $6, contract_type = $7, contract_renewal_date = $8
        WHERE id = $9
      `, [
        company_name, location, sector, sector_other, unique_code, 
        cr_no, contract_type, contract_renewal_date, clientId
      ]);
      
      await client.query("DELETE FROM client_contacts WHERE client_id = $1", [clientId]);
      
      if (contacts && Array.isArray(contacts)) {
        for (const contact of contacts) {
          await client.query(`
            INSERT INTO client_contacts (client_id, name, designation, mobile_no, email)
            VALUES ($1, $2, $3, $4, $5)
          `, [clientId, contact.name, contact.designation, contact.mobile_no, contact.email]);
        }
      }
      
      await client.query("COMMIT");
      res.json({ success: true });
    } catch (e: any) {
      await client.query("ROLLBACK");
      res.status(400).json({ success: false, message: e.message });
    } finally {
      client.release();
    }
  });

  app.post("/api/clients/bulk", async (req, res) => {
    const { clients, created_by } = req.body;
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      for (const item of clients) {
        await client.query(`
          INSERT INTO clients (
            company_name, location, sector, sector_other, unique_code, 
            cr_no, contract_type, contract_renewal_date, created_by
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        `, [
          item.company_name, item.location, item.sector, item.sector_other || '', 
          item.unique_code, item.cr_no, item.contract_type, item.contract_renewal_date, created_by
        ]);
      }
      await client.query("COMMIT");
      res.json({ success: true });
    } catch (e: any) {
      await client.query("ROLLBACK");
      res.status(400).json({ success: false, message: e.message });
    } finally {
      client.release();
    }
  });

  app.get("/api/employees", async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT e.*, c.company_name as client_name, 
        (SELECT COUNT(*) FROM dependants d WHERE d.employee_id = e.id) as no_of_dependants
        FROM employees e 
        LEFT JOIN clients c ON e.client_id = c.id
      `);
      res.json(result.rows);
    } catch (e: any) {
      res.status(500).json({ success: false, message: e.message });
    }
  });

  app.post("/api/employees", async (req, res) => {
    const { 
      name, id_no, id_expiry_date, id_start_date, dob, gender, personal_details, salary, 
      basic_salary, accommodation_allowance, travel_allowance,
      client_id, employee_id_at_client, joining_date, created_by,
      insurance_provider, insurance_card_no, insurance_plan, insurance_expiry,
      address, country, visa_designation, mobile_no, personal_email,
      nationality, passport_no, passport_issuing_country, passport_issue_date, passport_expiry_date, permanent_address,
      emergency_contact_name, emergency_contact_phone, emergency_contact_relation
    } = req.body;
    try {
      const result = await pool.query(`
        INSERT INTO employees (
          name, id_no, id_expiry_date, id_start_date, dob, gender, personal_details, salary, 
          basic_salary, accommodation_allowance, travel_allowance,
          client_id, employee_id_at_client, joining_date, created_by,
          insurance_provider, insurance_card_no, insurance_plan, insurance_expiry,
          address, country, visa_designation, mobile_no, personal_email,
          nationality, passport_no, passport_issuing_country, passport_issue_date, passport_expiry_date, permanent_address,
          emergency_contact_name, emergency_contact_phone, emergency_contact_relation
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33)
        RETURNING id
      `, [
        name, id_no, id_expiry_date, id_start_date, dob, gender, personal_details, salary, 
        basic_salary, accommodation_allowance, travel_allowance,
        client_id, employee_id_at_client, joining_date, created_by,
        insurance_provider, insurance_card_no, insurance_plan, insurance_expiry,
        address, country, visa_designation, mobile_no, personal_email,
        nationality, passport_no, passport_issuing_country, passport_issue_date, passport_expiry_date, permanent_address,
        emergency_contact_name, emergency_contact_phone, emergency_contact_relation
      ]);
      res.json({ success: true, id: result.rows[0].id });
    } catch (e: any) {
      res.status(400).json({ success: false, message: e.message });
    }
  });

  app.put("/api/employees/:id", async (req, res) => {
    const { 
      name, id_no, id_expiry_date, id_start_date, dob, gender, personal_details, salary, 
      basic_salary, accommodation_allowance, travel_allowance,
      client_id, employee_id_at_client, joining_date,
      insurance_provider, insurance_card_no, insurance_plan, insurance_expiry,
      address, country, visa_designation, mobile_no, personal_email,
      nationality, passport_no, passport_issuing_country, passport_issue_date, passport_expiry_date, permanent_address,
      emergency_contact_name, emergency_contact_phone, emergency_contact_relation
    } = req.body;
    try {
      await pool.query(`
        UPDATE employees SET 
          name = $1, id_no = $2, id_expiry_date = $3, id_start_date = $4, dob = $5, gender = $6, 
          personal_details = $7, salary = $8, 
          basic_salary = $9, accommodation_allowance = $10, travel_allowance = $11,
          client_id = $12, 
          employee_id_at_client = $13, joining_date = $14,
          insurance_provider = $15, insurance_card_no = $16, insurance_plan = $17, insurance_expiry = $18,
          address = $19, country = $20, visa_designation = $21, mobile_no = $22, personal_email = $23,
          nationality = $24, passport_no = $25, passport_issuing_country = $26, passport_issue_date = $27, passport_expiry_date = $28, permanent_address = $29,
          emergency_contact_name = $30, emergency_contact_phone = $31, emergency_contact_relation = $32
        WHERE id = $33
      `, [
        name, id_no, id_expiry_date, id_start_date, dob, gender, personal_details, salary, 
        basic_salary, accommodation_allowance, travel_allowance,
        client_id, employee_id_at_client, joining_date,
        insurance_provider, insurance_card_no, insurance_plan, insurance_expiry,
        address, country, visa_designation, mobile_no, personal_email,
        nationality, passport_no, passport_issuing_country, passport_issue_date, passport_expiry_date, permanent_address,
        emergency_contact_name, emergency_contact_phone, emergency_contact_relation,
        req.params.id
      ]);
      res.json({ success: true });
    } catch (e: any) {
      res.status(400).json({ success: false, message: e.message });
    }
  });

  app.post("/api/employees/bulk", async (req, res) => {
    const { employees, created_by } = req.body;
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      for (const item of employees) {
        await client.query(`
          INSERT INTO employees (
            name, id_no, id_expiry_date, dob, gender, personal_details, salary, 
            client_id, employee_id_at_client, joining_date, created_by
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        `, [
          item.name, item.id_no, item.id_expiry_date, item.dob, item.gender, item.personal_details, item.salary, 
          item.client_id, item.employee_id_at_client, item.joining_date, created_by
        ]);
      }
      await client.query("COMMIT");
      res.json({ success: true });
    } catch (e: any) {
      await client.query("ROLLBACK");
      res.status(400).json({ success: false, message: e.message });
    } finally {
      client.release();
    }
  });

  app.get("/api/employees/:id", async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT e.*, c.company_name as client_name 
        FROM employees e 
        LEFT JOIN clients c ON e.client_id = c.id
        WHERE e.id = $1
      `, [req.params.id]);
      const employee = result.rows[0];
      if (employee) {
        res.json(employee);
      } else {
        res.status(404).json({ message: "Employee not found" });
      }
    } catch (e: any) {
      res.status(500).json({ success: false, message: e.message });
    }
  });

  // Dependant Routes
  app.get("/api/dependants", async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT d.*, e.name as employee_name 
        FROM dependants d 
        LEFT JOIN employees e ON d.employee_id = e.id
      `);
      res.json(result.rows);
    } catch (e: any) {
      res.status(500).json({ success: false, message: e.message });
    }
  });

  app.post("/api/dependants", async (req, res) => {
    const { 
      name, id_no, id_expiry_date, id_start_date, dob, gender, relationship, employee_id, created_by,
      insurance_provider, insurance_card_no, insurance_plan, insurance_expiry,
      mobile_no, personal_email, nationality, address, country,
      passport_no, passport_issuing_country, passport_issue_date, passport_expiry_date, permanent_address
    } = req.body;
    try {
      const result = await pool.query(`
        INSERT INTO dependants (
          name, id_no, id_expiry_date, id_start_date, dob, gender, relationship, employee_id, created_by,
          insurance_provider, insurance_card_no, insurance_plan, insurance_expiry,
          mobile_no, personal_email, nationality, address, country,
          passport_no, passport_issuing_country, passport_issue_date, passport_expiry_date, permanent_address
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23)
        RETURNING id
      `, [
        name, id_no, id_expiry_date, id_start_date, dob, gender, relationship, employee_id, created_by,
        insurance_provider, insurance_card_no, insurance_plan, insurance_expiry,
        mobile_no, personal_email, nationality, address, country,
        passport_no, passport_issuing_country, passport_issue_date, passport_expiry_date, permanent_address
      ]);
      res.json({ success: true, id: result.rows[0].id });
    } catch (e: any) {
      res.status(400).json({ success: false, message: e.message });
    }
  });

  app.put("/api/dependants/:id", async (req, res) => {
    const { 
      name, id_no, id_expiry_date, id_start_date, dob, gender, relationship, employee_id,
      insurance_provider, insurance_card_no, insurance_plan, insurance_expiry,
      mobile_no, personal_email, nationality, address, country,
      passport_no, passport_issuing_country, passport_issue_date, passport_expiry_date, permanent_address
    } = req.body;
    try {
      await pool.query(`
        UPDATE dependants SET 
          name = $1, id_no = $2, id_expiry_date = $3, id_start_date = $4, dob = $5, 
          gender = $6, relationship = $7, employee_id = $8,
          insurance_provider = $9, insurance_card_no = $10, insurance_plan = $11, insurance_expiry = $12,
          mobile_no = $13, personal_email = $14, nationality = $15, address = $16, country = $17,
          passport_no = $18, passport_issuing_country = $19, passport_issue_date = $20, passport_expiry_date = $21, permanent_address = $22
        WHERE id = $23
      `, [
        name, id_no, id_expiry_date, id_start_date, dob, gender, relationship, employee_id, 
        insurance_provider, insurance_card_no, insurance_plan, insurance_expiry,
        mobile_no, personal_email, nationality, address, country,
        passport_no, passport_issuing_country, passport_issue_date, passport_expiry_date, permanent_address,
        req.params.id
      ]);
      res.json({ success: true });
    } catch (e: any) {
      res.status(400).json({ success: false, message: e.message });
    }
  });

  app.post("/api/dependants/bulk", async (req, res) => {
    const { dependants, created_by } = req.body;
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      for (const item of dependants) {
        await client.query(`
          INSERT INTO dependants (
            name, id_no, id_expiry_date, id_start_date, dob, gender, relationship, employee_id, created_by
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        `, [
          item.name, item.id_no, item.id_expiry_date, item.id_start_date, item.dob, item.gender, item.relationship, item.employee_id, created_by
        ]);
      }
      await client.query("COMMIT");
      res.json({ success: true });
    } catch (e: any) {
      await client.query("ROLLBACK");
      res.status(400).json({ success: false, message: e.message });
    } finally {
      client.release();
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
