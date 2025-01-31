'use client'
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { collection, addDoc } from "node_modules/firebase/firestore";
import firestore from "firebase/firestore"

let attend_available : boolean = false
let attend_letter : string = '정기 봉사자 미사'

const attendData = new Map<string, string>();

export default function AttendPage() {

  const onClickUpLoadButton = async (e: any) => {
    
    attendData.set('attendpurpose', attend_letter);
    if(e.target.value === "1"){
      attendData.set('attendyn', 'Y');
    }else{
      attendData.set('attendyn', 'N');
    }

    await addDoc(collection(firestore, `temp`),{
        attendData,
    })
  }

  return (
    <Box sx={{ width: '100%' }}>
      <form onSubmit={(event) => event.preventDefault()}>
        <Typography>
          {
            attend_available ?
            '금일 출석 목적 : ' + attend_letter 
            : attend_letter
          }
        </Typography>
        <Stack spacing={2}>
          <Button variant="contained" color="success" value="1" onClick={onClickUpLoadButton} disabled={attend_available}>참석</Button>
          <Button variant="contained" color="error" value="2" onClick={onClickUpLoadButton}>불참</Button>
        </Stack>
      </form>
    </Box>
    
  );
}
