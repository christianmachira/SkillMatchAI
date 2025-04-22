import { Router } from 'express';
import { createJob, getJob, searchJobs } from '../controllers/job.controller';
import { authMiddleware, roleMiddleware } from '../middlewares/auth.middleware';
import { validateJobData } from '../middlewares/validation.middleware';

const router = Router();

router.post('/', [authMiddleware, roleMiddleware(['employer']), validateJobData], createJob);
router.get('/:id', getJob);
router.get('/', searchJobs);

export default router;