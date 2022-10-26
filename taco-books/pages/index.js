import React from 'react';
import { ThemeProvider, Box } from "@mui/material";
import { appTheme } from "../theme";
import MainLayout from '../components/mainLayout'
import MobileLayout from '../components/mobileLayout'
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Index() {
  // Media query
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  // state
  const [display, displaySearch] = useState(false)
  const [lists, updateLists] = useState([])

  return (
    <ThemeProvider theme={appTheme}>
      <Box sx={{minHeight: '100vh', backgroundColor: 'background.main'}}>
        { matches ?
          <MainLayout lists={lists} updateLists={(lists)=>updateLists(lists)} display={display} displaySearch={(d)=>displaySearch(d)}/>
          : <MobileLayout lists={lists} updateLists={(lists)=>updateLists(lists)} display={display} displaySearch={(d)=>displaySearch(d)}/>
        }
      </Box>
    </ThemeProvider>
  )
}
