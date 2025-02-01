'use client'
import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { doc, setDoc, getDoc } from "@firebase/firestore";
import dbmodule from "@/dbinfo/firebasedb";

type attendType = {
  name : string,
  baptismal : string,
  email : string,
  attendpurpose : string,
  attendyn : string,
  attenddate : Date
}

//let attend_available : boolean = false;
let attend_letter : string = '';
let today : Date = new Date();
let year : number = today.getFullYear();
let month : string = ('0' + (today.getMonth() + 1)).slice(-2);
let day : string = ('0' + today.getDate()).slice(-2);
let dateString = year + '-' + month  + '-' + day;

export default function AttendPage() {
  let [active, setActive] = useState(false);

  let attendData : attendType = 
  {
    name :'',
    baptismal : '',
    email : '',
    attendpurpose : '',
    attendyn : '',
    attenddate : new Date()
  };
  useEffect(() => {
    async function getdocument() {
      let attend : boolean = false
      let attendstart : boolean = false
      const c = await getDoc(doc(dbmodule, "attend", "이원호"));
      if(c.exists()){
        const getdata1 = c.data()?.['attendData']; 
        if(getdata1.attendyn === 'Y'){ //출석버튼을 이미 찍은 경우
          attend = true       
        }else{
          attend = false
        }
      }
      
      const d = await getDoc(doc(dbmodule, "attendstart", dateString));
      if(d.exists()){
        const getdata2 = d.data()?.['attendStartData']; 

        if(getdata2.attendstartyn === 'Y'){ //관리자가 출석시작을 찍은 경우
          attendstart = true
          attend_letter = getdata2.attendpurpose
        }else{
          attendstart = false
          attend_letter = '출석기간이 아닙니다.'
        }
      }
      
      if((attend && attendstart) || !attendstart){
        setActive(true)
      }else if((!attend && attendstart)){
        setActive(false)
      }
    }
    getdocument()
  }, []);
  
  const onClickUpLoadButton = async (e: any) => {
    
    attendData.name = '이원호';
    attendData.baptismal = '라우렌시오';
    attendData.email = 'ywh1120@gmail.com';
    attendData.attendpurpose = attend_letter;
    if(e.target.value === "1"){
      attendData.attendyn = 'Y';
      setActive(true)
    }else{
      attendData.attendyn = 'N';
      setActive(false)
    }
    await setDoc(doc(dbmodule, "attend", attendData.name),{attendData})
  }

  return (
    <Box sx={{ width: '100%' }}>
      <form onSubmit={(event) => event.preventDefault()}>
        <Typography>
          { attend_letter }
        </Typography>
        <Stack spacing={2}>
          <Button variant="contained" color="success" value="1" onClick={onClickUpLoadButton} disabled={active}>참석</Button>
          <Button variant="contained" color="error" value="2" onClick={onClickUpLoadButton}>불참</Button>
        </Stack>
      </form>
    </Box>
    
  );
}
