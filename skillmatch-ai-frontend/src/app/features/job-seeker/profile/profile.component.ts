import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user = {
    firstName: 'John',
    lastName: 'Doe',
    profession: 'software engineer',
    email: 'johndoe@work.com',
    phoneNumber: '',
    countryCode: '+254',
    verified: true,
    photoUrl: '/assets/images/profile-placeholder.png',
    tel: ''
  };

  jobStatus = {
    currentlyEmployed: true,
    freelancing: false,
    seekingOpportunity: true,
    internship: false
  };

  professions = ['software engineer', 'data scientist', 'UI/UX designer', 'product manager', 'web developer'];

  openFileUpload(): void {
    document.getElementById('photoUpload')?.click();
  }

  saveProfile() {
    // API call would go here
    console.log('Profile saved:', this.user);
    alert('Profile saved successfully!');
  }
} 