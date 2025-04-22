import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-employer-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class EmployerDashboardComponent {
  stats = {
    jobsPosted: 7,
    jobsPending: 3,
    jobsDone: 4,
    growth: 70
  };

  jobsToEdit = [
    {
      id: 1,
      title: 'Angular developer Needed',
      description: 'Front-end developer needed, with proficiency in Angular',
      salary: '$150k - $200k',
      status: 'Active',
      img: '/assets/images/profile-img-1.jpg'
    },
    {
      id: 2,
      title: 'DevOps Engineer required',
      description: 'DevOps engineer needed with understanding in CI/CD operations',
      salary: '$250k - $300k',
      status: 'Pending',
      img: '/assets/images/profile-img-2.jpg'
    }
  ];

  jobsToClose = [
    {
      id: 1,
      title: 'Angular developer needed',
      description: 'Front-end developer needed with proficiency in Angular',
      postedOn: '1/4/2025',
      img: '/assets/images/profile-img-1.jpg'
    },
    {
      id: 2,
      title: 'DevOps Engineer required',
      description: 'DevOps engineer needed with understanding in CI/CD operations',
      postedOn: '21/3/2025',
      img: '/assets/images/profile-img-2.jpg'
    }
  ];

  createNewJob() {
    console.log('Create new job clicked');
  }

  editJob(jobId: number) {
    console.log('Edit job clicked:', jobId);
  }

  saveJob(jobId: number) {
    console.log('Save job clicked:', jobId);
  }

  cancelEdit(jobId: number) {
    console.log('Cancel edit clicked:', jobId);
  }

  closeJob(jobId: number) {
    console.log('Close job clicked:', jobId);
  }
} 