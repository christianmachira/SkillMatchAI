import pool from '../config/database';
import { User } from '../types';
import logger from '../utils/logger';
import { hashPassword } from '../utils/security';

export const createUser = async (userData: Omit<User, 'user_id' | 'registration_date' | 'is_active'>): Promise<User> => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    const hashedPassword = await hashPassword(userData.password_hash);
    
    const userQuery = `
      INSERT INTO "user" (email, password_hash, first_name, last_name, phone_number, user_type, registration_date, is_active)
      VALUES ($1, $2, $3, $4, $5, $6, NOW(), TRUE)
      RETURNING *
    `;
    
    const userValues = [
      userData.email,
      hashedPassword,
      userData.first_name,
      userData.last_name,
      userData.phone_number || null,
      userData.user_type
    ];
    
    const userResult = await client.query(userQuery, userValues);
    const newUser = userResult.rows[0];
    
    await client.query('COMMIT');
    return newUser;
  } catch (error) {
    await client.query('ROLLBACK');
    logger.error('Error creating user', error);
    throw error;
  } finally {
    client.release();
  }
};

export const getUserById = async (userId: string): Promise<User | null> => {
  try {
    const query = 'SELECT * FROM "user" WHERE user_id = $1';
    const result = await pool.query(query, [userId]);
    
    return result.rows.length > 0 ? result.rows[0] : null;
  } catch (error) {
    logger.error('Error fetching user by ID', error);
    throw error;
  }
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const query = 'SELECT * FROM "user" WHERE email = $1';
    const result = await pool.query(query, [email]);
    
    return result.rows.length > 0 ? result.rows[0] : null;
  } catch (error) {
    logger.error('Error fetching user by email', error);
    throw error;
  }
};

export const updateUser = async (userId: string, updates: Partial<User>): Promise<User | null> => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    // Build dynamic update query
    const fields: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;
    
    Object.entries(updates).forEach(([key, value]) => {
      // Exclude fields that shouldn't be updated directly
      if (!['user_id', 'registration_date'].includes(key)) {
        fields.push(`${key} = $${paramIndex}`);
        values.push(value);
        paramIndex++;
      }
    });
    
    if (fields.length === 0) {
      return await getUserById(userId);
    }
    
    values.push(userId);
    
    const query = `
      UPDATE "user"
      SET ${fields.join(', ')}, last_login = NOW()
      WHERE user_id = $${paramIndex}
      RETURNING *
    `;
    
    const result = await client.query(query, values);
    
    await client.query('COMMIT');
    return result.rows.length > 0 ? result.rows[0] : null;
  } catch (error) {
    await client.query('ROLLBACK');
    logger.error('Error updating user', error);
    throw error;
  } finally {
    client.release();
  }
};