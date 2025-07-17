import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-user-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-user-manager.component.html',
  styleUrl: './admin-user-manager.component.css'
})
export class AdminUserManagerComponent implements OnInit {
  mentors: any[] = [];
  students: any[] = [];
  viewType: 'none' | 'mentors' | 'students' = 'none';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  showMentors() {
    this.http.get<any[]>('http://localhost:8080/api/users/role/MENTOR').subscribe(data => {
      this.mentors = data;
      this.viewType = 'mentors';
    });
  }

  showStudents() {
    this.http.get<any[]>('http://localhost:8080/api/users/role/STUDENT').subscribe(data => {
      this.students = data;
      this.viewType = 'students';
    });
  }

}
