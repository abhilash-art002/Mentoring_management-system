import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HodStudentManagerComponent } from '../HOD/hod-student-manager/hod-student-manager.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hod-dashboard-component',
  standalone: true,
  imports: [HodStudentManagerComponent,CommonModule],
  templateUrl: './hod-dashboard-component.component.html',
  styleUrl: './hod-dashboard-component.component.css'
})
export class HodDashboardComponentComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('user') || '{}');
  hod: any = {};
  showEdit = false;
  selectedImage: File | null = null;
  selectedDefaultImage: string | null = null;

  defaultImages: string[] = [
    'default1.jpg',
    'default2.jpg',
    'default3.jpg',
    'default4.jpg',
    'default5.jpg'
  ];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadHod();
  }

  loadHod(): void {
    this.http.get(`http://localhost:8080/api/users/${this.user.id}`).subscribe((data: any) => {
      this.hod = data;
    });
  }

  getProfileImage(): string {
    return this.hod.profileImage
      ? `http://localhost:8080/images/${this.hod.profileImage}`
      : `assets/img/mentors/default.jpg`;
  }

  onFileSelected(event: any): void {
    this.selectedImage = event.target.files[0];
  }

  selectDefaultImage(img: string): void {
    this.selectedDefaultImage = img;
  }

  uploadDefaultImage(): void {
    if (!this.selectedDefaultImage) return;

    this.http.put(
      `http://localhost:8080/api/users/set-profile-image/${this.hod.id}?filename=${this.selectedDefaultImage}`,
      {}
    ).subscribe(() => {
      alert('Default image assigned!');
      this.loadHod();
      this.selectedDefaultImage = null;
      this.showEdit = false;
    });
  }

  uploadImage(): void {
    if (!this.selectedImage) return;

    const formData = new FormData();
    formData.append('image', this.selectedImage);

    this.http.put(`http://localhost:8080/api/users/upload-profile-image/${this.hod.id}`, formData)
      .subscribe(() => {
        alert('Image uploaded successfully');
        this.loadHod();
        this.selectedImage = null;
        this.showEdit = false;
      });
  }

  handleImageSubmit(): void {
    if (this.selectedDefaultImage) {
      this.uploadDefaultImage();
    } else if (this.selectedImage) {
      this.uploadImage();
    } else {
      alert('Please select or upload an image');
    }
  }
}
