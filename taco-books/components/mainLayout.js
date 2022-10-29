import React, { useCallback } from 'react';
import { Button, Box, Grid } from "@mui/material";
import Search from '../components/searchBooks'
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import Header from '../components/header.js';
import BookList from '../components/list.js';
import { v4 as uuidv4 } from 'uuid';
import { useStore } from '../stores/lists';

export default function MainLayout({lists, display, updateLists, displaySearch, foundBooks, updateFound}) {
    const addList = useStore((state) => state.addList)
    const deleteList = useStore((state) => state.deleteList)

    return (
        <Grid container spacing={2} sx={{height: '100vh'}}>
          
            <Grid item xs={2}><Header toggleSearch={()=>displaySearch(!display)}/></Grid>

            {display ? <Grid item md={4} lg={3}><Search foundBooks={foundBooks} updateFound={updateFound}/> </Grid> : null}

            <Grid item md={ display ? 6 : 10} lg={ display ? 7 : 10 }>
                <Box sx={{height: '100%'}}>
                    <Box sx={{py: '20px', overflowX: 'auto', display: 'flex', height: '100%'}}>
                        {lists.map((list, idx) =>
                        <BookList key={list.id}
                                  deleteList={()=>deleteList(list.id)}
                                  title={list.title}
                                  cards={list.cards}
                                  id={list.id}
                                  index={idx}/>
                        )}
                        <Button sx={{mr: '20px', ml: {xs: '10px', md: 0}}} variant="contained" color="secondary2" onClick={() => addList()}><ControlPointIcon/></Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}