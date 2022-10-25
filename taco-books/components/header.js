import { Divider, Typography, Box, Button } from '@mui/material';

export default function Header() {
    return ( 
        <Box className='header-bar' sx={{ backgroundColor: 'primary.main', float: {xs: 'none', md: 'left'}, width: {xs: '100%', md: '200px'}, height:{xs: '165px', md: '100%'}, p: '10px', borderRight: '1px solid white'}}>
            <Typography variant="h3" color="white">Taco Books</Typography>
            <Divider color="white"/>
            <Typography variant="h6" color="white">A <a>Trello</a>-<a>Google Books</a> hybrid</Typography>
            <Button sx={{color: 'secondary1.main', backgroundColor: 'white', mt: 2, }}>Search Books</Button>
        </Box>
    )
}