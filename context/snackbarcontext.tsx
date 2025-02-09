'use client'
import React, { createContext, useState, ReactNode } from 'react';

type SnackbarContextType = {
  showSnackbar: (message: string) => void;
  hideSnackbar: () => void;
  open: boolean;
  message: string;
};

export const SnackbarContext = createContext<SnackbarContextType>({
  showSnackbar: () => {},
  hideSnackbar: () => {},
  open: false,
  message: '',
});

type SnackbarProviderProps = {
  children: ReactNode;
};

export const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const showSnackbar = (message: string) => {
    setMessage(message);
    setOpen(true);
  };

  const hideSnackbar = () => {
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar, hideSnackbar, open, message }}>
      {children}
    </SnackbarContext.Provider>
  );
};