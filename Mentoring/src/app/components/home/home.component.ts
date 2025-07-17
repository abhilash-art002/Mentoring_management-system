import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CountersComponent } from '../home-component/counters/counters.component';
import { TestimonialsComponent } from '../home-component/testimonials/testimonials.component';
import { HodCourseComponent } from '../home-component/hod-course/hod-course.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule,CountersComponent,TestimonialsComponent,HodCourseComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  features = [
    {
      title: 'Student Dashboard',
      description: 'View progress, upcoming tasks, and mentor feedback.',
      image: 'https://source.unsplash.com/300x200/?student,education'
    },
    {
      title: 'Mentor Tools',
      description: 'Assign tasks, review reports, and schedule meetings.',
      image: 'https://source.unsplash.com/300x200/?teacher,mentor'
    },
    {
      title: 'Admin Panel',
      description: 'Manage users, reports, and performance analytics.',
      image: 'https://source.unsplash.com/300x200/?admin,system'
    }
  ];

   rating = 0;

  rate(star: number) {
    this.rating = star;
  }
}
