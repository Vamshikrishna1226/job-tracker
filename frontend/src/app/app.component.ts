import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, MatToolbarModule, MatButtonModule, MatIconModule],
  template: `
  <mat-toolbar color="primary" *ngIf="authService.isLoggedIn()">
    <mat-icon style="margin-right: 8px;">work</mat-icon>
    <span routerLink="/dashboard" style="cursor:pointer; font-weight:600; font-size:18px;">JobTracker</span>
    <span style="flex: 1"></span>
    <button mat-button routerLink="/dashboard">
      <mat-icon>dashboard</mat-icon> Dashboard
    </button>
    <button mat-button routerLink="/applications">
      <mat-icon>list</mat-icon> Applications
    </button>
    <button mat-button routerLink="/applications/new">
      <mat-icon>add_circle</mat-icon> Add New
    </button>
    <button mat-icon-button (click)="logout()" title="Logout">
      <mat-icon>logout</mat-icon>
    </button>
  </mat-toolbar>
  <router-outlet></router-outlet>
`
})
export class AppComponent {
  constructor(public authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}