import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Layout } from './components/Layout';
import theme from './config/materialUiTheme';
import { BrowserRouter } from "react-router-dom";

export default function Dashboard() {

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </ThemeProvider>
  );
}