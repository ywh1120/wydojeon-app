'use client'
import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { doc, setDoc, getDoc } from "@firebase/firestore";
import dbmodule from "@/dbinfo/firebasedb";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

type attendType = {
  attendpurpose : string,
  attendstartyn : string,
  attenddate : string
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  let [attendstart, setAttendstart] = useState(false);
  let [attendend, setAttendend] = useState(false);
  let [textval, setText] = useState('');
  const [value, setValue] = useState(0);
  let today : Date = new Date();

  let year : number = today.getFullYear();
  let month : string = ('0' + (today.getMonth() + 1)).slice(-2);
  let day : string = ('0' + today.getDate()).slice(-2);

  let dateString = year + '-' + month  + '-' + day;
  let attendStartData : attendType = 
  {
    attendpurpose : '',
    attendstartyn : '',
    attenddate : dateString
  };
  useEffect(() => {
    async function getdocument() {
      const d = await getDoc(doc(dbmodule, "attendstart", dateString));
      if(d.exists()){
        const getdata = d.data()?.['attendStartData']; 
        if(getdata.attendstartyn === 'Y'){
          setAttendstart(true)
          setAttendend(false)
          setText(getdata.attendpurpose)
        }else{
          setAttendstart(false)
          setAttendend(true)
        }
      }
    }
    getdocument()
  })
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const onClickUpLoadButton = async (e: any) => {
    
    attendStartData.attendpurpose = textval;
    if(e.target.value === "1"){
      attendStartData.attendstartyn = 'Y';
      setAttendstart(true)
      setAttendend(false)
    }else{
      attendStartData.attendstartyn = 'N';
      setAttendstart(false)
      setAttendend(true)
    }
    await setDoc(doc(dbmodule, "attendstart", attendStartData.attenddate),{attendStartData})
  }

  const textChange = (event : any) => {
    setText(event.target.value)
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="봉사자 출석시작/종료" {...a11yProps(0)} />
          <Tab label="봉사자 출석확인(성함별)" {...a11yProps(1)} />
          <Tab label="봉사자 출석확인(날짜별)" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <form onSubmit={(event) => event.preventDefault()}>
          <Stack spacing={2}>
            <TextField id="outlined-basic" label="출석목적" onChange={textChange} variant="outlined" />
            <Button variant="contained" color="success" onClick={onClickUpLoadButton} value="1" disabled={attendstart}>출석시작</Button>
            <Button variant="contained" color="error" onClick={onClickUpLoadButton} value="2" disabled={attendend}>출석종료</Button>
          </Stack>
        </form>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
    </Box>
  );
}