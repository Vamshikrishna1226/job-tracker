import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobApplication, ApplicationStats } from '../models';

@Injectable({ providedIn: 'root' })
export class ApplicationService {

  private readonly baseUrl = 'http://localhost:8080/api/applications';

  constructor(private http: HttpClient) {}

  getAll(status?: string): Observable<JobApplication[]> {
    let params = new HttpParams();
    if (status) params = params.set('status', status);
    return this.http.get<JobApplication[]>(this.baseUrl, { params });
  }

  getById(id: string): Observable<JobApplication> {
    return this.http.get<JobApplication>(`${this.baseUrl}/${id}`);
  }

  create(application: Partial<JobApplication>): Observable<JobApplication> {
    return this.http.post<JobApplication>(this.baseUrl, application);
  }

  update(id: string, application: Partial<JobApplication>): Observable<JobApplication> {
    return this.http.put<JobApplication>(`${this.baseUrl}/${id}`, application);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getStats(): Observable<ApplicationStats> {
    return this.http.get<ApplicationStats>(`${this.baseUrl}/stats`);
  }
}