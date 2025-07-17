import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit  } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-course-manager',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './admin-course-manager.component.html',
  styleUrl: './admin-course-manager.component.css'
})
export class AdminCourseManagerComponent implements OnInit {
  courses: any[] = [];
  hods: any[] = [];
  newCourseName = '';
  selectedCourseId = 0;
  selectedHodId = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCourses();
    this.loadHods();
  }

  loadCourses() {
    this.http.get<any[]>('http://localhost:8080/api/courses').subscribe(data => {
      this.courses = data;
    });
  }

  loadHods() {
    this.http.get<any[]>('http://localhost:8080/api/users/role/HOD').subscribe(data => {
      this.hods = data;
    });
  }

  addCourse() {
    const newCourse = { name: this.newCourseName };
    this.http.post('http://localhost:8080/api/courses', newCourse).subscribe(() => {
      this.newCourseName = '';
      this.loadCourses();
    });
  }

assignHod(courseId: number, hodId: number) {
  this.http.put(`http://localhost:8080/api/courses/${courseId}/assign-hod/${hodId}`, {})
    .subscribe(() => this.loadCourses());
}


  removeHod(courseId: number) {
    this.http.put(`http://localhost:8080/api/courses/${courseId}/remove-hod`, {})
      .subscribe(() => this.loadCourses());
  }
}


