import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Button, Box, Grid } from "@mui/material";
import Search from '../components/searchBooks'
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import Header from '../components/header.js';
import BookList from '../components/list.js';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function MobileLayout({lists, display, updateLists, displaySearch, foundBooks, updateFound}) {
    return (
        <Box container spacing={2} sx={{minHeight: '100vh', p: 2}}>
          
            <Header toggleSearch={()=>displaySearch(!display)}/>

            {display ? <Search foundBooks={foundBooks} updateFound={updateFound}/> : null}

            <Button sx={{ width: '100%', mt: 2}} variant="contained" color="secondary2" onClick={()=>updateLists(lists.concat([{id: uuidv4()}]))}><ControlPointIcon/></Button>
            {lists.map((list) =>
            <BookList key={list.id}
                      deleteList={()=>updateLists(lists.filter(i=>i.id!=list.id))}/>
            )}
        </Box>
    )
}