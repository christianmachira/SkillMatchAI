import { IJob } from '../interfaces/job.interface';

export const createJob = async (jobData: IJob): Promise<IJob> => {
  const client: PoolClient = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    const jobResult = await client.query(
      `INSERT INTO job (company_id, title, description, location, salary_min, salary_max, posting_date, closing_date, is_active)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [
        jobData.company_id,
        jobData.title,
        jobData.description,
        jobData.location,
        jobData.salary_min,
        jobData.salary_max,
        new Date(),
        jobData.closing_date,
        true
      ]
    );
    
    const job = jobResult.rows[0];
    
    // Add job required skills
    if (jobData.requiredSkills && jobData.requiredSkills.length > 0) {
      const skillValues = jobData.requiredSkills.map((skillId) => {
        return `(${job.job_id}, ${skillId})`;
      }).join(', ');
      
      await client.query(`
        INSERT INTO job_skill (job_id, skill_id)
        VALUES ${skillValues}
      `);
    }
    
    await client.query('COMMIT');
    return job;
  } catch (error) {
    await client.query('ROLLBACK');
    logger.error('Error creating job:', error);
    throw error;
  } finally {
    client.release();
  }
};

export const getJobById = async (id: string): Promise<IJob | null> => {
  const client: PoolClient = await pool.connect();
  
  try {
    // Get job information
    const jobResult = await client.query('SELECT * FROM job WHERE job_id = $1', [id]);
    
    if (jobResult.rows.length === 0) {
      return null;
    }
    
    const job = jobResult.rows[0];
    
    // Get skills for this job
    const skillsResult = await client.query(`
      SELECT s.* FROM skill s
      JOIN job_skill js ON s.skill_id = js.skill_id
      WHERE js.job_id = $1
    `, [id]);
    
    job.requiredSkills = skillsResult.rows;
    
    return job;
  } catch (error) {
    logger.error('Error getting job by id:', error);
    throw error;
  } finally {
    client.release();
  }
};