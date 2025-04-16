import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavigationService } from '../../core/services/navigation.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
  title = 'SkillMatch AI';
  
  problems = [
    {
      title: 'Skills Gap',
      description: 'Traditional hiring often misses qualified candidates due to rigid requirements.',
      icon: 'fa-gap'
    },
    {
      title: 'Time Wasted',
      description: 'Both employers and candidates spend too much time on mismatched opportunities.',
      icon: 'fa-clock'
    },
    {
      title: 'Bias in Hiring',
      description: 'Unconscious bias affects hiring decisions, limiting diversity and innovation.',
      icon: 'fa-balance-scale'
    }
  ];

  features = [
    {
      title: 'AI-Powered Matching',
      description: 'Advanced algorithms match skills to opportunities with high accuracy.',
      icon: 'fa-brain'
    },
    {
      title: 'Skill Assessment',
      description: 'Comprehensive skill evaluation tools for accurate candidate profiling.',
      icon: 'fa-tasks'
    },
    {
      title: 'Real-time Analytics',
      description: 'Data-driven insights to improve hiring decisions and career growth.',
      icon: 'fa-chart-line'
    }
  ];

  constructor(private navigationService: NavigationService) {}

  scrollToSection(sectionId: string) {
    this.navigationService.scrollToSection(sectionId);
  }
} 