import * as React from 'react';
import { NextAppProvider } from '@toolpad/core/nextjs';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Dashboard, BackHand, Campaign, AdminPanelSettings, QuestionAnswer, Sms, Checklist } from '@mui/icons-material';
import LinearProgress from '@mui/material/LinearProgress'
import type { Navigation } from '@toolpad/core/AppProvider';
import theme from '../theme';
import { CustomSnackbar } from '@/component/noticebar';

let authority: String = 'admin'
let NAVIGATION: Navigation = []

if ( authority === 'admin' ){
  NAVIGATION = [
    {
      kind: 'header',
      title: 'WYD 2027',
    },
    {
      segment: '',
      title: 'WYD',
      icon: <Dashboard />,
    },
    {
      segment: 'attend',
      title: '봉사자출석',
      icon: <BackHand />,
    },
    {
      segment: 'notice',
      title: '공지사항',
      icon: <Campaign />,
    },
    {
      segment: 'qna',
      title: 'Q&A',
      icon: <QuestionAnswer />,
    },
    {
      segment: 'admin',
      title: '관리자메뉴',
      icon: <AdminPanelSettings />,
      children: [
        {
          segment: 'attendlist',
          title: '봉사자관리',
          icon: <Checklist />,
        },
        {
          segment: 'sendsms',
          title: '알림문자전송',
          icon: <Sms />,
        },
      ],
    },
  ];
}else if(authority = 'user'){
  NAVIGATION = [
    {
      kind: 'header',
      title: 'Main items',
    },
    {
      segment: '',
      title: 'WYD',
      icon: <Dashboard />,
    },
    {
      segment: 'attend',
      title: '봉사자출석',
      icon: <BackHand />,
    },
    {
      segment: 'notice',
      title: '공지사항',
      icon: <Campaign />,
    },
    {
      segment: 'qna',
      title: 'Q&A',
      icon: <QuestionAnswer />,
    },
    
  ];
}else{
  NAVIGATION = [
    {
      kind: 'header',
      title: 'Main items',
    },
    {
      segment: '',
      title: 'WYD',
      icon: <Dashboard />,
    },
    
  ];
}

const BRANDING = {
  title: '2027 WYD 봉사자관리 프로그램',
};

export default function RootLayout(props: { children: React.ReactNode }) {
  

  return (
    <html lang="ko" data-toolpad-color-scheme="light" suppressHydrationWarning>
      <body>
        
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <React.Suspense fallback={<LinearProgress />}>
            <NextAppProvider
              navigation={NAVIGATION}
              branding={BRANDING}
              
              theme={theme}
            >
              {props.children}
              <CustomSnackbar />  
            </NextAppProvider>
            
            </React.Suspense>
          </AppRouterCacheProvider>
        
      </body>
    </html>
  );
}
