import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { StudentCourseSelectorComponent } from '../student/student-course-selector/student-course-selector.component';
import { HttpClient } from '@angular/common/http';
import { CommunicateComponent } from '../../../communicate/communicate.component';

@Component({
  selector: 'app-student-dashboard-component',
  standalone: true,
  imports: [CommonModule, StudentCourseSelectorComponent,CommunicateComponent],
  templateUrl: './student-dashboard-component.component.html',
  styleUrl: './student-dashboard-component.component.css'
})
export class StudentDashboardComponentComponent implements OnInit {

  constructor(private http: HttpClient) {}

user = JSON.parse(localStorage.getItem('user') || '{}');

studentId = 0;
mentorId = 0;

ngOnInit() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  this.studentId = user.id;
  this.loadStudent();
  this.http.get<any>(`http://localhost:8080/api/users/${this.studentId}`)
    .subscribe(data => {
      this.mentorId = data.mentor?.id || 0;
    });
}

showEdit = false;
selectedImage: File | null = null;
selectedDefaultImage: string | null = null;

defaultImages: string[] = [

  'team-1.jpg',
  'team-2.jpg',
  'team-3.jpg',
  'team-4.jpg',
  'team-5.jpg',
  'team-6.jpg'
];

selectDefaultImage(img: string) {
  this.selectedDefaultImage = img;
}

onFileSelected(event: any) {
  this.selectedImage = event.target.files[0];
}

handleImageSubmit() {
  if (this.selectedDefaultImage) {
    this.uploadDefaultImage();
  } else if (this.selectedImage) {
    this.uploadImage();
  } else {
    alert("Please select or upload an image.");
  }
}

uploadImage() {
  const formData = new FormData();
  formData.append('image', this.selectedImage!);

  this.http.put(`http://localhost:8080/api/users/upload-profile-image/${this.studentId}`, formData)
    .subscribe(() => {
      alert('Image uploaded successfully!');
      this.loadStudent();
      this.selectedImage = null;
      this.showEdit = false;
    });
}

uploadDefaultImage() {
  this.http.put(
    `http://localhost:8080/api/users/set-profile-image/${this.studentId}?filename=${this.selectedDefaultImage}`,
    {}
  ).subscribe(() => {
    alert('Default image set successfully!');
    this.loadStudent();
    this.selectedDefaultImage = null;
    this.showEdit = false;
  });
}

student: any = {};

loadStudent() {
  this.http.get(`http://localhost:8080/api/users/${this.studentId}`)
    .subscribe((data: any) => {
      this.student = data;
      this.user = data;
      localStorage.setItem('user', JSON.stringify(data));
    });
}

getProfileImage(): string {
  return this.student?.profileImage
    ? `http://localhost:8080/images/${this.student.profileImage}`
    : 'assets/img/mentors/default.jpg';
}




}
