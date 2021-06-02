import { NbMenuItem } from '@nebular/theme';

export const userMenu: NbMenuItem[] = [
  {
    title: 'Main Panel',
    icon: 'home-outline',
    link: '/user',
  },
  {
    title: 'Profile',
    icon: 'person-outline',
    link: '/user/profile',
  },
  {
    title: 'Cinema Point List',
    icon: 'list-outline',
    link: '/user/beacon-point',
  },
  {
    title: 'Contact Us',
    icon: 'phone-call-outline',
    link: '/user/contactUs',
  },
  {
    title: 'Change password',
    icon: 'unlock-outline',
    link: '/user/changePassword',
  },
];
