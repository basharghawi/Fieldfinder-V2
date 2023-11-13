import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';
import { UserService } from '@core/services/user.service';
import { map } from 'rxjs';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
    title: 'FieldFinder | Search, Book Fields Near You'
  },
  {
    path: 'fields',
    loadComponent: () => import('./features/field-listing/field-listing.component').then((m) => m.FieldListingComponent),
    title: 'Search Fields'
  },
  {
    path: 'field',
    children: [
      {
        path: ':id',
        loadComponent: () => import('./features/field-detailed/field-detailed.component').then((m) => m.FieldDetailedComponent)
      }
    ]
  },
  {
    path: 'admin',
    loadComponent: () => import('./features/admin/admin.component').then((m) => m.AdminComponent),
    canActivate: [authGuard]
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
    canActivate: [authGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./core/auth/auth.component').then((m) => m.AuthComponent),
    title: 'Login',
    canActivate: [
      () => inject(UserService).isAuthenticated.pipe(map((isAuth) => !isAuth))
    ]
  },
  {
    path: 'register',
    loadComponent: () => import('./core/auth/auth.component').then((m) => m.AuthComponent),
    title: 'Register',
    canActivate: [
      () => inject(UserService).isAuthenticated.pipe(map((isAuth) => !isAuth))
    ]
  },
  {
    path: 'booking',
    loadComponent: () => import('./features/booking/booking.component').then((m) => m.BookingComponent),
    canActivate: [authGuard]
  }
];