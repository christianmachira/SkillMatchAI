// src/index.ts - Entry point
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { config } from 'dotenv';
import { connectDB } from './config/database';
import logger from './utils/logger.util';

// Import routes
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import jobRoutes from './routes/job.routes';
import skillRoutes from './routes/skill.routes';
import applicationRoutes from './routes/application.routes';
import portfolioRoutes from './routes/portfolio.routes';
import cvRoutes from './routes/cv.routes';
import interviewRoutes from './routes/interview.routes';
import chatRoutes from './routes/chat.routes';
import adminRoutes from './routes/admin.routes';
import recommendationRoutes from './routes/recommendation.routes';

// Import middlewares
import { errorMiddleware } from './middlewares/error.middleware';

// Initialize environment variables
config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Connect to database
connectDB();

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/portfolios', portfolioRoutes);
app.use('/api/cvs', cvRoutes);
app.use('/api/interviews', interviewRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/recommendations', recommendationRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'SkillMatch AI API is running' });
});

// Error handling middleware
app.use(errorMiddleware);

// Start server
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

export default app;