import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-communicate',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './communicate.component.html',
  styleUrl: './communicate.component.css'
})
export class CommunicateComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() userId!: number;     // sender
  @Input() otherId!: number;    // receiver

  @ViewChild('scrollAnchor') scrollAnchor!: ElementRef;

  messages: any[] = [];
  newMessage: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log('🟢 CommunicateComponent loaded for:', this.userId, '->', this.otherId);
    this.loadMessages();
  }

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userId'] || changes['otherId']) {
      this.loadMessages();
    }
  }

  loadMessages(): void {
    if (!this.userId || !this.otherId) return;

    this.http.get<any[]>(`http://localhost:8080/api/messages/chat/${this.userId}/${this.otherId}`)
      .subscribe(data => {
        this.messages = data;
        setTimeout(() => this.scrollToBottom(), 100); // wait for DOM render
      });
  }

  sendMessage(): void {
    if (!this.newMessage.trim()) return;

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

  scrollToBottom(): void {
    if (this.scrollAnchor) {
      this.scrollAnchor.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  trackByMsg(index: number, msg: any) {
    return msg.id;
  }

  get groupedMessages(): { [key: string]: any[] } {
    return this.messages.reduce((acc, msg) => {
      const date = new Date(msg.timestamp).toLocaleDateString();
      if (!acc[date]) acc[date] = [];
      acc[date].push(msg);
      return acc;
    }, {} as { [key: string]: any[] });
  }
}
