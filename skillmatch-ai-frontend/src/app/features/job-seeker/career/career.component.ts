import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartConfiguration, ChartType } from 'chart.js';
import { default as Annotation } from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.css'],
  standalone: true,
  imports: [CommonModule, BaseChartDirective]
})
export class CareerComponent implements OnInit {
  // Profile Views Line Chart
  public profileViewsChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'Profile Views',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      }
    ],
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July']
  };

  public profileViewsChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      legend: { display: true }
    }
  };

  // Job Matches Bar Chart
  public jobMatchesChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [85, 72, 78, 75, 77, 75],
        label: 'Match Percentage',
        backgroundColor: 'rgba(77,183,255,0.8)',
        borderColor: 'rgba(77,183,255,1)',
        borderWidth: 1
      }
    ],
    labels: ['Software Engineer', 'Full Stack', 'Frontend', 'Backend', 'DevOps', 'Cloud Engineer']
  };

  public jobMatchesChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 100
      }
    },
    plugins: {
      legend: { display: true }
    }
  };

  // Courses and Certifications data
  public courses = [
    {
      id: 1,
      title: 'Advanced JavaScript',
      provider: 'Udemy',
      logo: 'udemy',
      progress: 75,
      description: 'Master modern JavaScript concepts and practices'
    },
    {
      id: 2,
      title: 'Angular Development',
      provider: 'Coursera',
      logo: 'coursera',
      progress: 60,
      description: 'Complete guide to Angular development'
    }
  ];

  public certifications = [
    {
      id: 1,
      title: 'AWS Solutions Architect',
      provider: 'Amazon',
      logo: 'aws',
      validUntil: '2025-12-31',
      description: 'Professional certification for AWS cloud architecture'
    },
    {
      id: 2,
      title: 'Google Cloud Professional',
      provider: 'Google',
      logo: 'gcp',
      validUntil: '2025-06-30',
      description: 'Professional certification for Google Cloud Platform'
    }
  ];

  constructor() {
    Chart.register(Annotation);
  }

  ngOnInit(): void {}

  viewCourse(courseId: number): void {
    console.log('Viewing course:', courseId);
  }

  viewCertification(certId: number): void {
    console.log('Viewing certification:', certId);
  }
} 