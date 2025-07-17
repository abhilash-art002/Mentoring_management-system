import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AdminCourseManagerComponent } from '../admin/admin-course-manager/admin-course-manager.component';
import { AdminUserManagerComponent } from '../admin/admin-user-manager/admin-user-manager.component';
import { UserHierarchyComponent } from '../../../admin/user-hierarchy/user-hierarchy.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule,AdminCourseManagerComponent,AdminUserManagerComponent,UserHierarchyComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
   user = JSON.parse(localStorage.getItem('user') || '{}');
}
