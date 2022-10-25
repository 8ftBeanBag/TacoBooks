import { Divider, Typography, Box } from '@mui/material';

export default function Header() {
    return ( 
        <Box className='header-bar' sx={{ backgroundColor: 'primary.main', float: 'left', width: '150px', height: '100%', p: '10px', borderRight: '1px solid white'}}>
            <Typography variant="h3" color="white">Taco Books</Typography>
            <Divider color="white"/>
            <Typography variant="h6" color="white">A <a>Trello</a>-<a>Google Books</a> hybrid</Typography>
        </Box>
    )
}