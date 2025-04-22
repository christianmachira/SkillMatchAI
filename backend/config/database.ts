import { Pool } from 'pg';
import { config } from 'dotenv';
import logger from '../utils/logger.util';

config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

export const connectDB = async (): Promise<void> => {
  try {
    const client = await pool.connect();
    logger.info('PostgreSQL connected');
    client.release();
  } catch (error) {
    logger.error('Error connecting to PostgreSQL', error);
    process.exit(1);
  }
};

export default pool;