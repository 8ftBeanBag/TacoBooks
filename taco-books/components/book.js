import * as React from 'react';
import { Card, CardContent, CardHeader, Grid, IconButton, TextField, ToggleButton, Typography } from '@mui/material'; 
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { horizontalDrag } from './DnD';
import { useState } from 'react';
import { useStore } from '../stores/lists';

export default function Book({initTitle, initDescription, deleteBook, index, id, noEdit=false, listId}){
    // State
    const [editTitle, setEditTitle] = useState(false)
    const [bookTitle, setTitle] = useState(initTitle)
    const [description, setDescription] = useState(initDescription)

    // Drag data
    const moveCard = useStore((state) => state.moveCard)
    let dragData = horizontalDrag(id, index, moveCard, listId);

    return (
        <div>
            <Card ref={dragData.ref} data-handler-id={dragData.id} style={{opacity: dragData.opacity}} sx={{ width: '100%', maxHeight: '600px', overflowY: 'auto', my: 2}} variant="outlined">
                <CardHeader sx={{ backgroundColor: "secondary2.main" }} title={
                    <Grid container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}>
                        <Grid item xs={noEdit ? 10 : 8}>
                            {
                                editTitle ? 
                                <TextField value={bookTitle} onChange={(e)=>setTitle(e.target.value)} onKeyDown={(e)=>{
                                    if(e.key == "Enter"){
                                        setEditTitle(false)
                                    }
                                }}
                                variant="standard" fullWidth></TextField>
                                : <Typography noWrap sx={{width: "100%", display: "inline-block"}}>{bookTitle}</Typography>
                            }
                        </Grid>
                        {noEdit ? null : 
                            <Grid item xs={2}>
                                <ToggleButton
                                sx={{ml: 1}}
                                value="check"
                                selected={editTitle}
                                onChange={()=>setEditTitle(!editTitle)}
                                size='small'
                                color='primary'
                                >
                                    <EditIcon />
                                </ToggleButton>
                            </Grid>
                        }
                        {noEdit ? null :
                            <Grid item xs={2}>
                                <IconButton aria-label="delete" color="primary" onClick={()=>deleteBook()}>
                                    <DeleteIcon />
                                </IconButton>
                            </Grid>
                        }
                    </Grid>
                }/>
                <CardContent sx={{overflowY: 'auto', maxHeight: '300px'}}>
                    {editTitle ? 
                        <TextField multiline value={description} fullWidth onChange={(e)=>setDescription(e.target.value)} onKeyDown={(e)=>{
                            if(e.key == "Enter"){
                                setEditTitle(false)
                            }
                        }}></TextField>
                        : description
                    }
                </CardContent>
            </Card>
        </div>
    );
}
