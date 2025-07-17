import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hod-course',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './hod-course.component.html',
  styleUrl: './hod-course.component.css'
})
export class HodCourseComponent implements OnInit  {
studentId = 0;
  courses: any[] = [];
  selectedCourseId: number | null = null;  // Use `null` to deselect
  hodName = '';
  studentDetails: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.studentId = JSON.parse(localStorage.getItem('user') || '{}').id;
    this.loadCourses();
    this.fetchStudentDetails();
  }

  loadCourses() {
    this.http.get<any[]>('http://localhost:8080/api/courses').subscribe(data => {
      this.courses = data;
    });
  }

  toggleDetails(courseId: number) {
    this.selectedCourseId = this.selectedCourseId === courseId ? null : courseId;
    if (this.selectedCourseId !== null) {
      const selected = this.courses.find(c => c.id === courseId);
      this.hodName = selected?.hod?.name || 'No HOD';
    }
  }

  confirmChoice(courseId: number) {
    this.http.put(`http://localhost:8080/api/users/students/${this.studentId}/choose-course/${courseId}`, {})
      .subscribe(() => {
        alert("Course and HOD assigned successfully!");
        this.fetchStudentDetails();
      });
  }

  fetchStudentDetails() {
    this.http.get<any>(`http://localhost:8080/api/users/${this.studentId}`)
      .subscribe(data => {
        this.studentDetails = data;
      });
  }
  
}
