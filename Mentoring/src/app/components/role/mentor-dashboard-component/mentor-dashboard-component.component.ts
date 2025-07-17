import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommunicateComponent } from '../../../communicate/communicate.component';


@Component({
  selector: 'app-mentor-dashboard-component',
  standalone: true,
  imports: [CommonModule, FormsModule, CommunicateComponent],
  templateUrl: './mentor-dashboard-component.component.html',
  styleUrl: './mentor-dashboard-component.component.css'
})
export class MentorDashboardComponentComponent implements OnInit {
showCourseWise = false;

// students: any[] = []; // already fetched
groupedByCourse: { [courseName: string]: any[] } = {};
  showEdit: boolean = false;
  defaultImages: string[] = [
  'default1.jpg',
  'default2.jpg',
  'default3.jpg',
  'default4.jpg',
  'default5.jpg'
  // Add your real file names here
];
selectedDefaultImage: string | null = null;

selectDefaultImage(imageName: string) {
  this.selectedDefaultImage = imageName;
}

  constructor(private http: HttpClient) {}

  selectedImage: File | null = null;
mentor: any = {}; // Load current mentor details (with ID and profileImage)
uploadDefaultImage() {
  if (!this.selectedDefaultImage) return;

  this.http.put(
    `http://localhost:8080/api/users/set-profile-image/${this.mentor.id}?filename=${this.selectedDefaultImage}`,
    {}
  ).subscribe(() => {
    alert('Default image assigned!');
    this.loadMentor();
    this.selectedDefaultImage = null;
    this.showEdit = false;
  });
}



  user = JSON.parse(localStorage.getItem('user') || '{}');
  mentorId = 0;
  students: any[] = [];
  selectedStudent: any = null;

  ngOnInit(): void {
    this.mentorId = this.user.id;
    this.loadMentor(); 
    this.http.get<any[]>(`http://localhost:8080/api/users/by-mentor/${this.mentorId}`)
      .subscribe(data => {
        this.students = data;
      });
  }

  selectStudent(student: any): void {
    this.selectedStudent = student;
  }
  onFileSelected(event: any) {
  this.selectedImage = event.target.files[0];
}

uploadImage() {
  if (!this.selectedImage) return;

  const formData = new FormData();
  formData.append('image', this.selectedImage);

  this.http.put(`http://localhost:8080/api/users/upload-profile-image/${this.mentor.id}`, formData)
    .subscribe(() => {
      alert('Image uploaded successfully');
      this.loadMentor(); // reload data
    });
}
loadMentor() {
  this.http.get(`http://localhost:8080/api/users/${this.user.id}`)
    .subscribe((data: any) => {
      this.mentor = data;
    });
}

getProfileImage(): string {
  return this.mentor.profileImage
    ? `http://localhost:8080/images/${this.mentor.profileImage}`
    : `assets/img/mentors/default.jpg`;
}
handleImageSubmit() {
  // If default image is selected
  if (this.selectedDefaultImage) {
    this.uploadDefaultImage();
  }
  // Else if a file is selected
  else if (this.selectedImage) {
    this.uploadImage();
  } else {
    alert('Please select an image from computer or choose a default image.');
  }
}



toggleCourseView(): void {
  this.showCourseWise = !this.showCourseWise;

  if (this.showCourseWise && Object.keys(this.groupedByCourse).length === 0) {
    this.groupStudentsByCourse();
  }
}

groupStudentsByCourse(): void {
  this.groupedByCourse = this.students.reduce((acc, student) => {
    const courseName = student.course?.name || 'Unknown Course';
    if (!acc[courseName]) acc[courseName] = [];
    acc[courseName].push(student);
    return acc;
  }, {} as { [key: string]: any[] });
}

getStudentImage(student: any): string {
  return student.profileImage
    ? `http://localhost:8080/images/${student.profileImage}`
    : '../../../../assets/img/mentors/default.jpg';
}

courseMessages: { [courseName: string]: string } = {};

sendCourseMessage(courseName: string): void {
  const message = this.courseMessages[courseName]?.trim();
  if (!message) return;

  const students = this.groupedByCourse[courseName];
  const payloads = students.map(student => ({
    senderId: this.mentorId,
    receiverId: student.id,
    content: message,
    type: 'COURSE_ANNOUNCEMENT' // 🔴 special type
  }));

  // Send messages one by one (you can optimize this later)
  payloads.forEach(payload => {
    this.http.post('http://localhost:8080/api/messages/send', payload).subscribe();
  });

  alert(`Announcement sent to all students in ${courseName}`);
  this.courseMessages[courseName] = ''; // Clear input
}





}