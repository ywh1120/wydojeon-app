'use client'
import * as React from 'react';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import FormDialog from '@/component/formdialog';

export default function HomePage() {
  const [isDialog, setIsDialog] = useState(false);

  const onDialog = () => {
    setIsDialog(true);
    
  };

  return (    
    <Box sx={{ backgroundImage:`url(https://wydseoul.org/img/main.png)`,width: '100%',height:'100%' }}>
      <Stack spacing={5} alignItems="center">
        <Typography variant="h4" gutterBottom>
            2027 세계청년대회 봉사자 관리 프로그램에 오신것을 환영합니다.
        </Typography>

        <Typography variant="h2" gutterBottom>

        </Typography>
        <Stack spacing={ 2 } sx={{width:1/2}}>
          <FormDialog />
          <Button variant="contained" value="2" >회원가입</Button>
        </Stack>
      </Stack>
      
    </Box>
    
  );
}
