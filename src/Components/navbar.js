import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navbar = () => {

    return (
        <AppBar >
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }} >
                  <img src='/logoissat.png' alt='logo' style={{ width: '70px', height: '50px' , marginTop:'10px' }}></img>
                </Typography>
                <Button color="inherit">Présentation</Button>
                <Button color="inherit">Formation</Button>
                <Button color="inherit">Entreprises</Button>
                <Button color="inherit">Recherche</Button>
                <Button color="inherit">ISSATSO+</Button>
                <Button color="inherit">Contactez-nous</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
