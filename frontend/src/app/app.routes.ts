import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard]
  },
  {
    path: 'applications',
    loadComponent: () => import('./applications/list/application-list.component').then(m => m.ApplicationListComponent),
    canActivate: [authGuard]
  },
  {
    path: 'applications/new',
    loadComponent: () => import('./applications/form/application-form.component').then(m => m.ApplicationFormComponent),
    canActivate: [authGuard]
  },
  {
    path: 'applications/:id/edit',
    loadComponent: () => import('./applications/form/application-form.component').then(m => m.ApplicationFormComponent),
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: 'dashboard' }
];