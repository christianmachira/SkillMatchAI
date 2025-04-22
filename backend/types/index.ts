export type UserType = 'job_seeker' | 'employer' | 'admin';

export interface User {
  user_id: string;
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
  registration_date: Date;
  last_login?: Date;
  is_active: boolean;
  user_type: UserType;
}

export interface Company {
  company_id: string;
  user_id: string;
  name: string;
  description?: string;
  industry?: string;
  location?: string;
  website?: string;
  logo_url?: string;
}

export interface Skill {
  skill_id: number;
  name: string;
  description?: string;
  category?: string;
}

export interface Job {
  job_id: string;
  company_id: string;
  title: string;
  description: string;
  location?: string;
  salary_min?: number;
  salary_max?: number;
  posting_date: Date;
  closing_date?: Date;
  is_active: boolean;
}

export interface Portfolio {
  portfolio_id: string;
  user_id: string;
  title: string;
  summary?: string;
  last_updated: Date;
}

export interface Experience {
  experience_id: string;
  portfolio_id: string;
  company: string;
  title: string;
  description?: string;
  start_date: Date;
  end_date?: Date;
}

export interface CV {
  cv_id: string;
  user_id: string;
  file_path: string;
  upload_date: Date;
  extracted_data?: any;
}

export interface Application {
  application_id: string;
  job_id: string;
  user_id: string;
  cv_id?: string;
  status: ApplicationStatus;
  application_date: Date;
  matching_score?: number;
  cover_note?: string;
}

export type ApplicationStatus = 'applied' | 'reviewing' | 'interview_scheduled' | 'hired' | 'rejected';

export interface Interview {
  interview_id: string;
  application_id: string;
  scheduled_time: Date;
  meeting_link?: string;
  notes?: string;
  feedback?: string;
  status?: InterviewStatus;
}

export type InterviewStatus = 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';

export interface ChatMessage {
  message_id: string;
  session_id: string;
  content: string;
  sent_at: Date;
  is_from_ai: boolean;
}

export interface CareerPathRecommendation {
  recommendation_id: string;
  user_id: string;
  recommended_skills: string[];
  description: string;
  created_at: Date;
}
