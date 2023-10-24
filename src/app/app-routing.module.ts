import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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
    loadComponent: () => import('./features/admin/admin.component').then((m) => m.AdminComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./core/auth/auth.component').then((m) => m.AuthComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./core/auth/auth.component').then((m) => m.AuthComponent),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
  }),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
