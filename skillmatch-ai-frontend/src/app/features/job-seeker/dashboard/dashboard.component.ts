import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  applications = {
    sent: 10,
    replied: 3,
    companiesContacted: 6,
    companiesReplied: 2,
    topRole: 'Front-end development',
    recommendations: 12
  };

  interviews = {
    pending: 3,
    completed: 1
  };

  recommendedJobs = [
    {
      id: 1,
      company: 'Safaricom',
      logo: 'S',
      location: 'Nairobi, Westlands',
      position: 'Senior Front-end developer',
      salary: '200k - 250k',
      skills: ['React', 'Tailwind', 'NodeJS']
    },
    {
      id: 2,
      company: 'Google',
      logo: 'G',
      location: 'Nairobi, Westlands',
      position: 'Senior Angular Developer',
      salary: '300k - 350k',
      skills: ['Angular', 'TypeScript', 'NodeJS']
    }
  ];
} 