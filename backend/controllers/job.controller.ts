import { Request, Response } from 'express';
import * as jobService from '../services/job.service';
import { AuthRequest } from '../middlewares/auth.middleware';
import logger from '../utils/logger.util';

export const createJob = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user || req.user.role !== 'employer') {
      return res.status(403).json({ message: 'Only employers can create jobs' });
    }
    
    const jobData = req.body;
    const newJob = await jobService.createJob(jobData);
    
    res.status(201).json(newJob);
  } catch (error) {
    logger.error('Error in createJob controller:', error);
    res.status(500).json({ message: 'Error creating job', error: error.message });
  }
};

export const getJob = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const job = await jobService.getJobById(id);
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    res.status(200).json(job);
  } catch (error) {
    logger.error('Error in getJob controller:', error);
    res.status(500).json({ message: 'Error fetching job', error: error.message });
  }
};

export const searchJobs = async (req: Request, res: Response) => {
  try {
    const { query, location, skills, page = 1, limit = 10 } = req.query;
    
    const jobs = await jobService.searchJobs({
      query: query as string,
      location: location as string,
      skills: skills ? (skills as string).split(',') : undefined,
      page: Number(page),
      limit: Number(limit)
    });
    
    res.status(200).json(jobs);
  } catch (error) {
    logger.error('Error in searchJobs controller:', error);
    res.status(500).json({ message: 'Error searching jobs', error: error.message });
  }
};