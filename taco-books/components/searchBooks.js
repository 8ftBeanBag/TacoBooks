import * as React from 'react';
import { Container, Typography } from '@mui/material'; 

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render(){
        
        return (
            <div className='parent'>
                <Container sx={{height: '100%', width: '100%', backgroundColor: 'white'}}>
                    <Typography>Test</Typography>
                </Container>

                <style jsx>{`
                    .parent{
                        height: 100%;
                        background-color: white;
                    }
                    .slideIn {
                        animation: 1s ease-out 0s 1 slideInFromLeft;
                    }
                    @keyframes slideInFromLeft {
                        0% {
                          transform: translateX(-100%);
                        }
                        100% {
                          transform: translateX(0);
                        }
                      }
                `}</style>
            </div>
        );
    }
}
