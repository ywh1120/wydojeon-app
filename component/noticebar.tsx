// components/CustomSnackbar.tsx

'use client'
import { useContext } from 'react';
import Snackbar from '@mui/material/Snackbar';
import { SnackbarContext } from '@/context/snackbarcontext';

export const CustomSnackbar = () => {
  const { open, message, hideSnackbar } = useContext(SnackbarContext);

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={hideSnackbar}
      message={message}
    />
  );
};