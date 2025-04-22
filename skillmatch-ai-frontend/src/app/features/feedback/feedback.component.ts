import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface FeedbackForm {
  category: string;
  rating: number;
  title: string;
  description: string;
  email: string;
  attachScreenshot: File | null;
  allowContact: boolean;
}

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent {
  feedbackCategories = [
    { id: 'ui', name: 'User Interface' },
    { id: 'features', name: 'Platform Features' },
    { id: 'matching', name: 'Job Matching' },
    { id: 'performance', name: 'Platform Performance' },
    { id: 'bugs', name: 'Bugs and Issues' },
    { id: 'other', name: 'Other' }
  ];

  feedbackRatings = [1, 2, 3, 4, 5];

  feedback: FeedbackForm = {
    category: '',
    rating: 0,
    title: '',
    description: '',
    email: '',
    attachScreenshot: null,
    allowContact: false
  };

  ratingLabels = {
    1: 'Very Poor',
    2: 'Poor',
    3: 'Average',
    4: 'Good',
    5: 'Excellent'
  };
  
  feedbackSubmitted = false;

  submitFeedback() {
    // This would typically be an API call
    console.log('Feedback submitted:', this.feedback);
    this.feedbackSubmitted = true;
    // Reset form after showing success message
    setTimeout(() => {
      this.resetForm();
      this.feedbackSubmitted = false;
    }, 5000);
  }

  resetForm() {
    this.feedback = {
      category: '',
      rating: 0,
      title: '',
      description: '',
      email: '',
      attachScreenshot: null,
      allowContact: false
    };
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.feedback.attachScreenshot = file;
    }
  }

  setRating(rating: number) {
    this.feedback.rating = rating;
  }

  getRatingLabel(rating: number): string {
    return this.ratingLabels[rating as keyof typeof this.ratingLabels] || '';
  }
} 