import { PoolClient } from 'pg';
import pool from '../config/database';
import { IUser } from '../interfaces/user.interface';
import logger from '../utils/logger.util';

export const createUser = async (userData: IUser): Promise<IUser> => {
  const client: PoolClient = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    const userResult = await client.query(
      `INSERT INTO "user" (email, password_hash, first_name, last_name, phone_number, registration_date, is_active, user_type)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [
        userData.email,
        userData.password_hash,
        userData.first_name,
        userData.last_name,
        userData.phone_number,
        new Date(),
        true,
        userData.user_type
      ]
    );
    
    const user = userResult.rows[0];
    
    await client.query('COMMIT');
    return user;
  } catch (error) {
    await client.query('ROLLBACK');
    logger.error('Error creating user:', error);
    throw error;
  } finally {
    client.release();
  }
};

export const getUserByEmail = async (email: string): Promise<IUser | null> => {
  try {
    const result = await pool.query('SELECT * FROM "user" WHERE email = $1', [email]);
    return result.rows[0] || null;
  } catch (error) {
    logger.error('Error getting user by email:', error);
    throw error;
  }
};

export const getUserById = async (id: string): Promise<IUser | null> => {
  try {
    const result = await pool.query('SELECT * FROM "user" WHERE user_id = $1', [id]);
    return result.rows[0] || null;
  } catch (error) {
    logger.error('Error getting user by id:', error);
    throw error;
  }
};

export const updateUser = async (id: string, userData: Partial<IUser>): Promise<IUser | null> => {
  const updateFields: string[] = [];
  const values: any[] = [];
  let valueIndex = 1;
  
  // Build dynamic query based on provided fields
  Object.keys(userData).forEach(key => {
    if (userData[key as keyof IUser] !== undefined) {
      updateFields.push(`${key} = $${valueIndex}`);
      values.push(userData[key as keyof IUser]);
      valueIndex++;
    }
  });
  
  if (updateFields.length === 0) return null;
  
  values.push(id);
  
  try {
    const query = `
      UPDATE "user"
      SET ${updateFields.join(', ')}
      WHERE user_id = $${valueIndex}
      RETURNING *
    `;
    
    const result = await pool.query(query, values);
    return result.rows[0] || null;
  } catch (error) {
    logger.error('Error updating user:', error);
    throw error;
  }
};
