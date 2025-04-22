import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employer-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './employer-layout.component.html',
  styleUrl: './employer-layout.component.css'
})
export class EmployerLayoutComponent {
  menuItems = [
    { path: 'dashboard', icon: '🏠', label: 'Dashboard' },
    { path: 'post-job', icon: '📝', label: 'Post Job' },
    { path: 'candidates', icon: '👥', label: 'Candidates' },
    { path: 'interviews', icon: '📅', label: 'Interviews' },
    { path: 'profile', icon: '👤', label: 'Profile' },
    { path: 'support', icon: '🛟', label: 'Support' },
    { path: 'settings', icon: '⚙️', label: 'Settings' },
  ];

  toggleMenu() {
    // This would toggle the menu in a mobile view
    console.log('Toggle menu');
  }
} 