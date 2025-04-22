import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface SupportRequest {
  category: string;
  subject: string;
  message: string;
  email: string;
  attachFile: File | null;
}

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './support.component.html',
  styleUrl: './support.component.css'
})
export class SupportComponent {
  supportCategories = [
    { id: 'account', name: 'Account Issues' },
    { id: 'technical', name: 'Technical Problems' },
    { id: 'billing', name: 'Billing Questions' },
    { id: 'feedback', name: 'Platform Feedback' },
    { id: 'other', name: 'Other' }
  ];

  supportRequest: SupportRequest = {
    category: '',
    subject: '',
    message: '',
    email: '',
    attachFile: null
  };

  faqs = [
    {
      question: 'How does SkillMatch AI match candidates with jobs?',
      answer: 'SkillMatch AI uses advanced AI algorithms to analyze your skills, experience, and preferences to match you with suitable job opportunities. Our platform focuses on skills rather than just job titles, providing more accurate matches.'
    },
    {
      question: 'How do I update my skill profile?',
      answer: 'You can update your skill profile by navigating to the Profile section and selecting the Skills tab. From there, you can add, remove, or update skills and indicate your proficiency level for each.'
    },
    {
      question: 'What should I do if I forgot my password?',
      answer: 'If you forgot your password, click on the "Forgot Password" link on the login page. Enter your email address, and we will send you instructions to reset your password.'
    },
    {
      question: 'How can employers contact me?',
      answer: 'Employers can contact you through our secure messaging system if they are interested in your profile. You will receive notifications in your dashboard and via email when you have new messages.'
    },
    {
      question: 'Is my personal information secure?',
      answer: 'Yes, we take data security seriously. All personal information is encrypted and stored securely. We do not share your data with third parties without your consent. Please refer to our Privacy Policy for more details.'
    }
  ];

  selectedFaq: number | null = null;

  toggleFaq(index: number) {
    this.selectedFaq = this.selectedFaq === index ? null : index;
  }

  submitSupportRequest() {
    // This would typically be an API call
    console.log('Support request submitted:', this.supportRequest);
    alert('Your support request has been submitted. We will get back to you soon!');
    this.resetForm();
  }

  resetForm() {
    this.supportRequest = {
      category: '',
      subject: '',
      message: '',
      email: '',
      attachFile: null
    };
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.supportRequest.attachFile = file;
    }
  }
} 