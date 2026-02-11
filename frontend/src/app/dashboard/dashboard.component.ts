import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ApplicationService } from '../shared/services/application.service';
import { AuthService } from '../shared/services/auth.service';
import { ApplicationStats } from '../shared/models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <div class="container" style="padding-top: 32px;">
      <h1 class="page-title">Hello, {{ user?.firstName }}</h1>

      <div class="stats-grid" *ngIf="stats">
        <mat-card class="stat-card total">
          <mat-card-content>
            <div class="stat-number">{{ stats.total }}</div>
            <div class="stat-label">Total Applications</div>
          </mat-card-content>
        </mat-card>
        <mat-card class="stat-card applied">
          <mat-card-content>
            <div class="stat-number">{{ stats.applied }}</div>
            <div class="stat-label">Applied</div>
          </mat-card-content>
        </mat-card>
        <mat-card class="stat-card screening">
          <mat-card-content>
            <div class="stat-number">{{ stats.screening }}</div>
            <div class="stat-label">Screening</div>
          </mat-card-content>
        </mat-card>
        <mat-card class="stat-card interview">
          <mat-card-content>
            <div class="stat-number">{{ stats.interview }}</div>
            <div class="stat-label">Interview</div>
          </mat-card-content>
        </mat-card>
        <mat-card class="stat-card offer">
          <mat-card-content>
            <div class="stat-number">{{ stats.offer }}</div>
            <div class="stat-label">Offers</div>
          </mat-card-content>
        </mat-card>
        <mat-card class="stat-card rejected">
          <mat-card-content>
            <div class="stat-number">{{ stats.rejected }}</div>
            <div class="stat-label">Rejected</div>
          </mat-card-content>
        </mat-card>
      </div>

      <div class="actions" style="margin-top: 32px;">
        <button mat-raised-button color="primary" routerLink="/applications/new">
          <mat-icon>add</mat-icon> Add Application
        </button>
        <button mat-stroked-button routerLink="/applications" style="margin-left: 12px;">
          View All
        </button>
      </div>
    </div>
  `,
  styles: [`
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      gap: 16px;
      margin-top: 24px;
    }
    .stat-card { text-align: center; padding: 8px; }
    .stat-number { font-size: 36px; font-weight: 700; }
    .stat-label { font-size: 13px; color: #666; margin-top: 4px; }
    .total .stat-number    { color: #1565c0; }
    .applied .stat-number  { color: #1565c0; }
    .screening .stat-number{ color: #e65100; }
    .interview .stat-number{ color: #6a1b9a; }
    .offer .stat-number    { color: #2e7d32; }
    .rejected .stat-number { color: #c62828; }
  `]
})
export class DashboardComponent implements OnInit {
  stats: ApplicationStats | null = null;
  user = this.authService.getCurrentUser();

  constructor(
    private appService: ApplicationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.appService.getStats().subscribe(stats => this.stats = stats);
  }
}