import React from 'react';
import { Button, Box, Grid } from "@mui/material";
import Search from '../components/searchBooks'
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import Header from '../components/header.js';
import BookList from '../components/list.js';
import { v4 as uuidv4 } from 'uuid';
import { useStore } from '../stores/lists';

export default function MobileLayout({lists, display, updateLists, displaySearch, foundBooks, updateFound}) {
    const addList = useStore((state) => state.addList)
    const deleteList = useStore((state) => state.deleteList)

    return (
        <Box sx={{minHeight: '100vh', p: 2}}>
          
            <Header toggleSearch={()=>displaySearch(!display)}/>

            {display ? <Search foundBooks={foundBooks} updateFound={updateFound}/> : null}

            <Button sx={{ width: '100%', mt: 2}} variant="contained" color="secondary2" onClick={()=>addList()}><ControlPointIcon/></Button>
            {lists.map((list, idx) =>
            <BookList 
                key={list.id}
                deleteList={()=>deleteList(list.id)}
                title={list.title}
                cards={list.cards}
                id={list.id}
                index={idx}/>
            )}
        </Box>
    )
}