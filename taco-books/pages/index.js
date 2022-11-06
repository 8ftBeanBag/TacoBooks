import React from 'react';
import { ThemeProvider, Box, Alert, Skeleton, Typography } from "@mui/material";
import { appTheme } from "../theme";
import MainLayout from '../components/mainLayout'
import MobileLayout from '../components/mobileLayout'
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import {useStore} from "../stores/lists"

export default function Index() {
  useEffect(() => {
    document.title = 'Taco Books';
  });
  // Media query
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  // state
  const [display, displaySearch] = useState(false)
  const foundBooks = useStore((state) => state.foundBooks)
  const updateFound = useStore((state) => state.updateFound)
  const lists = useStore((state) => state.lists)

  return (
    <ThemeProvider theme={appTheme}>
      <DndProvider backend={HTML5Backend}>
        <Box sx={{zIndex: "-1", backgroundImage: "linear-gradient(to left, #00000033 50%, #00000033 50%), url(books.jpg)", filter: "blur(2px)", position: "fixed", height: "100vh", width: "100vw", backgroundPosition: 'center', backgroundSize: 'cover'}}></Box>
        <Box sx={{minHeight: '100vh', m: 0, overflowY: "auto"}}>
          { matches ?
            <MainLayout 
              lists={lists} updateLists={(listId, cards)=>updateListCards(listId, cards)} 
              display={display} displaySearch={(d)=>displaySearch(d)}
              foundBooks={foundBooks} updateFound={(l)=>updateFound(l)}/>
            :
            <div>
              <Alert severity="error" variant='filled' >I don't work on mobile yet. I will soon though so come back later!</Alert>
              <Box
                sx={{
                  p: 8,
                  width: '100%',
                  height: '100%',
                }}
              > 
                {/* For other variants, adjust the size with `width` and `height` */}
                <Skeleton variant="rounded" width="100%" height={60} sx={{ mt: 2, bgcolor: 'gray'}} />
                <Skeleton variant="rounded" width="100%" height={250} sx={{ mt: 2, bgcolor: 'gray'}} />
                <Skeleton variant="rounded" width="100%" height={60} sx={{ mt: 2, bgcolor: 'gray'}} />
              </Box>
            </div>
            // <MobileLayout 
            //   lists={lists} updateLists={(lists)=>updateLists(lists)}
            //   display={display} displaySearch={(d)=>displaySearch(d)}
            //   foundBooks={foundBooks} updateFound={(l)=>updateFound(l)}/>
          }
        </Box>
      </DndProvider>
    </ThemeProvider>
  )
}
