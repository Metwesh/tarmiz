import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';
import { authGuardChild } from './guards/auth.guard';
import { redundantAuthGuard } from './guards/redundant-auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivateChild: [authGuardChild],
    data: {
      title: 'Home',
    },
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./views/pages/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
      {
        path: 'assets',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list',
            loadComponent: () =>
              import('./views/pages/assets-list/assets-list.component').then(
                (m) => m.AssetsListComponent
              ),
          },
          {
            path: 'create',
            loadComponent: () =>
              import('./views/pages/asset-create/asset-create.component').then(
                (m) => m.AssetCreateComponent
              ),
          },
          {
            path: ':id',
            loadComponent: () =>
              import('./views/pages/asset-inner/asset-inner.component').then(
                (m) => m.AssetInnerComponent
              ),
          },
        ],
      },
      {
        path: 'transactions',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list',
            loadComponent: () =>
              import(
                './views/pages/transaction-list/transaction-list.component'
              ).then((m) => m.TransactionListComponent),
          },
        ],
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./views/pages/login/login.component').then(
        (m) => m.LoginComponent
      ),
    canActivate: [redundantAuthGuard],
    data: {
      title: 'Login Page',
    },
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./views/pages/register/register.component').then(
        (m) => m.RegisterComponent
      ),
    canActivate: [redundantAuthGuard],

    data: {
      title: 'Register Page',
    },
  },
  {
    path: '404',
    loadComponent: () =>
      import('./views/pages/page404/page404.component').then(
        (m) => m.Page404Component
      ),
    data: {
      title: 'Page 404',
    },
  },
  {
    path: '500',
    loadComponent: () =>
      import('./views/pages/page500/page500.component').then(
        (m) => m.Page500Component
      ),
    data: {
      title: 'Page 500',
    },
  },
  { path: '**', redirectTo: '404' },
];
