import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("manpower.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    login_code TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL DEFAULT 'staff'
  );

  CREATE TABLE IF NOT EXISTS clients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_name TEXT NOT NULL,
    location TEXT,
    sector TEXT,
    contact_person TEXT,
    unique_code TEXT UNIQUE,
    status TEXT DEFAULT 'approved',
    created_by INTEGER,
    FOREIGN KEY(created_by) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS client_contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    designation TEXT,
    mobile_no TEXT,
    email TEXT,
    FOREIGN KEY(client_id) REFERENCES clients(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    id_no TEXT,
    id_expiry_date TEXT,
    dob TEXT,
    gender TEXT,
    personal_details TEXT,
    salary REAL,
    client_id INTEGER,
    employee_id_at_client TEXT,
    joining_date TEXT,
    no_of_dependants INTEGER DEFAULT 0,
    insurance_provider TEXT,
    insurance_card_no TEXT,
    insurance_plan TEXT,
    insurance_expiry TEXT,
    address TEXT,
    emergency_contact_name TEXT,
    emergency_contact_phone TEXT,
    emergency_contact_relation TEXT,
    status TEXT DEFAULT 'approved',
    created_by INTEGER,
    FOREIGN KEY(client_id) REFERENCES clients(id),
    FOREIGN KEY(created_by) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS dependants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    id_no TEXT,
    id_expiry_date TEXT,
    dob TEXT,
    gender TEXT,
    relationship TEXT,
    employee_id INTEGER,
    insurance_provider TEXT,
    insurance_card_no TEXT,
    insurance_plan TEXT,
    insurance_expiry TEXT,
    created_by INTEGER,
    FOREIGN KEY(employee_id) REFERENCES employees(id),
    FOREIGN KEY(created_by) REFERENCES users(id)
  );
