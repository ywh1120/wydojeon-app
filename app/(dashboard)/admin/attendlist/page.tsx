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
import { DataGrid, GridColDef } from '@mui/x-data-grid';


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

function GetMemberData(){

}

const columns: GridColDef<(typeof rows)[number]>[] = [
  { field: 'id', headerName: 'ID', width: 50 },
  {
    field: 'name',
    headerName: '이름',
    width: 150,
    editable: true,
  },
  {
    field: 'baptismal',
    headerName: '세례명',
    width: 150,
    editable: true,
  },
  {
    field: 'telno',
    headerName: '전화번호',
    width: 200,
    editable: true,
  },
  {
    field: 'makedate',
    headerName: '참여날짜',    
    width: 160,
    editable: true,
  },
];

const rows = [
  { id: 1, name: '이원호', baptismal: '라우렌시오', telno: '010-1234-1234', makedate:'2024-02-04' },
  { id: 2, name: '강승구', baptismal: '루카', telno: '010-1234-1234', makedate:'2024-02-04' },
  { id: 3, name: '김미래', baptismal: '가브리엘라', telno: '010-1234-1234', makedate:'2024-02-04' },
  { id: 4, name: '이원호', baptismal: '라우렌시오', telno: '010-1234-1234', makedate:'2024-02-04' },
  { id: 5, name: 'Targaryen', baptismal: 'Daenerys', telno: '010-1234-1234', makedate:'2024-02-04' },
  { id: 6, name: 'Melisandre', baptismal: null, telno: '010-1234-1234', makedate:'2024-02-04' },
  { id: 7, name: 'Clifford', baptismal: 'Ferrara', telno: '010-1234-1234', makedate:'2024-02-04' },
  { id: 8, name: 'Frances', baptismal: 'Rossini', telno: '010-1234-1234', makedate:'2024-02-04' },
  { id: 9, name: 'Roxie', baptismal: 'Harvey', telno: '010-1234-1234', makedate:'2024-02-04' },
];


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
      }else{
        setAttendstart(false)
        setAttendend(true)
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
          <Tab label="봉사자 명단" {...a11yProps(0)} />
          <Tab label="봉사자 출석시작/종료" {...a11yProps(1)} />
          <Tab label="봉사자 출석확인" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <form onSubmit={(event) => event.preventDefault()}>
          <Stack spacing={2}>
            <TextField id="outlined-basic" label="출석목적" onChange={textChange} variant="outlined" />
            <Button variant="contained" color="success" onClick={onClickUpLoadButton} value="1" disabled={attendstart}>출석시작</Button>
            <Button variant="contained" color="error" onClick={onClickUpLoadButton} value="2" disabled={attendend}>출석종료</Button>
          </Stack>
        </form>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        
      </CustomTabPanel>
    </Box>
  );
}