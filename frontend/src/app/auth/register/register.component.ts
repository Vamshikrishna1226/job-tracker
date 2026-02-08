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
  selector: 'app-register',
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
          <mat-card-title>Create account</mat-card-title>
          <mat-card-subtitle>Start tracking your job search</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
            <div class="name-row">
              <mat-form-field appearance="outline">
                <mat-label>First Name</mat-label>
                <input matInput formControlName="firstName">
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Last Name</mat-label>
                <input matInput formControlName="lastName">
              </mat-form-field>
            </div>
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Email</mat-label>
              <input matInput type="email" formControlName="email">
              <mat-error *ngIf="registerForm.get('email')?.invalid">Enter a valid email</mat-error>
            </mat-form-field>
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Password</mat-label>
              <input matInput type="password" formControlName="password">
              <mat-error *ngIf="registerForm.get('password')?.invalid">Min 6 characters</mat-error>
            </mat-form-field>
            <p class="error-message" *ngIf="errorMessage">{{ errorMessage }}</p>
            <button mat-raised-button color="primary" type="submit"
                    [disabled]="registerForm.invalid || loading" class="full-width">
              <mat-spinner diameter="20" *ngIf="loading"></mat-spinner>
              <span *ngIf="!loading">Create Account</span>
            </button>
          </form>
        </mat-card-content>
        <mat-card-actions>
          <p class="text-center">Already have an account? <a routerLink="/login">Sign in</a></p>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
styles: [`
    .auth-container { display: flex; flex-direction: column; justify-content: center; align-items: center; min-height: 100vh; padding: 24px; background: linear-gradient(135deg, #1a237e 0%, #3949ab 100%); }
    .logo-section { text-align: center; margin-bottom: 24px; color: white; }
    .app-logo { font-size: 48px; width: 48px; height: 48px; }
    .app-name { font-size: 28px; font-weight: 700; margin: 8px 0 4px; }
    .app-tagline { font-size: 14px; opacity: 0.85; }
    .auth-card { width: 100%; max-width: 460px; padding: 16px; }
    .full-width { width: 100%; margin-bottom: 12px; }
    .name-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px; }
    .name-row mat-form-field { width: 100%; }
    .text-center { text-align: center; margin-top: 8px; }
  `]
})
export class RegisterComponent {
  registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName:  ['', Validators.required],
    email:     ['', [Validators.required, Validators.email]],
    password:  ['', [Validators.required, Validators.minLength(6)]]
  });

  loading = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    if (this.registerForm.invalid) return;
    this.loading = true;
    this.errorMessage = '';
    this.authService.register(this.registerForm.value as any).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: err => {
        this.errorMessage = err.error?.message || 'Registration failed. Try again.';
        this.loading = false;
      }
    });
  }
}