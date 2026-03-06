export interface User {
  id: number;
  name: string;
  login_code: string;
  role: 'admin' | 'staff';
}

export interface ClientContact {
  id?: number;
  client_id?: number;
  name: string;
  designation: string;
  mobile_no: string;
  email: string;
}

export interface Client {
  id: number;
  company_name: string;
  location: string;
  sector: string;
  sector_other?: string;
  unique_code: string;
  cr_no: string;
  contract_type: string;
  contract_renewal_date: string;
  status: 'pending' | 'approved';
  created_by: number;
  contacts?: ClientContact[];
  employee_count?: number;
}

export interface Employee {
  id: number;
  name: string;
  id_no: string;
  id_start_date: string;
  id_expiry_date: string;
  dob: string;
  gender: string;
  personal_details: string;
  salary: number;
  basic_salary: number;
  accommodation_allowance: number;
  travel_allowance: number;
  client_id: number;
  client_name?: string;
  employee_id_at_client: string;
  joining_date: string;
  no_of_dependants: number;
  insurance_provider?: string;
  insurance_card_no?: string;
  insurance_plan?: string;
  insurance_expiry?: string;
  address?: string;
  country?: string;
  visa_designation?: string;
  mobile_no?: string;
  personal_email?: string;
  nationality?: string;
  passport_no?: string;
  passport_issuing_country?: string;
  passport_issue_date?: string;
  passport_expiry_date?: string;
  permanent_address?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  emergency_contact_relation?: string;
  status: 'pending' | 'approved';
  created_by: number;
}

export interface Dependant {
  id: number;
  name: string;
  id_no: string;
  id_expiry_date: string;
  dob: string;
  gender: string;
  relationship: string;
  employee_id: number;
  employee_name?: string;
  insurance_provider?: string;
  insurance_card_no?: string;
  insurance_plan?: string;
  insurance_expiry?: string;
  mobile_no?: string;
  personal_email?: string;
  nationality?: string;
  address?: string;
  country?: string;
  passport_no?: string;
  passport_issuing_country?: string;
  passport_issue_date?: string;
  passport_expiry_date?: string;
  permanent_address?: string;
  id_start_date?: string;
  created_by: number;
}
