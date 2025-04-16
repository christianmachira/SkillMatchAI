import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-jobs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-jobs.component.html',
  styleUrls: ['./my-jobs.component.css']
})
export class MyJobsComponent {
  jobs = [
    {
      id: 1,
      company: 'AWS',
      logo: 'aws',
      location: 'Nairobi, Kenya',
      position: 'Solutions Architect',
      salary: '200k-250k',
      type: 'Full-time',
      description: 'Full-time solutions architect needed at the Nairobi office. Must have a bachelor\'s degree, 3yrs+ experience and a keen understanding of AWS services',
      skills: ['AWS', 'Cloud Architecture', 'DevOps'],
      status: 'Applied',
      dateApplied: '2024-03-20'
    },
    {
      id: 2,
      company: 'Microsoft',
      logo: 'ms',
      location: 'Nairobi, Kenya',
      position: 'Senior Software Engineer',
      salary: '250k-300k',
      type: 'Full-time',
      description: 'Looking for a senior software engineer with strong experience in .NET and cloud technologies.',
      skills: ['C#', '.NET', 'Azure', 'Microservices'],
      status: 'Interview Scheduled',
      dateApplied: '2024-03-18'
    },
    {
      id: 3,
      company: 'Safaricom',
      logo: 'sf',
      location: 'Nairobi, Kenya',
      position: 'Frontend Developer',
      salary: '150k-200k',
      type: 'Full-time',
      description: 'Frontend developer needed for our digital transformation team.',
      skills: ['Angular', 'TypeScript', 'RxJS'],
      status: 'Under Review',
      dateApplied: '2024-03-15'
    }
  ];

  filteredJobs = this.jobs;

  filterJobs(event: Event) {
    const status = (event.target as HTMLSelectElement).value;
    this.filteredJobs = status === 'all' 
      ? this.jobs 
      : this.jobs.filter(job => job.status.toLowerCase().replace(' ', '-') === status);
  }

  sortJobs(event: Event) {
    const criteria = (event.target as HTMLSelectElement).value;
    
    this.filteredJobs = [...this.filteredJobs].sort((a, b) => {
      switch (criteria) {
        case 'date':
          return new Date(b.dateApplied).getTime() - new Date(a.dateApplied).getTime();
        case 'salary':
          // Extract the lower bound of the salary range for comparison
          const getSalaryValue = (salary: string) => 
            parseInt(salary.split('-')[0].replace(/[^0-9]/g, ''));
          return getSalaryValue(b.salary) - getSalaryValue(a.salary);
        case 'company':
          return a.company.localeCompare(b.company);
        default:
          return 0;
      }
    });
  }
} 