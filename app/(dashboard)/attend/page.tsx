'use client'
import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { doc, setDoc, getDoc } from "@firebase/firestore";
import dbmodule from "@/dbinfo/firebasedb";
import { SnackbarContext } from '@/context/snackbarcontext';

type attendType = {
  name : string,
  baptismal : string,
  email : string,
  attendpurpose : string,
  attendyn : string,
  attenddate : string
}

//let attend_available : boolean = false;
//let attend_letter : string = '';
let today : Date = new Date();
let year : number = today.getFullYear();
let month : string = ('0' + (today.getMonth() + 1)).slice(-2);
let day : string = ('0' + today.getDate()).slice(-2);
let dateString = year + '-' + month  + '-' + day;

export default function AttendPage() {
  const [attendactive, setAttendActive] = useState(false);
  const [cancelactive, setCancelActive] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [attend_letter, setAttendletter] = useState('');
  const reservate_data = '이원호'
  // 객체를 사용하여 동적 변수명 생성
  const dynamicVariables: { [key: string]: any } = {
    name :'',
    baptismal : '',
    email : '',
    attendpurpose : '',
    attendyn : '',
    attenddate : dateString};

  const variableName = 'myVariable';
  //dynamicVariables[variableName] = 'Hello, TypeScript!';

  //console.log(dynamicVariables.myVariable); // 출력: Hello, TypeScript!
  
  let attendData : attendType = 
  {
    name :'',
    baptismal : '',
    email : '',
    attendpurpose : '',
    attendyn : '',
    attenddate : dateString
  };
  
  useEffect(() => {
    async function getdocument() {
      let attend : boolean = false
      let attendstart : boolean = false
      const c = await getDoc(doc(dbmodule, "attend", dateString));
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
          setAttendletter(getdata2.attendpurpose)
        }else{
          attendstart = false
          
        }
      }
      
      if((attend && attendstart)){
        setAttendActive(true)
        setCancelActive(false)
      }else if((!attend && attendstart) && !c.exists()){
        setAttendActive(false)
        setCancelActive(false)
      }else if(!attendstart || !d.exists()){
        setAttendActive(true)
        setCancelActive(true)
        setAttendletter('출석기간이 아닙니다.')
      }


    }
    getdocument()
  }, []);
  const { showSnackbar } = useContext(SnackbarContext)

  const onClickAttendButton = async (e: any) => {
    
    attendData.name = '이원호';
    attendData.baptismal = '라우렌시오';
    attendData.email = 'ywh1120@gmail.com';
    attendData.attendpurpose = attend_letter;
    
    attendData.attendyn = 'Y';
    setAttendActive(true)
    setCancelActive(false)
    
    setSnackbarOpen(true)
    await setDoc(doc(dbmodule, "attend", dateString),{attendData})
    showSnackbar('출석하였습니다.')
  }

  const onClickCancelButton = async (e: any) => {
    
    attendData.name = '이원호';
    attendData.baptismal = '라우렌시오';
    attendData.email = 'ywh1120@gmail.com';
    attendData.attendpurpose = attend_letter;
    
    attendData.attendyn = 'N';
    setAttendActive(false)
    setCancelActive(true)
    await setDoc(doc(dbmodule, "attend", dateString),{attendData})
    showSnackbar('불참하였습니다.')
  }
  
  return (
    <Box sx={{ width: '100%' }}>
      <form onSubmit={(event) => event.preventDefault()}>
        <Typography>
          { attend_letter }
        </Typography>
        <Stack spacing={2}>
          <Button variant="contained" color="success" onClick={onClickAttendButton} disabled={attendactive}>참석</Button>
          <Button variant="contained" color="error" onClick={onClickCancelButton} disabled={cancelactive}>불참</Button>
        </Stack>
      </form>

    </Box>
    
  );
}
