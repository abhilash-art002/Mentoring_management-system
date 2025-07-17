import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-counters',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counters.component.html',
  styleUrl: './counters.component.css'
})
export class CountersComponent implements OnInit {
  mentors: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8080/api/users/mentors')
      .subscribe(data => {
        this.mentors = data;
      });
  }

  getProfileImage(profileImage: string | null): string {
    return profileImage
      ? `http://localhost:8080/images/${profileImage}`
      : 'assets/img/mentors/default.jpg';
  }

}
