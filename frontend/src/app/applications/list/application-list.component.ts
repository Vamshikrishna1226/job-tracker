import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ApplicationService } from '../../shared/services/application.service';
import { JobApplication } from '../../shared/models';

@Component({
  selector: 'app-application-list',
  standalone: true,
  imports: [
    CommonModule, RouterLink, FormsModule,
    MatCardModule, MatButtonModule, MatIconModule,
    MatSelectModule, MatFormFieldModule, MatSnackBarModule
  ],
  template: `
    <div class="container" style="padding-top: 32px;">
      <div class="header-row">
        <h1 class="page-title" style="margin-bottom:0">Applications</h1>
        <div class="header-actions">
          <mat-form-field appearance="outline" style="width:160px; margin-right:12px;">
            <mat-label>Filter by status</mat-label>
            <mat-select [(ngModel)]="selectedStatus" (ngModelChange)="onStatusChange($event)">
              <mat-option value="">All</mat-option>
              <mat-option value="APPLIED">Applied</mat-option>
              <mat-option value="SCREENING">Screening</mat-option>
              <mat-option value="INTERVIEW">Interview</mat-option>
              <mat-option value="OFFER">Offer</mat-option>
              <mat-option value="REJECTED">Rejected</mat-option>
            </mat-select>
          </mat-form-field>
          <button mat-raised-button color="primary" routerLink="/applications/new">
            <mat-icon>add</mat-icon> Add New
          </button>
        </div>
      </div>

      <div class="empty-state" *ngIf="applications.length === 0">
        <mat-icon style="font-size:48px; width:48px; height:48px; color:#ccc;">work_off</mat-icon>
        <p>No applications yet. <a routerLink="/applications/new">Add your first one.</a></p>
      </div>

      <div class="applications-grid">
        <mat-card class="app-card" *ngFor="let app of applications">
          <mat-card-content>
            <div class="app-header">
              <div>
                <div class="company-name">{{ app.companyName }}</div>
                <div class="job-title">{{ app.jobTitle }}</div>
              </div>
              <span class="status-chip {{ app.status }}">{{ app.status }}</span>
            </div>
            <div class="app-meta" *ngIf="app.location">
              <mat-icon style="font-size:14px; width:14px; height:14px;">location_on</mat-icon>
              {{ app.location }}
            </div>
            <div class="app-meta" *ngIf="app.appliedDate">
              Applied: {{ app.appliedDate | date:'mediumDate' }}
            </div>
            <div class="app-notes" *ngIf="app.notes">{{ app.notes }}</div>
          </mat-card-content>
          <mat-card-actions>
            <button mat-button [routerLink]="['/applications', app.id, 'edit']">Edit</button>
            <button mat-button color="warn" (click)="deleteApp(app)">Delete</button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .header-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 12px; }
    .header-actions { display: flex; align-items: center; }
    .applications-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; margin-top: 16px; }
    .app-card { cursor: pointer; }
    .app-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; }
    .company-name { font-size: 16px; font-weight: 600; }
    .job-title { font-size: 14px; color: #555; margin-top: 2px; }
    .app-meta { font-size: 12px; color: #777; display: flex; align-items: center; gap: 4px; margin-top: 4px; }
    .app-notes { font-size: 13px; color: #555; margin-top: 8px; border-top: 1px solid #f0f0f0; padding-top: 8px; }
    .empty-state { text-align: center; padding: 64px 0; color: #999; }
    .empty-state p { margin-top: 12px; }
  `]
})
export class ApplicationListComponent implements OnInit {
  applications: JobApplication[] = [];
  selectedStatus = '';

  constructor(
    private appService: ApplicationService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications(): void {
    this.appService.getAll(this.selectedStatus || undefined).subscribe(apps => {
      this.applications = apps;
    });
  }

  onStatusChange(status: string): void {
    this.selectedStatus = status;
    this.loadApplications();
  }

  deleteApp(app: JobApplication): void {
    if (!confirm(`Delete application for ${app.companyName}?`)) return;
    this.appService.delete(app.id!).subscribe({
      next: () => {
        this.applications = this.applications.filter(a => a.id !== app.id);
        this.snackBar.open('Application deleted', 'OK', { duration: 3000 });
      }
    });
  }
}