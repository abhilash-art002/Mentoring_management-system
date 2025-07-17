import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hod-student-manager',
  standalone: true,
  imports: [CommonModule, FormsModule,],
  templateUrl: './hod-student-manager.component.html',
  styleUrl: './hod-student-manager.component.css'
})
export class HodStudentManagerComponent implements OnInit {
  hodId = 0;
  students: any[] = [];
  mentors: any[] = [];
  selectedMentors: { [key: number]: number } = {};

  constructor(private http: HttpClient,  private ngZone: NgZone,private cdRef: ChangeDetectorRef) {}

  


  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.hodId = user.id;
    this.loadStudents();
    this.loadMentors();    
  }

  loadStudents() {
    this.http.get<any[]>(`http://localhost:8080/api/users/by-hod/${this.hodId}`).subscribe(data => {
      this.students = data;
    });
    
  }

  loadMentors() {
    this.http.get<any[]>('http://localhost:8080/api/users/role/MENTOR').subscribe(data => {
      this.mentors = data;
    });
  }

assignMentor(studentId: number) {
  const mentorId = this.selectedMentors[studentId];
  if (!mentorId) return;

  this.http.put(`http://localhost:8080/api/users/hods/${this.hodId}/assign-mentor/${studentId}/${mentorId}`, {})
    .subscribe(() => {
      this.loadStudents();      
      alert('Mentor assigned!');
    });
}


removeMentor(studentId: number) {
  this.http.put(`http://localhost:8080/api/users/hods/${this.hodId}/assign-mentor/${studentId}/0`, {})
    .subscribe(() => {
      this.loadStudents();
      this.cdRef.detectChanges(); // << Force Angular to update the view
      alert('Mentor removed!');
    });
}



}
