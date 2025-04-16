import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-job-seeker-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './job-seeker-layout.component.html',
  styleUrls: ['./job-seeker-layout.component.css']
})
export class JobSeekerLayoutComponent {
  navItems = [
    { icon: '🏠', label: 'Dashboard', route: '/job-seeker/dashboard' },
    { icon: '💼', label: 'My Jobs', route: '/job-seeker/jobs' },
    { icon: '✂️', label: 'Career', route: '/job-seeker/career' },
    { icon: '👤', label: 'Profile', route: '/job-seeker/profile' },
    { icon: '🏛️', label: 'Support', route: '/job-seeker/support' },
    { icon: '⚙️', label: 'Settings', route: '/job-seeker/settings' }
  ];
} 