import { NbCardModule, NbMenuItem } from '@nebular/theme';

export const adminMenu: NbMenuItem[] = [
  {
    title: 'Dashboard User',
    icon: 'person-done-outline',
    link: '/admin',

  },
  {
    title: 'Cinemas',
    icon: 'film-outline',
    link: '/admin/cinema',

  },
  {
    title: 'Cinema Apps',
    icon: 'keypad-outline',
    link: '/admin/cinema-apps',
  },
  {
    title: 'App User',
    icon: 'people-outline',
    link: '/admin/app-user',
    },
  {
    title: 'Card Banners',
    icon: 'credit-card-outline',
    link: '/admin/card',
  },
];
