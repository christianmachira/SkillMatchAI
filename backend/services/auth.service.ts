import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/user.interface';
import { createUser, getUserByEmail } from '../models/user.model';

interface AuthResponse {
  user: Omit<IUser, 'password_hash'>;
  token: string;
}

export const register = async (userData: Omit<IUser, 'user_id'>): Promise<AuthResponse> => {
  // Check if user already exists
  const existingUser = await getUserByEmail(userData.email);
  if (existingUser) {
    throw new Error('User with this email already exists');
  }
  
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password_hash, salt);
  
  // Create user
  const newUser = await createUser({
    ...userData,
    password_hash: hashedPassword
  });
  
  // Generate JWT token
  const token = jwt.sign(
    { id: newUser.user_id, email: newUser.email, role: newUser.user_type },
    process.env.JWT_SECRET || 'your-default-secret',
    { expiresIn: '7d' }
  );
  
  // Remove password from return object
  const { password_hash, ...userWithoutPassword } = newUser;
  
  return {
    user: userWithoutPassword as Omit<IUser, 'password_hash'>,
    token
  };
};

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  // Find user
  const user = await getUserByEmail(email);
  if (!user) {
    throw new Error('Invalid credentials');
  }
  
  // Validate password
  const isPasswordValid = await bcrypt.compare(password, user.password_hash);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }
  
  // Generate JWT token
  const token = jwt.sign(
    { id: user.user_id, email: user.email, role: user.user_type },
    process.env.JWT_SECRET || 'your-default-secret',
    { expiresIn: '7d' }
  );
  
  // Remove password from return object
  const { password_hash, ...userWithoutPassword } = user;
  
  return {
    user: userWithoutPassword as Omit<IUser, 'password_hash'>,
    token
  };
};