export interface User {
    email: string;
    firstName: string;
    lastName: string;
    token: string;
  }
  
  export interface JobApplication {
    id?: string;
    companyName: string;
    jobTitle: string;
    jobUrl?: string;
    location?: string;
    status: ApplicationStatus;
    notes?: string;
    salaryMin?: number;
    salaryMax?: number;
    appliedDate?: string;
    followUpDate?: string;
    createdAt?: string;
    updatedAt?: string;
  }
  
  export type ApplicationStatus = 'APPLIED' | 'SCREENING' | 'INTERVIEW' | 'OFFER' | 'REJECTED';
  
  export interface ApplicationStats {
    total: number;
    applied: number;
    screening: number;
    interview: number;
    offer: number;
    rejected: number;
  }
  
  export interface AuthRequest {
    email: string;
    password: string;
  }
  
  export interface RegisterRequest extends AuthRequest {
    firstName: string;
    lastName: string;
  }