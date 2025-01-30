import * as React from 'react';
import { NextAppProvider } from '@toolpad/core/nextjs';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LinearProgress from '@mui/material/LinearProgress'
import type { Navigation } from '@toolpad/core/AppProvider';

import theme from '../theme';

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: '',
    title: 'WYD',
    icon: <DashboardIcon />,
  },
  {
    segment: 'attend',
    title: '봉사자출석',
    icon: <ShoppingCartIcon />,
  },
  {
    segment: 'notice',
    title: '공지사항',
    icon: <ShoppingCartIcon />,
  },
  {
    segment: 'qna',
    title: 'Q&A',
    icon: <ShoppingCartIcon />,
  },
  {
    segment: 'admin',
    title: '관리자메뉴',
    icon: <ShoppingCartIcon />,
    children: [
      {
        segment: 'attendlist',
        title: '봉사자출석관리',
        icon: <ShoppingCartIcon />,
      },
      {
        segment: 'sendsms',
        title: '알림문자전송',
        icon: <ShoppingCartIcon />,
      },
    ],
  },
];

const BRANDING = {
  title: '2027 World Youth Day 봉사자관리 프로그램',
};



export default function RootLayout(props: { children: React.ReactNode }) {
  

  return (
    <html lang="en" data-toolpad-color-scheme="light" suppressHydrationWarning>
      <body>
        
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <React.Suspense fallback={<LinearProgress />}>
            <NextAppProvider
              navigation={NAVIGATION}
              branding={BRANDING}
              
              theme={theme}
            >
              {props.children}
            </NextAppProvider>
            </React.Suspense>
          </AppRouterCacheProvider>
        
      </body>
    </html>
  );
}
