import { ISkill } from '../interfaces/skill.interface';
import axios from 'axios';
import logger from '../utils/logger.util';

interface SkillMatchResult {
  score: number;
  matchingSkills: ISkill[];
  missingSkills: ISkill[];
}

export const calculateSkillMatchScore = async (
  userSkills: ISkill[],
  jobSkills: ISkill[]
): Promise<SkillMatchResult> => {
  try {
    // This would be an integration with an AI service
    // For now, implementing a simple matching algorithm
    
    const matchingSkills: ISkill[] = [];
    const missingSkills: ISkill[] = [];
    
    // Find matching skills
    jobSkills.forEach(jobSkill => {
      const matchedSkill = userSkills.find(
        userSkill => userSkill.skill_id === jobSkill.skill_id
      );
      
      if (matchedSkill) {
        matchingSkills.push(matchedSkill);
      } else {
        missingSkills.push(jobSkill);
      }
    });
    
    // Calculate score (0-100)
    const score = jobSkills.length > 0 
      ? (matchingSkills.length / jobSkills.length) * 100
      : 0;
    
    return {
      score,
      matchingSkills,
      missingSkills
    };
  } catch (error) {
    logger.error('Error calculating skill match score:', error);
    throw error;
  }
};