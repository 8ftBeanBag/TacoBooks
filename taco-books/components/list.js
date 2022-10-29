import * as React from 'react';
import { Card, CardContent, Button, CardHeader, Grid, IconButton, TextField, ToggleButton, Typography, Box } from '@mui/material'; 
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { v4 as uuidv4 } from 'uuid';
import Book from "./book"
import { useCallback, useState } from 'react'
import update from 'immutability-helper'
import { dropTarget, verticalDrag } from './DnD';
import { useStore } from '../stores/lists';

export default function BookList({deleteList, cards, title, id, index}){
    const [edit, handleEdit] = useState(false)
    const [name, handleName] = useState(title)
    const addCard = useStore((state) => state.addCard)
    const deleteCard = useStore((state) => state.deleteCard)
    const cardDropped = useStore((state) => state.cardDropped)
    
    // Drag data
    const moveList = useStore((state) => state.moveList)
    let dragData = verticalDrag(id, index, moveList);
    let dropData = dropTarget(cardDropped, index)

    return (
        <Box ref={dropData.ref}>
            <Card ref={dragData.ref} data-handler-id={dragData.id} style={{opacity: dragData.opacity}} sx={{ width: {md: 350, xs: '100%'}, maxHeight: '100%', overflowY: 'auto', mr: {md: '20px'}, mt: {xs: 2, md: 0}}} variant="outlined">
                <CardHeader sx={{ backgroundColor: 'secondary1.main' }} title={
                    <Grid container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}>
                        <Grid item xs={8}>
                            { edit ?
                                <TextField value={name} onChange={(e)=>handleName(e.target.value)} onKeyDown={(e)=>{
                                    if(e.key == "Enter"){
                                        handleEdit();
                                    }
                                }}
                                variant="standard" fullWidth></TextField>
                                :
                                <Typography variant="h5" noWrap sx={{ display: "inline-block"}}>{name}</Typography>
                            }
                        </Grid>
                        <Grid item xs={2}>
                            <ToggleButton
                            sx={{ml: 2}}
                            value="check"
                            selected={edit}
                            onChange={()=>handleEdit(!edit)}
                            size='small'
                            color='primary'
                            >
                                <EditIcon />
                            </ToggleButton>
                        </Grid>
                        <Grid item xs={2}>
                            <IconButton aria-label="delete" color="primary" onClick={deleteList}>
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                }/>
                <CardContent sx={{p: 1}}>
                    <Button sx={{ width: '100%'}} variant="contained" color="primary" onClick={()=>addCard(id)}><ControlPointIcon/></Button>
                    {cards.map((card, idx)=>
                        <Book key={card.id} 
                              moveCard={()=>moveCard(id, card.id)}
                              index={idx} id={card.id} 
                              initDescription={card.description} 
                              initTitle={card.title} 
                              deleteBook={()=>deleteCard(id, card.id)} 
                              listId={id}></Book>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
}
