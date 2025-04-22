export interface ISkill {
    skill_id: string;
    name: string;
    description?: string;
    category?: string;
    [key: string]: any;
  }