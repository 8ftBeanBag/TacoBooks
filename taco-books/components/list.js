import * as React from 'react';
import { Card, CardContent, Button, CardHeader, Grid, IconButton, TextField, ToggleButton, Typography, Box } from '@mui/material'; 
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { v4 as uuidv4 } from 'uuid';
import Book from "./book"
import { useCallback, useState } from 'react'
import update from 'immutability-helper'
import { dropTarget } from './DnD';

export default function BookList({deleteList, updateCards, cards, title}){
    const [edit, handleEdit] = useState(false)
    const [name, handleName] = useState(title)

    const moveCard = useCallback((dragIndex, hoverIndex) => {
        handleCards((prevCards) =>
            update(prevCards, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, prevCards[dragIndex]],
            ],
            }),
        )
    }, [])
    let dropRef = dropTarget(() => moveCard(0, 0))
    return (
        <Box ref={dropRef}>
            <Card sx={{ width: {md: 350, xs: '100%'}, minHeight: '100%', overflowY: 'auto', mr: {md: '20px'}, mt: {xs: 2, md: 0}}} variant="outlined">
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
                    <Button sx={{ width: '100%'}} variant="contained" color="primary" onClick={()=>updateCards(cards.concat([{id: uuidv4(), cards: []}]))}><ControlPointIcon/></Button>
                    {cards.map((card, idx)=>
                        <Book key={card.id} moveCard={moveCard} index={idx} id={card.id} initDescription={card.description} initTitle={card.title} deleteBook={()=>updateCards(cards.filter(c=>c.id != card.id))}></Book>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
}
