import React, { Component } from 'react';
import Header from '../components/header.js';
import BookList from '../components/list.js';
import { ThemeProvider, Button, Box, FormControl, InputLabel, NativeSelect } from "@mui/material";
import { appTheme } from "../theme";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { v4 as uuidv4 } from 'uuid';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      shelf: 10,
    };

    // functions
    this.addList = this.addList.bind(this);
    this.deleteCurrent = this.deleteCurrent.bind(this);
    this.handleShelf = this.handleShelf.bind(this);
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

  handleShelf(selectedShelf){
    this.setState(() => ({
      shelf: selectedShelf
    }));
  }

  render () {
    return (
      <ThemeProvider theme={appTheme}>
        <Box sx={{height: '100vh', backgroundColor: 'background.main'}}>
          <Header/>
          <FormControl sx={{ml: '20px', mt: '20px', width: '200px', color: 'white'}}>
            <NativeSelect
              sx={{ backgroundColor: 'white', p: 1}}
              defaultValue={10}
              label='shelf'
              inputProps={{
                name: 'shelf',
                id: 'uncontrolled-native',
              }}
            >
              <option value={10}>Ten</option>
              <option value={20}>Twenty</option>
              <option value={30}>Thirty</option>
            </NativeSelect>
          </FormControl>
          
          <div className="horizontal-scroll">
            {this.state.lists.map((list) =>
              <BookList key={list.id}
                        deleteList={()=>this.deleteCurrent(list.id)}/>
            )}
            <Button sx={{ml: '20px'}} variant="contained" color="secondary2" onClick={this.addList}><ControlPointIcon/></Button>
          </div>
        </Box>

        <style jsx>{`
              .parent {
                height: 100vh
              }
              .horizontal-scroll {
                padding-top: 20px;
                overflow-x: auto;
                display: flex;
                max-width: 100vw;
                height: 88%;
              }
          `}</style>
      </ThemeProvider>
    )
  }
}
