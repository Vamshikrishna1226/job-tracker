import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ApplicationService } from '../../shared/services/application.service';

@Component({
  selector: 'app-application-form',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, RouterLink,
    MatCardModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatButtonModule, MatDatepickerModule,
    MatNativeDateModule, MatSnackBarModule
  ],
  template: `
    <div class="container" style="padding-top: 32px; max-width: 700px;">
      <h1 class="page-title">{{ isEditMode ? 'Edit Application' : 'Add Application' }}</h1>

      <mat-card>
        <mat-card-content>
          <form [formGroup]="appForm" (ngSubmit)="onSubmit()">
            <div class="form-row">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Company Name *</mat-label>
                <input matInput formControlName="companyName">
              </mat-form-field>
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Job Title *</mat-label>
                <input matInput formControlName="jobTitle">
              </mat-form-field>
            </div>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Job URL</mat-label>
              <input matInput formControlName="jobUrl" placeholder="https://...">
            </mat-form-field>

            <div class="form-row">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Location</mat-label>
                <input matInput formControlName="location" placeholder="Bangalore / Remote">
              </mat-form-field>
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Status *</mat-label>
                <mat-select formControlName="status">
                  <mat-option value="APPLIED">Applied</mat-option>
                  <mat-option value="SCREENING">Screening</mat-option>
                  <mat-option value="INTERVIEW">Interview</mat-option>
                  <mat-option value="OFFER">Offer</mat-option>
                  <mat-option value="REJECTED">Rejected</mat-option>
                </mat-select>
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Min Salary (LPA)</mat-label>
                <input matInput type="number" formControlName="salaryMin">
              </mat-form-field>
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Max Salary (LPA)</mat-label>
                <input matInput type="number" formControlName="salaryMax">
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Applied Date</mat-label>
                <input matInput [matDatepicker]="appliedPicker" formControlName="appliedDate">
                <mat-datepicker-toggle matIconSuffix [for]="appliedPicker"></mat-datepicker-toggle>
                <mat-datepicker #appliedPicker></mat-datepicker>
              </mat-form-field>
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Follow-up Date</mat-label>
                <input matInput [matDatepicker]="followPicker" formControlName="followUpDate">
                <mat-datepicker-toggle matIconSuffix [for]="followPicker"></mat-datepicker-toggle>
                <mat-datepicker #followPicker></mat-datepicker>
              </mat-form-field>
            </div>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Notes</mat-label>
              <textarea matInput formControlName="notes" rows="3" placeholder="Recruiter name, referral, anything useful..."></textarea>
            </mat-form-field>

            <div class="form-actions">
              <button mat-stroked-button type="button" routerLink="/applications">Cancel</button>
              <button mat-raised-button color="primary" type="submit" [disabled]="appForm.invalid || loading">
                {{ isEditMode ? 'Save Changes' : 'Add Application' }}
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .full-width { width: 100%; margin-bottom: 8px; }
    .form-actions { display: flex; justify-content: flex-end; gap: 12px; margin-top: 8px; }
    @media (max-width: 600px) { .form-row { grid-template-columns: 1fr; } }
  `]
})
export class ApplicationFormComponent implements OnInit {
  appForm = this.fb.group({
    companyName: ['', Validators.required],
    jobTitle:    ['', Validators.required],
    jobUrl:      [''],
    location:    [''],
    status:      ['APPLIED', Validators.required],
    salaryMin:   [null],
    salaryMax:   [null],
    appliedDate: [null],
    followUpDate:[null],
    notes:       ['']
  });

  isEditMode = false;
  applicationId = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private appService: ApplicationService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.applicationId = this.route.snapshot.params['id'];
    if (this.applicationId) {
      this.isEditMode = true;
      this.appService.getById(this.applicationId).subscribe(app => {
        this.appForm.patchValue(app as any);
      });
    }
  }

  onSubmit(): void {
    if (this.appForm.invalid) return;
    this.loading = true;

    const action = this.isEditMode
      ? this.appService.update(this.applicationId, this.appForm.value as any)
      : this.appService.create(this.appForm.value as any);

    action.subscribe({
      next: () => {
        this.snackBar.open(this.isEditMode ? 'Application updated' : 'Application added', 'OK', { duration: 3000 });
        this.router.navigate(['/applications']);
      },
      error: () => {
        this.snackBar.open('Something went wrong', 'OK', { duration: 3000 });
        this.loading = false;
      }
    });
  }
}