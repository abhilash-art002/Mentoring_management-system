import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent {
  // For switching views
  isSignUpActive = false;

  // Login fields
  loginEmail = '';
  loginPassword = '';
  errorMessage = '';

  // Register fields
  name = '';
  email = '';
  password = '';
  role = '';
  successMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  toggleForm(isSignUp: boolean) {
    this.isSignUpActive = isSignUp;
    this.errorMessage = '';
    this.successMessage = '';
  }

  onLogin() {
    this.http.post<any>('http://localhost:8080/api/users/login', {
      email: this.loginEmail,
      password: this.loginPassword
    }).subscribe({
      next: (res) => {
        alert('Login successful as ' + res.role);
        localStorage.setItem('user', JSON.stringify(res));
        this.router.navigate(['/' + res.role.toLowerCase()]);
      },
      error: () => this.errorMessage = 'Invalid credentials'
    });
  }

  onRegister() {
    const newUser = {
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role
    };

    this.http.post('http://localhost:8080/api/users/register', newUser).subscribe({
      next: () => {
        this.successMessage = 'Registered successfully!';
        this.name = this.email = this.password = this.role = '';
      },
      error: () => alert('Registration failed.')
    });
  }
}