`);

// Seed Admin if not exists
const adminExists = db.prepare("SELECT * FROM users WHERE role = 'admin'").get();
if (!adminExists) {
  db.prepare("INSERT INTO users (name, login_code, role) VALUES (?, ?, ?)").run("Admin", "0608", "admin");
}

// Migration: Add no_of_dependants to employees if not exists
try {
  db.prepare("ALTER TABLE employees ADD COLUMN no_of_dependants INTEGER DEFAULT 0").run();
} catch (e) {
  // Column likely already exists
}

// Migration: Add id_expiry_date to employees if not exists
try {
  db.prepare("ALTER TABLE employees ADD COLUMN id_expiry_date TEXT").run();
} catch (e) {}

// Migration: Add gender to employees if not exists
try {
  db.prepare("ALTER TABLE employees ADD COLUMN gender TEXT").run();
} catch (e) {}

// Migration: Add gender to dependants if not exists
try {
  db.prepare("ALTER TABLE dependants ADD COLUMN gender TEXT").run();
} catch (e) {}

// Migration: Add relationship to dependants if not exists
try {
  db.prepare("ALTER TABLE dependants ADD COLUMN relationship TEXT").run();
} catch (e) {}

// New Migrations for Medical Insurance and Address
const migrations = [
  { table: 'employees', column: 'insurance_provider', type: 'TEXT' },
  { table: 'employees', column: 'insurance_card_no', type: 'TEXT' },
  { table: 'employees', column: 'insurance_plan', type: 'TEXT' },
  { table: 'employees', column: 'insurance_expiry', type: 'TEXT' },
  { table: 'employees', column: 'address', type: 'TEXT' },
  { table: 'employees', column: 'emergency_contact_name', type: 'TEXT' },
  { table: 'employees', column: 'emergency_contact_phone', type: 'TEXT' },
  { table: 'employees', column: 'emergency_contact_relation', type: 'TEXT' },
  { table: 'employees', column: 'country', type: 'TEXT' },
  { table: 'employees', column: 'id_start_date', type: 'TEXT' },
  { table: 'employees', column: 'visa_designation', type: 'TEXT' },
  { table: 'employees', column: 'basic_salary', type: 'REAL' },
  { table: 'employees', column: 'accommodation_allowance', type: 'REAL' },
  { table: 'employees', column: 'travel_allowance', type: 'REAL' },
  { table: 'employees', column: 'mobile_no', type: 'TEXT' },
  { table: 'employees', column: 'personal_email', type: 'TEXT' },
  { table: 'dependants', column: 'id_start_date', type: 'TEXT' },
  { table: 'dependants', column: 'insurance_provider', type: 'TEXT' },
  { table: 'dependants', column: 'insurance_card_no', type: 'TEXT' },
  { table: 'dependants', column: 'insurance_plan', type: 'TEXT' },
  { table: 'dependants', column: 'insurance_expiry', type: 'TEXT' },
  { table: 'clients', column: 'cr_no', type: 'TEXT' },
  { table: 'clients', column: 'contract_type', type: 'TEXT' },
  { table: 'clients', column: 'contract_renewal_date', type: 'TEXT' },
  { table: 'clients', column: 'sector_other', type: 'TEXT' },
  { table: 'employees', column: 'nationality', type: 'TEXT' },
  { table: 'employees', column: 'passport_no', type: 'TEXT' },
  { table: 'employees', column: 'passport_issuing_country', type: 'TEXT' },
  { table: 'employees', column: 'passport_issue_date', type: 'TEXT' },
  { table: 'employees', column: 'passport_expiry_date', type: 'TEXT' },
  { table: 'employees', column: 'permanent_address', type: 'TEXT' },
  { table: 'dependants', column: 'mobile_no', type: 'TEXT' },
  { table: 'dependants', column: 'personal_email', type: 'TEXT' },
  { table: 'dependants', column: 'nationality', type: 'TEXT' },
  { table: 'dependants', column: 'address', type: 'TEXT' },
  { table: 'dependants', column: 'country', type: 'TEXT' },
  { table: 'dependants', column: 'passport_no', type: 'TEXT' },
  { table: 'dependants', column: 'passport_issuing_country', type: 'TEXT' },
  { table: 'dependants', column: 'passport_issue_date', type: 'TEXT' },
  { table: 'dependants', column: 'passport_expiry_date', type: 'TEXT' },
  { table: 'dependants', column: 'permanent_address', type: 'TEXT' },
  { table: 'dependants', column: 'id_start_date', type: 'TEXT' },
];

migrations.forEach(m => {
  try {
    db.prepare(`ALTER TABLE ${m.table} ADD COLUMN ${m.column} ${m.type}`).run();
  } catch (e) {}
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/login", (req, res) => {
    const { code } = req.body;
    const user = db.prepare("SELECT * FROM users WHERE login_code = ?").get(code);
    if (user) {
      res.json({ success: true, user });
    } else {
      res.status(401).json({ success: false, message: "Invalid login code" });
    }
  });

  // Admin Routes
  app.get("/api/admin/users", (req, res) => {
    const users = db.prepare("SELECT * FROM users WHERE role = 'staff'").all();
    res.json(users);
  });

  app.post("/api/admin/users", (req, res) => {
    const { name, login_code } = req.body;
    try {
      const result = db.prepare("INSERT INTO users (name, login_code, role) VALUES (?, ?, 'staff')").run(name, login_code);
      res.json({ success: true, id: result.lastInsertRowid });
    } catch (e: any) {
      res.status(400).json({ success: false, message: e.message });
    }
  });

  // Client Routes
  app.get("/api/clients", (req, res) => {
    const clients = db.prepare(`
      SELECT c.*, 
      (SELECT COUNT(*) FROM employees e WHERE e.client_id = c.id) as employee_count
      FROM clients c
    `).all();
    
    // Fetch contacts for each client
    const clientsWithContacts = clients.map((client: any) => {
      const contacts = db.prepare("SELECT * FROM client_contacts WHERE client_id = ?").all(client.id);
      return { ...client, contacts };
    });
    
    res.json(clientsWithContacts);
  });

  app.post("/api/clients", (req, res) => {
    const { 
      company_name, location, sector, sector_other, unique_code, 
      cr_no, contract_type, contract_renewal_date, 
      created_by, contacts 
    } = req.body;
    
    try {
      const insertClient = db.prepare(`
        INSERT INTO clients (
          company_name, location, sector, sector_other, unique_code, 
          cr_no, contract_type, contract_renewal_date, created_by
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      
      const insertContact = db.prepare(`
        INSERT INTO client_contacts (client_id, name, designation, mobile_no, email)
        VALUES (?, ?, ?, ?, ?)
      `);

      const result = db.transaction(() => {
        const clientResult = insertClient.run(
          company_name, location, sector, sector_other, unique_code, 
          cr_no, contract_type, contract_renewal_date, created_by
        );
        const clientId = clientResult.lastInsertRowid;
        
        if (contacts && Array.isArray(contacts)) {
          for (const contact of contacts) {
            insertContact.run(clientId, contact.name, contact.designation, contact.mobile_no, contact.email);
          }
        }
        return clientId;
      })();

      res.json({ success: true, id: result });
    } catch (e: any) {
      res.status(400).json({ success: false, message: e.message });
    }
  });

  app.put("/api/clients/:id", (req, res) => {
    const { 
      company_name, location, sector, sector_other, unique_code, 
      cr_no, contract_type, contract_renewal_date, contacts 
    } = req.body;
    const clientId = req.params.id;

    try {
      const updateClient = db.prepare(`
        UPDATE clients SET 
          company_name = ?, location = ?, sector = ?, sector_other = ?, 
          unique_code = ?, cr_no = ?, contract_type = ?, contract_renewal_date = ?
        WHERE id = ?
      `);
      
      const deleteContacts = db.prepare("DELETE FROM client_contacts WHERE client_id = ?");
      const insertContact = db.prepare(`
        INSERT INTO client_contacts (client_id, name, designation, mobile_no, email)
        VALUES (?, ?, ?, ?, ?)
      `);

      db.transaction(() => {
        updateClient.run(
          company_name, location, sector, sector_other, unique_code, 
          cr_no, contract_type, contract_renewal_date, clientId
        );
        
        deleteContacts.run(clientId);
        
        if (contacts && Array.isArray(contacts)) {
          for (const contact of contacts) {
            insertContact.run(clientId, contact.name, contact.designation, contact.mobile_no, contact.email);
          }
        }
      })();

      res.json({ success: true });
    } catch (e: any) {
      res.status(400).json({ success: false, message: e.message });
    }
  });

  app.post("/api/clients/bulk", (req, res) => {
    const { clients, created_by } = req.body;
    const insert = db.prepare(`
      INSERT INTO clients (
        company_name, location, sector, sector_other, unique_code, 
        cr_no, contract_type, contract_renewal_date, created_by
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const insertMany = db.transaction((data) => {
      for (const item of data) {
        insert.run(
          item.company_name, item.location, item.sector, item.sector_other || '', 
          item.unique_code, item.cr_no, item.contract_type, item.contract_renewal_date, created_by
        );
      }
    });

    try {
      insertMany(clients);
      res.json({ success: true });
    } catch (e: any) {
      res.status(400).json({ success: false, message: e.message });
    }
  });
  app.get("/api/employees", (req, res) => {
    const employees = db.prepare(`
      SELECT e.*, c.company_name as client_name, 
      (SELECT COUNT(*) FROM dependants d WHERE d.employee_id = e.id) as no_of_dependants
      FROM employees e 
      LEFT JOIN clients c ON e.client_id = c.id
    `).all();
    res.json(employees);
  });

  app.post("/api/employees", (req, res) => {
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
      const result = db.prepare(`
        INSERT INTO employees (
          name, id_no, id_expiry_date, id_start_date, dob, gender, personal_details, salary, 
          basic_salary, accommodation_allowance, travel_allowance,
          client_id, employee_id_at_client, joining_date, created_by,
          insurance_provider, insurance_card_no, insurance_plan, insurance_expiry,
          address, country, visa_designation, mobile_no, personal_email,
          nationality, passport_no, passport_issuing_country, passport_issue_date, passport_expiry_date, permanent_address,
          emergency_contact_name, emergency_contact_phone, emergency_contact_relation
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        name, id_no, id_expiry_date, id_start_date, dob, gender, personal_details, salary, 
        basic_salary, accommodation_allowance, travel_allowance,
        client_id, employee_id_at_client, joining_date, created_by,
        insurance_provider, insurance_card_no, insurance_plan, insurance_expiry,
        address, country, visa_designation, mobile_no, personal_email,
        nationality, passport_no, passport_issuing_country, passport_issue_date, passport_expiry_date, permanent_address,
        emergency_contact_name, emergency_contact_phone, emergency_contact_relation
      );
      res.json({ success: true, id: result.lastInsertRowid });
    } catch (e: any) {
      res.status(400).json({ success: false, message: e.message });
    }
  });

  app.put("/api/employees/:id", (req, res) => {
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
      db.prepare(`
        UPDATE employees SET 
          name = ?, id_no = ?, id_expiry_date = ?, id_start_date = ?, dob = ?, gender = ?, 
          personal_details = ?, salary = ?, 
          basic_salary = ?, accommodation_allowance = ?, travel_allowance = ?,
          client_id = ?, 
          employee_id_at_client = ?, joining_date = ?,
          insurance_provider = ?, insurance_card_no = ?, insurance_plan = ?, insurance_expiry = ?,
          address = ?, country = ?, visa_designation = ?, mobile_no = ?, personal_email = ?,
          nationality = ?, passport_no = ?, passport_issuing_country = ?, passport_issue_date = ?, passport_expiry_date = ?, permanent_address = ?,
          emergency_contact_name = ?, emergency_contact_phone = ?, emergency_contact_relation = ?
        WHERE id = ?
      `).run(
        name, id_no, id_expiry_date, id_start_date, dob, gender, personal_details, salary, 
        basic_salary, accommodation_allowance, travel_allowance,
        client_id, employee_id_at_client, joining_date,
        insurance_provider, insurance_card_no, insurance_plan, insurance_expiry,
        address, country, visa_designation, mobile_no, personal_email,
        nationality, passport_no, passport_issuing_country, passport_issue_date, passport_expiry_date, permanent_address,
        emergency_contact_name, emergency_contact_phone, emergency_contact_relation,
        req.params.id
      );
      res.json({ success: true });
    } catch (e: any) {
      res.status(400).json({ success: false, message: e.message });
    }
  });

  app.post("/api/employees/bulk", (req, res) => {
    const { employees, created_by } = req.body;
    const insert = db.prepare(`
      INSERT INTO employees (
        name, id_no, id_expiry_date, dob, gender, personal_details, salary, 
        client_id, employee_id_at_client, joining_date, created_by
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const insertMany = db.transaction((data) => {
      for (const item of data) {
        insert.run(
          item.name, item.id_no, item.id_expiry_date, item.dob, item.gender, item.personal_details, item.salary, 
          item.client_id, item.employee_id_at_client, item.joining_date, created_by
        );
      }
    });

    try {
      insertMany(employees);
      res.json({ success: true });
    } catch (e: any) {
      res.status(400).json({ success: false, message: e.message });
    }
  });

  app.get("/api/employees/:id", (req, res) => {
    const employee = db.prepare(`
      SELECT e.*, c.company_name as client_name 
      FROM employees e 
      LEFT JOIN clients c ON e.client_id = c.id
      WHERE e.id = ?
    `).get(req.params.id);
    if (employee) {
      res.json(employee);
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  });

  // Dependant Routes
  app.get("/api/dependants", (req, res) => {
    const dependants = db.prepare(`
      SELECT d.*, e.name as employee_name 
      FROM dependants d 
      LEFT JOIN employees e ON d.employee_id = e.id
    `).all();
    res.json(dependants);
  });

  app.post("/api/dependants", (req, res) => {
    const { 
      name, id_no, id_expiry_date, id_start_date, dob, gender, relationship, employee_id, created_by,
      insurance_provider, insurance_card_no, insurance_plan, insurance_expiry,
      mobile_no, personal_email, nationality, address, country,
      passport_no, passport_issuing_country, passport_issue_date, passport_expiry_date, permanent_address
    } = req.body;
    try {
      const result = db.prepare(`
        INSERT INTO dependants (
          name, id_no, id_expiry_date, id_start_date, dob, gender, relationship, employee_id, created_by,
          insurance_provider, insurance_card_no, insurance_plan, insurance_expiry,
          mobile_no, personal_email, nationality, address, country,
          passport_no, passport_issuing_country, passport_issue_date, passport_expiry_date, permanent_address
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        name, id_no, id_expiry_date, id_start_date, dob, gender, relationship, employee_id, created_by,
        insurance_provider, insurance_card_no, insurance_plan, insurance_expiry,
        mobile_no, personal_email, nationality, address, country,
        passport_no, passport_issuing_country, passport_issue_date, passport_expiry_date, permanent_address
      );
      res.json({ success: true, id: result.lastInsertRowid });
    } catch (e: any) {
      res.status(400).json({ success: false, message: e.message });
    }
  });

  app.put("/api/dependants/:id", (req, res) => {
    const { 
      name, id_no, id_expiry_date, id_start_date, dob, gender, relationship, employee_id,
      insurance_provider, insurance_card_no, insurance_plan, insurance_expiry,
      mobile_no, personal_email, nationality, address, country,
      passport_no, passport_issuing_country, passport_issue_date, passport_expiry_date, permanent_address
    } = req.body;
    try {
      db.prepare(`
        UPDATE dependants SET 
          name = ?, id_no = ?, id_expiry_date = ?, id_start_date = ?, dob = ?, 
          gender = ?, relationship = ?, employee_id = ?,
          insurance_provider = ?, insurance_card_no = ?, insurance_plan = ?, insurance_expiry = ?,
          mobile_no = ?, personal_email = ?, nationality = ?, address = ?, country = ?,
          passport_no = ?, passport_issuing_country = ?, passport_issue_date = ?, passport_expiry_date = ?, permanent_address = ?
        WHERE id = ?
      `).run(
        name, id_no, id_expiry_date, id_start_date, dob, gender, relationship, employee_id, 
        insurance_provider, insurance_card_no, insurance_plan, insurance_expiry,
        mobile_no, personal_email, nationality, address, country,
        passport_no, passport_issuing_country, passport_issue_date, passport_expiry_date, permanent_address,
        req.params.id
      );
      res.json({ success: true });
    } catch (e: any) {
      res.status(400).json({ success: false, message: e.message });
    }
  });

  app.post("/api/dependants/bulk", (req, res) => {
    const { dependants, created_by } = req.body;
    const insert = db.prepare(`
      INSERT INTO dependants (
        name, id_no, id_expiry_date, id_start_date, dob, gender, relationship, employee_id, created_by
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const insertMany = db.transaction((data) => {
      for (const item of data) {
        insert.run(
          item.name, item.id_no, item.id_expiry_date, item.id_start_date, item.dob, item.gender, item.relationship, item.employee_id, created_by
        );
      }
    });

    try {
      insertMany(dependants);
      res.json({ success: true });
    } catch (e: any) {
      res.status(400).json({ success: false, message: e.message });
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
