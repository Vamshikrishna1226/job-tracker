import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../shared/services/auth.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, RouterLink,
    MatCardModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatProgressSpinnerModule, MatIconModule
  ],
  template: `
    <div class="auth-container">
      <div class="logo-section">
        <mat-icon class="app-logo">work</mat-icon>
        <h2 class="app-name">JobTracker</h2>
        <p class="app-tagline">Track every application. Land the right job.</p>
      </div>
      <mat-card class="auth-card">
        <mat-card-header>
          <mat-card-title>Welcome back</mat-card-title>
          <mat-card-subtitle>Sign in to your account</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Email</mat-label>
              <input matInput type="email" formControlName="email" placeholder="you@example.com">
              <mat-error *ngIf="loginForm.get('email')?.hasError('required')">Email is required</mat-error>
              <mat-error *ngIf="loginForm.get('email')?.hasError('email')">Enter a valid email address</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Password</mat-label>
              <input matInput type="password" formControlName="password">
              <mat-error *ngIf="loginForm.get('password')?.hasError('required')">Password is required</mat-error>
            </mat-form-field>

            <p class="error-message" *ngIf="errorMessage">{{ errorMessage }}</p>

            <button mat-raised-button color="primary" type="submit"
                    [disabled]="loginForm.invalid || loading" class="full-width">
              <mat-spinner diameter="20" *ngIf="loading"></mat-spinner>
              <span *ngIf="!loading">Sign In</span>
            </button>
          </form>
        </mat-card-content>
        <mat-card-actions>
          <p class="text-center">Don't have an account? <a routerLink="/register">Register</a></p>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
styles: [`
    .auth-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 24px;
      background: linear-gradient(135deg, #1a237e 0%, #3949ab 100%);
    }
    .logo-section { text-align: center; margin-bottom: 24px; color: white; }
    .app-logo { font-size: 48px; width: 48px; height: 48px; }
    .app-name { font-size: 28px; font-weight: 700; margin: 8px 0 4px; }
    .app-tagline { font-size: 14px; opacity: 0.85; }
    .auth-card { width: 100%; max-width: 420px; padding: 16px; }
    .full-width { width: 100%; margin-bottom: 12px; }
    .text-center { text-align: center; margin-top: 8px; }
    mat-card-header { margin-bottom: 16px; }
  `]
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  loading = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    if (this.loginForm.invalid) return;
  
    this.loading = true;
    this.errorMessage = '';
  
    this.authService.login(this.loginForm.value as any).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: err => {
        if (err.status === 401) {
          this.errorMessage = 'Incorrect email or password. Please try again.';
        } else if (err.status === 400) {
          this.errorMessage = 'Please enter a valid email and password.';
        } else if (err.status === 0) {
          this.errorMessage = 'Cannot reach server. Check your connection.';
        } else {
          this.errorMessage = 'Something went wrong. Please try again.';
        }
        this.loading = false;
      }
    });
  }
}