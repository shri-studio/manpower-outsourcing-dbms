import express from "express";
import { createServer as createViteServer } from "vite";
import pg from "pg";
const { Pool } = pg;
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Resend } from "resend";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        role: 'superadmin' | 'admin' | 'staff';
        company_id?: number;
      };
    }
  }
}

const resend = new Resend(process.env.RESEND_API_KEY);

// Middleware
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET as string, (err: any, decoded: any) => {
    if (err) return res.sendStatus(403);
    req.user = decoded;
    next();
  });
};

const isSuperAdmin = (req: any, res: any, next: any) => {
  if (req.user.role !== 'superadmin') return res.status(403).json({ message: "Access denied" });
  next();
};

const isAdmin = (req: any, res: any, next: any) => {
  if (req.user.role !== 'admin' && req.user.role !== 'superadmin') return res.status(403).json({ message: "Access denied" });
  next();
};


async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/login", async (req, res) => {
    const { email, password, isMaster } = req.body;
    try {
      const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
      const user = result.rows[0];
      
      if (!user) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }

      // Superadmin protection
      if (user.role === 'superadmin' && !isMaster) {
        return res.status(403).json({ success: false, message: "Access denied" });
      }

      // First login superadmin case
      if (isMaster && user.role === 'superadmin' && user.password_hash === null && user.is_first_login) {
        const token = jwt.sign(
          { id: user.id, email: user.email, role: user.role, company_id: user.company_id },
          process.env.JWT_SECRET as string,
          { expiresIn: '24h' }
        );
        return res.json({ success: true, token, user: { id: user.id, name: user.name, email: user.email, role: user.role, is_first_login: true } });
      }

      // Regular login
      if (!user.password_hash) {
        return res.status(401).json({ success: false, message: "Account not set up. Please use first login link." });
      }

      const match = await bcrypt.compare(password, user.password_hash);
      if (match) {
        const token = jwt.sign(
          { id: user.id, email: user.email, role: user.role, company_id: user.company_id },
          process.env.JWT_SECRET as string,
          { expiresIn: '24h' }
        );
        res.json({ 
          success: true, 
          token, 
          user: { id: user.id, name: user.name, email: user.email, role: user.role, is_first_login: user.is_first_login, company_id: user.company_id } 
        });
      } else {
        res.status(401).json({ success: false, message: "Invalid credentials" });
      }
    } catch (e: any) {
      res.status(500).json({ success: false, message: e.message });
    }
  });

  app.post("/api/set-password", async (req, res) => {
    const { email, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await pool.query(
        "UPDATE users SET password_hash = $1, is_first_login = false WHERE email = $2 RETURNING *",
        [hashedPassword, email]
      );
      const user = result.rows[0];
      if (user) {
        const token = jwt.sign(
          { id: user.id, email: user.email, role: user.role, company_id: user.company_id },
          process.env.JWT_SECRET as string,
          { expiresIn: '24h' }
        );
        res.json({ success: true, token, user: { id: user.id, name: user.name, email: user.email, role: user.role, is_first_login: false, company_id: user.company_id } });
      } else {
        res.status(404).json({ success: false, message: "User not found" });
      }
    } catch (e: any) {
      res.status(500).json({ success: false, message: e.message });
    }
  });

  app.post("/api/forgot-password", async (req, res) => {
    const { email } = req.body;
    try {
      const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
      const user = result.rows[0];

      if (user) {
        const resetToken = jwt.sign(
          { email: user.email, type: 'reset-password' },
          process.env.JWT_SECRET as string,
          { expiresIn: '1h' }
        );

        const appUrl = process.env.APP_URL || `http://localhost:3000`;
        const resetLink = `${appUrl}/reset-password?token=${resetToken}`;

        await resend.emails.send({
          from: 'Manpower DBMS <onboarding@resend.dev>',
          to: user.email,
          subject: 'Reset your Manpower DBMS password',
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background-color: #0A0F1E; color: #FFFFFF; padding: 40px; border-radius: 16px;">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #3B82F6; margin: 0;">Manpower DBMS</h1>
                <p style="color: #94A3B8; margin-top: 10px;">Workforce Management Platform</p>
              </div>
              <div style="background-color: #111827; padding: 30px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05);">
                <h2 style="margin-top: 0;">Reset Your Password</h2>
                <p style="color: #94A3B8; line-height: 1.6;">We received a request to reset your password. Click the button below to choose a new one.</p>
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${resetLink}" style="background-color: #3B82F6; color: #FFFFFF; padding: 14px 28px; border-radius: 9999px; text-decoration: none; font-weight: bold; display: inline-block;">Reset Password</a>
                </div>
                <p style="color: #94A3B8; font-size: 14px;">This link expires in 1 hour.</p>
                <p style="color: #94A3B8; font-size: 14px; margin-bottom: 0;">If you didn't request this, you can safely ignore this email.</p>
              </div>
              <div style="text-align: center; margin-top: 30px; color: #94A3B8; font-size: 12px;">
                &copy; ${new Date().getFullYear()} Manpower Outsourcing DBMS
              </div>
            </div>
          `
        });
      }

      // Always return success for security
      res.json({ success: true, message: "Check your email for reset instructions" });
    } catch (e: any) {
      console.error("Forgot password error:", e);
      res.status(500).json({ success: false, message: "Failed to process request" });
    }
  });

  app.post("/api/reset-password", async (req, res) => {
    const { token, password } = req.body;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
      
      if (decoded.type !== 'reset-password') {
        return res.status(400).json({ success: false, message: "Invalid token type" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await pool.query(
        "UPDATE users SET password_hash = $1, is_first_login = false WHERE email = $2 RETURNING *",
        [hashedPassword, decoded.email]
      );

      if (result.rowCount === 0) {
        return res.status(404).json({ success: false, message: "User not found" });
      }

      res.json({ success: true, message: "Password updated successfully" });
    } catch (e: any) {
      res.status(400).json({ success: false, message: "Invalid or expired token" });
    }
  });

  // Superadmin Routes
  app.get("/api/superadmin/companies", authenticateToken, isSuperAdmin, async (req, res) => {
    try {
      const result = await pool.query("SELECT * FROM companies ORDER BY name ASC");
      res.json(Array.isArray(result.rows) ? result.rows : []);
    } catch (e: any) {
      console.error("Fetch companies error:", e);
      res.json([]); // Always return an array as requested
    }
  });

  app.post("/api/superadmin/companies", authenticateToken, isSuperAdmin, async (req, res) => {
    const { company_name, email } = req.body;
    try {
      const result = await pool.query("INSERT INTO companies (name, email) VALUES ($1, $2) RETURNING id", [company_name, email]);
      res.json({ success: true, id: result.rows[0].id });
    } catch (e: any) {
      res.status(400).json({ success: false, message: e.message });
    }
  });

  app.post("/api/superadmin/admins", authenticateToken, isSuperAdmin, async (req, res) => {
    const { name, email, company_id } = req.body;
    const tempPassword = Math.random().toString(36).slice(-8);
    try {
      const hashedPassword = await bcrypt.hash(tempPassword, 10);
      const result = await pool.query(
        "INSERT INTO users (name, email, password_hash, role, company_id, is_first_login) VALUES ($1, $2, $3, 'admin', $4, true) RETURNING id",
        [name, email, hashedPassword, company_id]
      );
      
      // Send email
      await resend.emails.send({
        from: 'Manpower DBMS <onboarding@resend.dev>',
        to: email,
        subject: 'Welcome to Manpower DBMS',
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #333;">
            <h2>Welcome to Manpower Outsource DBMS</h2>
            <p>Hello ${name},</p>
            <p>Your admin account has been created. Here are your temporary login credentials:</p>
            <div style="background: #f4f4f4; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Temporary Password:</strong> ${tempPassword}</p>
            </div>
            <p>Please login and change your password immediately.</p>
            <p>Best regards,<br>Manpower DBMS Team</p>
          </div>
        `
      });

      res.json({ success: true, id: result.rows[0].id });
    } catch (e: any) {
      res.status(400).json({ success: false, message: e.message });
    }
  });

  // Admin Routes
  app.get("/api/admin/users", authenticateToken, isAdmin, async (req, res) => {
    try {
      let query = "SELECT id, name, email, role, is_first_login FROM users WHERE role = 'staff'";
      let params = [];
      
      if (req.user!.role !== 'superadmin') {
        query += " AND company_id = $1";
        params.push(req.user!.company_id);
      }
      
      const result = await pool.query(query, params);
      res.json(result.rows);
    } catch (e: any) {
      res.status(500).json({ success: false, message: e.message });
    }
  });

  app.post("/api/admin/users", authenticateToken, isAdmin, async (req, res) => {
    const { name, email } = req.body;
    const tempPassword = Math.random().toString(36).slice(-8);
    const company_id = req.user!.role === 'superadmin' ? req.body.company_id : req.user!.company_id;

    try {
      const hashedPassword = await bcrypt.hash(tempPassword, 10);
      const result = await pool.query(
        "INSERT INTO users (name, email, password_hash, role, company_id, is_first_login) VALUES ($1, $2, $3, 'staff', $4, true) RETURNING id",
        [name, email, hashedPassword, company_id]
      );

      // Send email
      await resend.emails.send({
        from: 'Manpower DBMS <onboarding@resend.dev>',
        to: email,
        subject: 'Your Manpower DBMS Account',
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #333;">
            <h2>Welcome to Manpower Outsource DBMS</h2>
            <p>Hello ${name},</p>
            <p>Your staff account has been created. Here are your temporary login credentials:</p>
            <div style="background: #f4f4f4; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Temporary Password:</strong> ${tempPassword}</p>
            </div>
            <p>Please login and change your password immediately.</p>
            <p>Best regards,<br>Manpower DBMS Team</p>
          </div>
        `
      });

      res.json({ success: true, id: result.rows[0].id });
    } catch (e: any) {
      res.status(400).json({ success: false, message: e.message });
    }
  });

  // Client Routes
  app.get("/api/clients", authenticateToken, async (req, res) => {
    try {
      let query = `
        SELECT c.*, 
        (SELECT COUNT(*) FROM employees e WHERE e.client_id = c.id) as employee_count
        FROM clients c
      `;
      let params = [];

      if (req.user!.role !== 'superadmin') {
        query += " WHERE c.company_id = $1";
        params.push(req.user!.company_id);
      }

      const clientsResult = await pool.query(query, params);
      const clients = clientsResult.rows;
      
      const clientsWithContacts = await Promise.all(clients.map(async (client: any) => {
        const contactsResult = await pool.query("SELECT * FROM client_contacts WHERE client_id = $1", [client.id]);
        return { ...client, contacts: contactsResult.rows };
      }));
      
      res.json(clientsWithContacts);
    } catch (e: any) {
      res.status(500).json({ success: false, message: e.message });
    }
  });

  app.post("/api/clients", authenticateToken, async (req, res) => {
    const { 
      company_name, location, sector, sector_other, unique_code, 
      cr_no, contract_type, contract_renewal_date, contacts 
    } = req.body;
    const company_id = req.user!.company_id;
    const created_by = req.user!.id;
    
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      
      const clientResult = await client.query(`
        INSERT INTO clients (
          company_name, location, sector, sector_other, unique_code, 
          cr_no, contract_type, contract_renewal_date, created_by, company_id
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING id
      `, [
        company_name, location, sector, sector_other, unique_code, 
        cr_no, contract_type, contract_renewal_date, created_by, company_id
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

  app.put("/api/clients/:id", authenticateToken, async (req, res) => {
    const { 
      company_name, location, sector, sector_other, unique_code, 
      cr_no, contract_type, contract_renewal_date, contacts 
    } = req.body;
    const clientId = req.params.id;

    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      
      // Verify ownership
      if (req.user!.role !== 'superadmin') {
        const check = await client.query("SELECT company_id FROM clients WHERE id = $1", [clientId]);
        if (check.rows[0]?.company_id !== req.user!.company_id) {
          throw new Error("Access denied");
        }
      }

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

  app.post("/api/clients/bulk", authenticateToken, async (req, res) => {
    const { clients } = req.body;
    const company_id = req.user!.company_id;
    const created_by = req.user!.id;

    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      for (const item of clients) {
        await client.query(`
          INSERT INTO clients (
            company_name, location, sector, sector_other, unique_code, 
            cr_no, contract_type, contract_renewal_date, created_by, company_id
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        `, [
          item.company_name, item.location, item.sector, item.sector_other || '', 
          item.unique_code, item.cr_no, item.contract_type, item.contract_renewal_date, created_by, company_id
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

  app.get("/api/employees", authenticateToken, async (req, res) => {
    try {
      let query = `
        SELECT e.*, c.company_name as client_name, 
        (SELECT COUNT(*) FROM dependants d WHERE d.employee_id = e.id) as no_of_dependants
        FROM employees e 
        LEFT JOIN clients c ON e.client_id = c.id
      `;
      let params = [];

      if (req.user!.role !== 'superadmin') {
        query += " WHERE e.company_id = $1";
        params.push(req.user!.company_id);
      }

      const result = await pool.query(query, params);
      res.json(result.rows);
    } catch (e: any) {
      res.status(500).json({ success: false, message: e.message });
    }
  });

  app.post("/api/employees", authenticateToken, async (req, res) => {
    const { 
      name, id_no, id_expiry_date, id_start_date, dob, gender, personal_details, salary, 
      basic_salary, accommodation_allowance, travel_allowance,
      client_id, employee_id_at_client, joining_date,
      insurance_provider, insurance_card_no, insurance_plan, insurance_expiry,
      address, country, visa_designation, mobile_no, personal_email,
      nationality, passport_no, passport_issuing_country, passport_issue_date, passport_expiry_date, permanent_address,
      emergency_contact_name, emergency_contact_phone, emergency_contact_relation
    } = req.body;
    const company_id = req.user!.company_id;
    const created_by = req.user!.id;

    try {
      const result = await pool.query(`
        INSERT INTO employees (
          name, id_no, id_expiry_date, id_start_date, dob, gender, personal_details, salary, 
          basic_salary, accommodation_allowance, travel_allowance,
          client_id, employee_id_at_client, joining_date, created_by, company_id,
          insurance_provider, insurance_card_no, insurance_plan, insurance_expiry,
          address, country, visa_designation, mobile_no, personal_email,
          nationality, passport_no, passport_issuing_country, passport_issue_date, passport_expiry_date, permanent_address,
          emergency_contact_name, emergency_contact_phone, emergency_contact_relation
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34)
        RETURNING id
      `, [
        name, id_no, id_expiry_date, id_start_date, dob, gender, personal_details, salary, 
        basic_salary, accommodation_allowance, travel_allowance,
        client_id, employee_id_at_client, joining_date, created_by, company_id,
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

  app.put("/api/employees/:id", authenticateToken, async (req, res) => {
    const { 
      name, id_no, id_expiry_date, id_start_date, dob, gender, personal_details, salary, 
      basic_salary, accommodation_allowance, travel_allowance,
      client_id, employee_id_at_client, joining_date,
      insurance_provider, insurance_card_no, insurance_plan, insurance_expiry,
      address, country, visa_designation, mobile_no, personal_email,
      nationality, passport_no, passport_issuing_country, passport_issue_date, passport_expiry_date, permanent_address,
      emergency_contact_name, emergency_contact_phone, emergency_contact_relation
    } = req.body;
    const employeeId = req.params.id;

    try {
      // Verify ownership
      if (req.user!.role !== 'superadmin') {
        const check = await pool.query("SELECT company_id FROM employees WHERE id = $1", [employeeId]);
        if (check.rows[0]?.company_id !== req.user!.company_id) {
          return res.status(403).json({ message: "Access denied" });
        }
      }

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
        employeeId
      ]);
      res.json({ success: true });
    } catch (e: any) {
      res.status(400).json({ success: false, message: e.message });
    }
  });

  app.post("/api/employees/bulk", authenticateToken, async (req, res) => {
    const { employees } = req.body;
    const company_id = req.user!.company_id;
    const created_by = req.user!.id;

    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      for (const item of employees) {
        await client.query(`
          INSERT INTO employees (
            name, id_no, id_expiry_date, dob, gender, personal_details, salary, 
            client_id, employee_id_at_client, joining_date, created_by, company_id
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        `, [
          item.name, item.id_no, item.id_expiry_date, item.dob, item.gender, item.personal_details, item.salary, 
          item.client_id, item.employee_id_at_client, item.joining_date, created_by, company_id
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

  app.get("/api/employees/:id", authenticateToken, async (req, res) => {
    try {
      let query = `
        SELECT e.*, c.company_name as client_name 
        FROM employees e 
        LEFT JOIN clients c ON e.client_id = c.id
        WHERE e.id = $1
      `;
      let params: any[] = [req.params.id];

      if (req.user!.role !== 'superadmin') {
        query += " AND e.company_id = $2";
        params.push(req.user!.company_id);
      }

      const result = await pool.query(query, params);
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
  app.get("/api/dependants", authenticateToken, async (req, res) => {
    try {
      let query = `
        SELECT d.*, e.name as employee_name 
        FROM dependants d 
        LEFT JOIN employees e ON d.employee_id = e.id
      `;
      let params = [];

      if (req.user!.role !== 'superadmin') {
        query += " WHERE d.company_id = $1";
        params.push(req.user!.company_id);
      }

      const result = await pool.query(query, params);
      res.json(result.rows);
    } catch (e: any) {
      res.status(500).json({ success: false, message: e.message });
    }
  });

  app.post("/api/dependants", authenticateToken, async (req, res) => {
    const { 
      name, id_no, id_expiry_date, id_start_date, dob, gender, relationship, employee_id,
      insurance_provider, insurance_card_no, insurance_plan, insurance_expiry,
      mobile_no, personal_email, nationality, address, country,
      passport_no, passport_issuing_country, passport_issue_date, passport_expiry_date, permanent_address
    } = req.body;
    const company_id = req.user!.company_id;
    const created_by = req.user!.id;

    try {
      const result = await pool.query(`
        INSERT INTO dependants (
          name, id_no, id_expiry_date, id_start_date, dob, gender, relationship, employee_id, created_by, company_id,
          insurance_provider, insurance_card_no, insurance_plan, insurance_expiry,
          mobile_no, personal_email, nationality, address, country,
          passport_no, passport_issuing_country, passport_issue_date, passport_expiry_date, permanent_address
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24)
        RETURNING id
      `, [
        name, id_no, id_expiry_date, id_start_date, dob, gender, relationship, employee_id, created_by, company_id,
        insurance_provider, insurance_card_no, insurance_plan, insurance_expiry,
        mobile_no, personal_email, nationality, address, country,
        passport_no, passport_issuing_country, passport_issue_date, passport_expiry_date, permanent_address
      ]);
      res.json({ success: true, id: result.rows[0].id });
    } catch (e: any) {
      res.status(400).json({ success: false, message: e.message });
    }
  });

  app.put("/api/dependants/:id", authenticateToken, async (req, res) => {
    const { 
      name, id_no, id_expiry_date, id_start_date, dob, gender, relationship, employee_id,
      insurance_provider, insurance_card_no, insurance_plan, insurance_expiry,
      mobile_no, personal_email, nationality, address, country,
      passport_no, passport_issuing_country, passport_issue_date, passport_expiry_date, permanent_address
    } = req.body;
    const dependantId = req.params.id;

    try {
      // Verify ownership
      if (req.user!.role !== 'superadmin') {
        const check = await pool.query("SELECT company_id FROM dependants WHERE id = $1", [dependantId]);
        if (check.rows[0]?.company_id !== req.user!.company_id) {
          return res.status(403).json({ message: "Access denied" });
        }
      }

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
        dependantId
      ]);
      res.json({ success: true });
    } catch (e: any) {
      res.status(400).json({ success: false, message: e.message });
    }
  });

  app.post("/api/dependants/bulk", authenticateToken, async (req, res) => {
    const { dependants } = req.body;
    const company_id = req.user!.company_id;
    const created_by = req.user!.id;

    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      for (const item of dependants) {
        await client.query(`
          INSERT INTO dependants (
            name, id_no, id_expiry_date, id_start_date, dob, gender, relationship, employee_id, created_by, company_id
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        `, [
          item.name, item.id_no, item.id_expiry_date, item.id_start_date, item.dob, item.gender, item.relationship, item.employee_id, created_by, company_id
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
    app.use(express.static(path.join(process.cwd(), "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(process.cwd(), "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
