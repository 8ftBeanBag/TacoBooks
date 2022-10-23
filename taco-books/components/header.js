import { Button, Typography } from '@mui/material';
import { deepPurple } from '@mui/material/colors';

export default function Header() {
    return ( 
        <div className='header-bar'>
            <div>
                <Typography variant="h2" color="white">Taco Books</Typography>
                <Typography variant="h6" color="white">A <a>Trello</a>-<a>Google Books</a> hybrid</Typography>
            </div>

            <div theme="theme">
                <Button variant="contained" color="primary">Login</Button>
            </div>

            <style jsx>{`
                .header-bar {
                    padding: 20px;
                    background: #3772FF;
                    display: flex;
                    justify-content: space-between;
                }
                .login-button {
                    background-color: #F038FF
                }
            `}</style>
        </div>
    )
}