import * as React from 'react';
import { Card, CardContent, CardHeader, Grid, IconButton, TextField, ToggleButton, Typography } from '@mui/material'; 
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editTitle: true,
            title: this.props.title,
            description: this.props.description,
        };
        this.setTitle = this.setTitle.bind(this);
        this.setRead = this.setRead.bind(this);
        this.setDescription = this.setDescription.bind(this);
        this.deleteMe = this.deleteMe.bind(this);
        this.setEditTitle = this.setEditTitle.bind(this);
    }

    setEditTitle(){
        this.setState(prevState => ({editTitle: !prevState.editTitle}))
    }
    setTitle(event) {
        this.setState({title: event.target.value});
    }
    setRead() {
        this.setState(prevState=>({read: !prevState.read}))
    }
    setDescription(newDescription){
        this.setState({description: newDescription});
    }
    deleteMe(){
        this.props.deleteBook()
    }

    render(){
        let title;
        if (this.state.editTitle) {
            title = <TextField value={this.state.title} onChange={this.setTitle} onKeyDown={(e)=>{
                if(e.key == "Enter"){
                    this.setEditTitle()
                }
            }}
            variant="standard" fullWidth></TextField>
        } else {
            title = <Typography noWrap sx={{width: "100%", display: "inline-block"}}>{this.state.title}</Typography>
        }
        
        return (
            <div>
                <Card sx={{ width: '100%', maxHeight: '600px', overflowY: 'auto', my: 2}} variant="outlined">
                    <CardHeader sx={{ backgroundColor: "secondary2.main" }} title={
                        <Grid container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            spacing={2}>
                            <Grid item xs={this.props.noDelete ? 10 : 8}>
                                {title}
                            </Grid>
                            <Grid item xs={2}>
                                <ToggleButton
                                sx={{ml: 1}}
                                value="check"
                                selected={this.state.editTitle}
                                onChange={this.setEditTitle}
                                size='small'
                                color='primary'
                                >
                                    <EditIcon />
                                </ToggleButton>
                            </Grid>
                            {this.props.noDelete ? null :
                                <Grid item xs={2}>
                                    <IconButton aria-label="delete" color="primary" onClick={this.deleteMe}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Grid>
                            }
                        </Grid>
                    }/>
                    <CardContent sx={{overflowY: 'scroll'}}>
                        {this.state.description}
                    </CardContent>
                </Card>
            </div>
        );
    }
}
