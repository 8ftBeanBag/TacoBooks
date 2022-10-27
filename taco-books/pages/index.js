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
import { v4 as uuidv4 } from 'uuid';

export default function Index() {
  useEffect(() => {
    document.title = 'Taco Books';
  });
  // Media query
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  // state
  const [display, displaySearch] = useState(false)
  const [lists, updateLists] = useState([
    {
      title: "Fiction",
      id: uuidv4(), 
      cards: [
        {id: uuidv4(), title: "Great Expectations", description: "Presents the classic story of the orphan Pip, the convict Magwitch, the beautiful Estella, and her guardian, the embittered Miss Havisham"},
        {id: uuidv4(), title: 'Wuthering Heights', description: "Wuthering Heights is one of the world's greatest tales of unrequited love, captivating readers with its intense passion and drama since its publication in 1847."},
      ]
    },
    {
      title: "Non-Fiction",
      id: uuidv4(), 
      cards: [
        {id: uuidv4(), title: 'The Art of War', description: 'Not only for military people who wage war on battlefields, this book is appropriate for business leaders who wage battles in the corporate world, martial artists, spiritual leaders, and those who rely on their street smarts.'},
      ]
    },
    {
      title: "Biographies",
      id: uuidv4(), 
      cards: [
        {id: uuidv4(), title: 'Yes Please', description: "Did you wish you were in the audience at the last two Golden Globes ceremonies, so you could bask in the hilarity of Amy's one-liners? If your answer to these questions is Yes Please! then you are in luck."},
      ]
    },
  ])
  const [foundBooks, updateFound] = useState([])

  return (
    <ThemeProvider theme={appTheme}>
      <DndProvider backend={HTML5Backend}>
        <Box sx={{minHeight: '100vh', backgroundColor: 'background.main'}}>
          { matches ?
            <MainLayout 
              lists={lists} updateLists={(lists)=>updateLists(lists)} 
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
