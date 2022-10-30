import * as React from 'react';
import { Container, TextField } from '@mui/material'; 
import Book from './book'
import { useStore } from '../stores/lists';
import { v4 as uuidv4 } from 'uuid';

export default function Search(){
    const foundBooks = useStore((state) => state.foundBooks)
    const updateFound = useStore((state) => state.updateFound)

    const handleSearch = (e) => {
        console.log(e.target.value)
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${e.target.value}`)
        .then((response)=>{
            return response.json()
        })
        .then((json)=>{
            updateFound(json.items.map(i=>({id: uuidv4(), description: i.volumeInfo.description, title: i.volumeInfo.title})))
        })
    }    
    
    return (
        <div className='parent'>
            <Container sx={{height: '100%', width: '100%', backgroundColor: 'white', alignItems: 'center', overflowY: 'auto  '}}>
                <TextField type="search" autoFocus label="Search Books" sx={{ width: '100%', mt: 2}} onChange={handleSearch}/>
                {foundBooks.map((card, idx)=>
                    <Book key={card.id} 
                          moveCard={()=>moveCard(id, card.id)}
                          index={idx} 
                          id={card.id} 
                          initDescription={card.description} 
                          initTitle={card.title}
                          noEdit={true}></Book>
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
