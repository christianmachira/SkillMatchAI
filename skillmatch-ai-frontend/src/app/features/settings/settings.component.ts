import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  settings = {
    notifications: {
      email: true,
      push: true,
      sms: false,
      newMessages: true,
      jobAlerts: true,
      marketingEmails: false
    },
    privacy: {
      profileVisibility: 'public', // public, connections, private
      showOnlineStatus: true,
      allowMessaging: 'all', // all, connections, none
      activityVisibility: true
    },
    account: {
      email: 'johndoe@example.com',
      password: '********',
      language: 'en',
      timezone: 'GMT+3',
      twoFactorAuth: false
    },
    appearance: {
      theme: 'light',
      fontSize: 'medium'
    }
  };

  languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'zh', name: 'Chinese' },
    { code: 'sw', name: 'Swahili' }
  ];

  timezones = [
    { code: 'GMT-8', name: 'Pacific Time (GMT-8)' },
    { code: 'GMT-5', name: 'Eastern Time (GMT-5)' },
    { code: 'GMT+0', name: 'Greenwich Mean Time (GMT+0)' },
    { code: 'GMT+1', name: 'Central European Time (GMT+1)' },
    { code: 'GMT+3', name: 'East Africa Time (GMT+3)' },
    { code: 'GMT+8', name: 'China Standard Time (GMT+8)' }
  ];

  currentSection = 'notifications';

  setCurrentSection(section: string) {
    this.currentSection = section;
  }

  saveSettings() {
    // This would typically be an API call
    console.log('Settings saved:', this.settings);
    alert('Settings saved successfully!');
  }

  changePassword() {
    // This would open a modal or navigate to change password page
    alert('Change password functionality would be implemented here');
  }

  deleteAccount() {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // This would typically be an API call
      console.log('Account deletion requested');
      alert('Account deletion process initiated. You will receive an email with further instructions.');
    }
  }
} 