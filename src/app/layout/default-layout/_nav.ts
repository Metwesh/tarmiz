import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    title: true,
    name: 'Menu',
  },
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
  },
  {
    name: 'Assets',
    url: '/assets',
    iconComponent: { name: 'cil-diamond' },
    children: [
      {
        name: 'Asset List',
        url: '/assets/list',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'Asset Create',
        url: '/assets/create',
        icon: 'nav-icon-bullet',
      },
    ],
  },
  {
    name: 'Transactions',
    url: '/transactions',
    iconComponent: { name: 'cil-chart-line' },
    children: [
      {
        name: 'Transaction List',
        url: '/transactions/list',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'Transaction Create',
        url: '/transactions/create',
        icon: 'nav-icon-bullet',
      },
    ],
  },
  {
    name: 'Users',
    url: '/users',
    iconComponent: { name: 'cil-user' },
  },
  {
    name: 'Account',
    url: '/account',
    iconComponent: { name: 'cil-applications-settings' },
    children: [
      {
        name: 'Utilities',
        url: '/account/utilities',
        icon: 'nav-icon-bullet',
      },
      {
        name: 'Profile',
        url: '/account/profile',
        icon: 'nav-icon-bullet',
      },
    ],
  },
];
