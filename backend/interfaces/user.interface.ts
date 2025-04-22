export interface IUser {
    user_id: string;
    email: string;
    password_hash: string;
    first_name: string;
    last_name: string;
    phone_number?: string;
    registration_date: Date;
    last_login?: Date;
    is_active: boolean;
    user_type: 'job_seeker' | 'employer' | 'admin';
    [key: string]: any;
  }