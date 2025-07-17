import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css'
})
export class TestimonialsComponent {
  activities = [
  { img: '../../../../assets/img/tabs/tab-1.png', title: 'Assign Mentor' },
  { img: '../../../../assets/img/tabs/tab-2.png', title: 'View Students' },
  { img: '../../../../assets/img/tabs/tab-3.png', title: 'Track Progress' },
  { img: '../../../../assets/img/tabs/tab-4.png', title: 'Upload Resources' },
  { img: '../../../../assets/img/tabs/tab-5.png', title: 'One-on-One Chat' },
];

}
