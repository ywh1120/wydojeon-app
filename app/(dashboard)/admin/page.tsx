import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Link from 'next/link'

export default function AdminPage() {

  return (
    <Box sx={{ width: '100%' }}>
    
      <Typography>
      관리자 메뉴 입니다. 이동 메뉴를 선택하세요.
      </Typography>
      <Stack spacing={2}>
        <Link href="/admin/attendlist"><Button variant="contained" >봉사자관리</Button></Link>
        <Link href="/admin/sendsms"><Button variant="contained" >알림문자전송</Button></Link>
      </Stack>
    
    </Box>
  );
}
