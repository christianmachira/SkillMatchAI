import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
  title = 'SkillMatch AI';
  features = [
    {
      title: 'AI-Driven Job Matching',
      description: 'Get matched with opportunities based on your actual skills and potential',
      icon: '🎯'
    },
    {
      title: 'Skill-Based Profiles',
      description: 'Create detailed skill profiles that showcase your true capabilities',
      icon: '📊'
    },
    {
      title: 'Career Guidance',
      description: 'Receive personalized career path recommendations based on your skills',
      icon: '🚀'
    }
  ];

  problems = [
    {
      title: 'Hidden Talent',
      description: 'Talented individuals without traditional backgrounds struggle to get noticed'
    },
    {
      title: 'Resource Waste',
      description: 'Employers waste resources screening inappropriate candidates'
    },
    {
      title: 'Skills Gap',
      description: 'Skills gaps persist despite qualified candidates being available'
    }
  ];
} 