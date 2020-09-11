import React from 'react';

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({});

export interface ThemeProps {
  children: React.ReactNode
}

export default function ThemeContextProvider(props: ThemeProps) {
  return (
    <ThemeProvider theme={theme} >
      {props.children}
    </ThemeProvider>
  );
}
