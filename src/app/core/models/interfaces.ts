// ─────────────────────────────────────────────────────────────
// interfaces.ts — All TypeScript interfaces matching Django REST API
// ─────────────────────────────────────────────────────────────

export interface Product {
  id: number;
  title_en: string;
  title_ta: string;
  desc: string;
  price_numeric: number;
  price_unit_text: string;
  icon_class: string;
  image_url: string;
  is_subsidy_eligible: boolean;
}

export interface SubsidyCalculationInput {
  farmer_name: string;
  phone_number: string;
  district: string;
  product_id: number;
  land_size_acres: number;
}

export interface SubsidyCalculationResult {
  status: string;
  quote_id: number;
  farmer_name: string;
  product_title: string;
  land_acres: number;
  project_cost: number;
  subsidy_amount: number;
  farmer_contribution: number;
  subsidy_percent: number;
  tier_label: string;
  explanation: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content?: string;
  author: string;
  cover_image: string | null;
  tags: string[];
  published: boolean;
  created_at: string;
  updated_at?: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar_url: string | null;
  district: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  district: string;
  subject: string;
  message: string;
}

export interface QuoteLead {
  id: number;
  farmer_name: string;
  phone_number: string;
  district: string;
  product: number | null;
  product_title: string;
  land_size_acres: number;
  estimated_project_cost: string;
  projected_subsidy_amount: string;
  farmer_contribution: string;
  subsidy_percent: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'COMPLETED';
  created_at: string;
}

export interface DashboardStats {
  total_installations: number;
  total_farmers: number;
  districts_covered: number;
  years_experience: number;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface ApiError {
  status: string;
  errors?: Record<string, string[]>;
  detail?: string;
}

export interface ApiPage<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
