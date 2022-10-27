import * as React from 'react';
import { Container, Box, TextField } from '@mui/material'; 
import Book from './book'
import { BookOnline } from '@mui/icons-material';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            foundBooks: []
        };
        this.handleSearch = this.handleSearch.bind(this)
    }

    handleSearch(e){
        console.log(e.target.value)
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${e.target.value}`)
        .then((response)=>{
            return response.json()
        })
        .then((json)=>{
            this.props.updateFound(json.items)
            console.log(json.items)
        })
    }

    render(){    
        return (
            <div className='parent'>
                <Container sx={{height: '100%', width: '100%', backgroundColor: 'white', alignItems: 'center', overflowY: 'auto  '}}>
                    <TextField type="search" autoFocus label="Search Books" sx={{ width: '100%', mt: 2}} onChange={this.handleSearch}/>
                    {this.props.foundBooks.map((book)=>
                        <Book 
                            key={book.id} 
                            noEdit 
                            initTitle={book.volumeInfo.title}
                            initDescription={book.volumeInfo.description}></Book>
                    )}
                </Container>
                <style jsx>{`
                    .parent{
                        height: 100vh;
                        background-color: white;
                    }
                `}</style>
            </div>
        );
    }
}
