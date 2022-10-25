import * as React from 'react';
import { Card, CardContent, CardHeader, Grid, IconButton, Input, ToggleButton, Typography } from '@mui/material'; 
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editTitle: true,
            title: '',
            read: '',
            description: 'description',
        };
        this.setTitle = this.setTitle.bind(this);
        this.setRead = this.setRead.bind(this);
        this.setDescription = this.setDescription.bind(this);
        this.deleteMe = this.deleteMe.bind(this);
        this.setEditTitle = this.setEditTitle.bind(this);
    }

    setEditTitle(prevState){
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
            title = <Input value={this.state.title} onChange={this.setTitle}></Input>
        } else {
            title = <Typography noWrap sx={{width: "155px", display: "inline-block"}}>{this.state.title}</Typography>
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
                            <Grid item>
                                {title}
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
                            <Grid item>
                                <IconButton aria-label="delete" color="primary" onClick={this.deleteMe}>
                                    <DeleteIcon />
                                </IconButton>
                            </Grid>
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
