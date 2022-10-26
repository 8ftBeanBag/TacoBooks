import * as React from 'react';
import { Divider, Typography, Box, Button, FormControl, NativeSelect, FormLabel } from '@mui/material';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shelf: false
        };
        this.handleShelf = this.handleShelf.bind(this);
        this.handleShowSearch = this.handleShowSearch.bind(this);
    }

    handleShelf(selectedShelf){
      this.setState(() => ({
        shelf: selectedShelf
      }));
    }

    handleShowSearch(){
        this.props.toggleSearch()
    }

    render(){
        return ( 
            <Box className='header-bar' sx={{ backgroundColor: 'primary.main', minHeight: {xs: 'auto', md:"100%"}, p: '10px', borderRight: '1px solid white'}}>
                <Typography sx={{fontSize: {xs: 40, md: 45, lg: 60}}} color="white">Taco Books 🌮</Typography>
                <Divider color="white"/>
                <Typography variant="h6" color="white">A <a>Trello</a>-<a>Google Books</a> hybrid</Typography>

                <FormControl sx={{my: {md: '30px'}, color: 'white'}}>
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

                <Button sx={{color: 'secondary1.main', mt: 2, float: {xs: 'right', md: 'none'}, display: 'block'}} onClick={this.handleShowSearch}>Search Books</Button>
            </Box>
        )
    }
}