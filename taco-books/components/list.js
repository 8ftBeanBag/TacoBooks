import * as React from 'react';
import { Card, CardContent, Button, CardHeader, Grid, IconButton, Input, ToggleButton, Typography } from '@mui/material'; 
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { v4 as uuidv4 } from 'uuid';
import Book from "./book"

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: true,
            name: '',
            cards: [],
        };
        // List functions
        this.handleEdit = this.handleEdit.bind(this);
        this.handleName = this.handleName.bind(this);
        this.deleteMe = this.deleteMe.bind(this);
        // Card functions
        this.addCard = this.addCard.bind(this);
        this.deleteCard = this.deleteCard.bind(this);
    }

    // List functions
    handleEdit() {
        this.setState({edit: !this.state.edit});
    }
    handleName(event) {
        this.setState({name: event.target.value})
    }
    deleteMe(){
        this.props.deleteList()
    }

    // Card functions
    addCard(){
        this.setState(prevState => ({
            cards: prevState.cards.concat([{id: uuidv4()}])
        }));
    }
    deleteCard(id){
        this.setState(prevState => ({
            cards: prevState.cards.filter(i=>i.id!=id)
          }));
    }

    render(){
        let title;
        if (this.state.edit) {
            title = <Input value={this.state.name} onChange={this.handleName}></Input>
        } else {
            title = <Typography noWrap sx={{width: "155px", display: "inline-block"}}>{this.state.name}</Typography>
        }
        
        return (
            <div >
                <Card sx={{ width: 350, minHeight: '100%', overflowY: 'auto', mr: '20px'}} variant="outlined">
                    <CardHeader sx={{ backgroundColor: 'secondary1.main' }} title={
                        <Grid container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            spacing={2}>
                            <Grid item>
                                {title}
                                <ToggleButton
                                sx={{ml: 2}}
                                value="check"
                                selected={this.state.edit}
                                onChange={this.handleEdit}
                                size='small'
                                color='primary'
                                >
                                    <EditIcon />
                                </ToggleButton>
                            </Grid>
                            <Grid item>
                                <IconButton aria-label="delete" color="primary" onClick={this.deleteMe}>
                                    <DeleteIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    }/>
                    <CardContent sx={{p: 1}}>
                        <Button sx={{ width: '100%'}} variant="contained" color="primary" onClick={this.addCard}><ControlPointIcon/></Button>
                        {this.state.cards.map((card)=>
                            <Book key={card.id} deleteBook={()=>this.deleteCard(card.id)}></Book>
                        )}
                    </CardContent>
                </Card>
            </div>
        );
    }
}
