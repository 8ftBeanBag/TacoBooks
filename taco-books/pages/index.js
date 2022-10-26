import React, { Component } from 'react';
import Header from '../components/header.js';
import BookList from '../components/list.js';
import { ThemeProvider, Button, Box, FormControl, NativeSelect, Grid } from "@mui/material";
import { appTheme } from "../theme";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { v4 as uuidv4 } from 'uuid';
import Search from '../components/searchBooks'

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      shelf: 10,
      display: false,
    };

    // functions
    this.addList = this.addList.bind(this);
    this.deleteCurrent = this.deleteCurrent.bind(this);
    this.displaySearch = this.displaySearch.bind(this);
  }

  addList(){
    this.setState(prevState => ({
      lists: prevState.lists.concat([{id: uuidv4()}])
    }));
  }

  deleteCurrent(idx){
    this.setState(prevState => ({
      lists: prevState.lists.filter(i=>i.id!=idx)
    }));
  }

  displaySearch(){
    this.setState(prevState=>({display: !prevState.display}))
  }
  render () {
    return (
      <ThemeProvider theme={appTheme}>
        <Box sx={{minHeight: '100vh', backgroundColor: 'background.main'}}>
          <Grid container spacing={2} sx={{minHeight: '100vh'}}>
            
            <Grid item xs={12} md={2} sx={{height: {xs: '15px', md: 'auto'}}}><Header toggleSearch={this.displaySearch}/></Grid>

            {this.state.display ? <Grid item xs={12} md={2}><Search/></Grid> : null}

            <Grid item md={ this.state.display ? 8 : 10}>
              <Box sx={{height: '100%'}}>
                <Box sx={{py: '20px', overflowX: 'auto', maxWidth: '100vw', display: 'flex', flex: '1', height: '100%'}}>
                  {this.state.lists.map((list) =>
                    <BookList key={list.id}
                              deleteList={()=>this.deleteCurrent(list.id)}/>
                  )}
                  <Button sx={{mr: '20px', ml: {xs: '10px', md: 0}}} variant="contained" color="secondary2" onClick={this.addList}><ControlPointIcon/></Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <style jsx>{`
              .parent {
                height: 100vh
              }
          `}</style>
      </ThemeProvider>
    )
  }
}
