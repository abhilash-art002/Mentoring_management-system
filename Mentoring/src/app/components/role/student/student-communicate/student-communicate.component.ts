import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-communicate',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-communicate.component.html',
  styleUrl: './student-communicate.component.css'
})
export class StudentCommunicateComponent implements OnInit {

    constructor(private http: HttpClient) {}

  @Input() userId!: number;
@Input() otherId!: number;

messages: any[] = [];
newMessage = '';

ngOnInit() {
  this.loadMessages();
}

loadMessages() {
  this.http.get<any[]>(`http://localhost:8080/api/messages/chat/${this.userId}/${this.otherId}`)
    .subscribe(data => this.messages = data);
}

sendMessage() {
  const payload = {
    senderId: this.userId,
    receiverId: this.otherId,
    content: this.newMessage
  };
  this.http.post(`http://localhost:8080/api/messages/send`, payload).subscribe(() => {
    this.newMessage = '';
    this.loadMessages();
  });
}


}
