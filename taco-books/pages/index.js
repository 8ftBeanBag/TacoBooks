import React from 'react';
import { ThemeProvider, Box } from "@mui/material";
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
  const [foundBooks, updateFound] = useState([])
  const lists = useStore((state) => state.lists)

  // const moveCard = useCallback((dragIndex, hoverIndex) => {
  //   updateCards((prevCards)=>{
  //       update(prevCards, {
  //           $splice: [
  //               [dragIndex, 1],
  //               [hoverIndex, 0, prevCards[dragIndex]]
  //           ]
  //       })
  //   })
  // }, [])

  // const updateListCards = (listId, cards){
  //   console.log(listId, cards)
  // }

  return (
    <ThemeProvider theme={appTheme}>
      <DndProvider backend={HTML5Backend}>
        <Box sx={{minHeight: '100vh', backgroundColor: 'background.main', m: 0, overflowY: "auto"}}>
          { matches ?
            <MainLayout 
              lists={lists} updateLists={(listId, cards)=>updateListCards(listId, cards)} 
              display={display} displaySearch={(d)=>displaySearch(d)}
              foundBooks={foundBooks} updateFound={(l)=>updateFound(l)}/>
            :
            <MobileLayout 
              lists={lists} updateLists={(lists)=>updateLists(lists)}
              display={display} displaySearch={(d)=>displaySearch(d)}
              foundBooks={foundBooks} updateFound={(l)=>updateFound(l)}/>
          }
        </Box>
      </DndProvider>
    </ThemeProvider>
  )
}
