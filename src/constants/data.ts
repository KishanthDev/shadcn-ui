import { NavItem } from '@/types';

export type Product = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

//Info: The following data is used for the sidebar navigation and Cmd K bar.
export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/overview',
    icon: 'dashboard',
    isActive: false,
  },
  {
    title: 'Gen AI UserMetrics',
    url: '/genai-usermetrics',
    icon: 'product',
    isActive: false,
    items: [
      {
        title: 'GitHub Copilot',
        url: '/genai-usermetrics/github-copilot',
        icon: 'userPen',
        shortcut: ['u', 'm']
      },
      {
        title: 'Cursor Analytics',
        url: '/genai-usermetrics/cursor-analytics',
        icon: 'login',
        shortcut: ['u', 'a']
      }
    ] // No child items
  },
  {
    title: 'Microservices',
    url: '/copilot',
    icon: 'logo',
    isActive: false,
    items: [
      {
        title: 'Generate',
        url: '/generate',
        icon: 'dashboard',
        shortcut: ['d', 'd']
      },
      {
        title: 'Build',
        url: '/build',
        icon: 'product',
        shortcut: ['p', 'p']
      },
      {
        title: 'Deploy',
        url: '/deploy',
        icon: 'billing',
        shortcut: ['b', 'b']
      }
    ]
  },
  {
    title: 'Gen AI Dashboard',
    url: '/gen-ai',
    icon: 'kanban',
    shortcut: ['k', 'k'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Secret Management',
    url: '/secret-management', // Placeholder as there is no direct link for the parent
    icon: 'billing',
    isActive: true,

    items: [
      {
        title: 'Secret Explorer',
        url: '/secret-management/secret-explorer',
        icon: 'userPen',
        shortcut: ['m', 'm']
      },
      {
        title: 'Change Requests',
        shortcut: ['l', 'l'],
        url: '/secret-management/change-requests',
        icon: 'login'
      }
    ]
  },
  {
    title: 'Microfrontends', url: '/microfrontends', icon: 'settings', isActive: false,
    items: [
      {
        title: 'Generate',
        url: '/generate',
        icon: 'dashboard',
        shortcut: ['d', 'd']
      },
      {
        title: 'Build',
        url: '/build',
        icon: 'product',
        shortcut: ['p', 'p']
      },
      {
        title: 'Deploy',
        url: '/deploy',
        icon: 'billing',
        shortcut: ['b', 'b']
      }
    ] // No child items
  }
];

export interface SaleUser {
  id: number;
  name: string;
  email: string;
  amount: string;
  image: string;
  initials: string;
}

export const recentSalesData: SaleUser[] = [
  {
    id: 1,
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    amount: '+$1,999.00',
    image: 'https://api.slingacademy.com/public/sample-users/1.png',
    initials: 'OM'
  },
  {
    id: 2,
    name: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/2.png',
    initials: 'JL'
  },
  {
    id: 3,
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    amount: '+$299.00',
    image: 'https://api.slingacademy.com/public/sample-users/3.png',
    initials: 'IN'
  },
  {
    id: 4,
    name: 'William Kim',
    email: 'will@email.com',
    amount: '+$99.00',
    image: 'https://api.slingacademy.com/public/sample-users/4.png',
    initials: 'WK'
  },
  {
    id: 5,
    name: 'Sofia Davis',
    email: 'sofia.davis@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/5.png',
    initials: 'SD'
  }
];
