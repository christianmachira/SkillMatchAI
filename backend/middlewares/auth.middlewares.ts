import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/security';
import { UserType } from '../types';
import logger from '../utils/logger';

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
    userType: UserType;
  };
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      userType: decoded.userType
    };
    
    next();
  } catch (error) {
    logger.error('Authentication error', error);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export const authorize = (allowedRoles: UserType[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    if (!allowedRoles.includes(req.user.userType)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    next();
  };
};