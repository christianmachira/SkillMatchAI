import { getJobById } from '../models/job.model';
import { getUserById } from '../models/user.model';
import { getUserSkills } from '../models/skill.model';
import { IUser } from '../interfaces/user.interface';
import { IJob } from '../interfaces/job.interface';
import { ISkill } from '../interfaces/skill.interface';
import { calculateSkillMatchScore } from '../ai/skill-matching';

interface MatchResult {
  user: Omit<IUser, 'password_hash'>;
  job: IJob;
  matchingScore: number;
  matchingSkills: ISkill[];
  missingSkills: ISkill[];
}

export const matchUserToJob = async (userId: string, jobId: string): Promise<MatchResult> => {
  // Get user and job
  const user = await getUserById(userId);
  const job = await getJobById(jobId);
  
  if (!user || !job) {
    throw new Error('User or job not found');
  }
  
  // Get user skills
  const userSkills = await getUserSkills(userId);
  
  // Calculate match score using AI
  const { score, matchingSkills, missingSkills } = await calculateSkillMatchScore(
    userSkills,
    job.requiredSkills
  );
  
  // Remove password from user object
  const { password_hash, ...userWithoutPassword } = user;
  
  return {
    user: userWithoutPassword as Omit<IUser, 'password_hash'>,
    job,
    matchingScore: score,
    matchingSkills,
    missingSkills
  };
};

export const findBestCandidatesForJob = async (jobId: string, limit = 10): Promise<MatchResult[]> => {
  // Implementation would fetch all relevant candidates and rank them by match score
  // For efficiency, this would need database optimization and possibly pre-computed matches
  
  // Actual implementation would be more complex...
  const results: MatchResult[] = [];
  
  // Return sorted candidates
  return results.sort((a, b) => b.matchingScore - a.matchingScore).slice(0, limit);
};
