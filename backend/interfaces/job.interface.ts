export interface IJob {
    job_id: string;
    company_id: string;
    title: string;
    description: string;
    location: string;
    salary_min?: number;
    salary_max?: number;
    posting_date: Date;
    closing_date?: Date;
    is_active: boolean;
    requiredSkills?: any[];
    [key: string]: any;
  }