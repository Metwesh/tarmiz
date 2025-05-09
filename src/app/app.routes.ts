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
          import('./pages/dashboard/dashboard.component').then(
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
              import('./pages/assets-list/assets-list.component').then(
                (m) => m.AssetsListComponent
              ),
          },
          {
            path: 'create',
            loadComponent: () =>
              import('./pages/asset-create/asset-create.component').then(
                (m) => m.AssetCreateComponent
              ),
          },
          {
            path: 'pending-subscribers',
            loadComponent: () =>
              import(
                './pages/subscribers-list/subscribers-list.component'
              ).then((m) => m.SubscribersListComponent),
          },
          {
            path: ':id',
            loadComponent: () =>
              import('./pages/asset-inner/asset-inner.component').then(
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
                './pages/transaction-list/transaction-list.component'
              ).then((m) => m.TransactionListComponent),
          },
          {
            path: ':id',
            loadComponent: () =>
              import(
                './pages/transaction-inner/transaction-inner.component'
              ).then((m) => m.TransactionInnerComponent),
          },
        ],
      },
      {
        path: 'users',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list',
            loadComponent: () =>
              import('./pages/users-list/users-list.component').then(
                (m) => m.UsersListComponent
              ),
          },
          {
            path: ':id',
            loadComponent: () =>
              import('./pages/user-inner/user-inner.component').then(
                (m) => m.UserInnerComponent
              ),
          },
        ],
      },
      {
        path: 'account',
        children: [
          { path: '', redirectTo: 'profile', pathMatch: 'full' },
          {
            path: 'profile',
            loadComponent: () =>
              import('./pages/profile/profile.component').then(
                (m) => m.ProfileComponent
              ),
          },
        ],
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
    canActivate: [redundantAuthGuard],
    data: {
      title: 'Login Page',
    },
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.component').then(
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
      import('./pages/page404/page404.component').then(
        (m) => m.Page404Component
      ),
    data: {
      title: 'Page 404',
    },
  },
  {
    path: '500',
    loadComponent: () =>
      import('./pages/page500/page500.component').then(
        (m) => m.Page500Component
      ),
    data: {
      title: 'Page 500',
    },
  },
  { path: '**', redirectTo: '404' },
];
