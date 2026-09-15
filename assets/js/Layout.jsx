import * as React from 'react';
import { Outlet, NavLink } from 'react-router';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Header from "./Header";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { SnackbarProvider } from './context/SnackbarProvider';

const theme = createTheme();

export default function Layout() {

    return (
        <>
            <ThemeProvider theme={theme}>
                <SnackbarProvider>
                    <Box sx={{ pt: 18.5 }}>
                        <Header />
                    </Box>
                    <Box className='content'>
                        <Container sx={{ width: { xs: '90%', md: '70%' } }}>
                            <Outlet />
                        </Container>
                    </Box>
                </SnackbarProvider>
            </ThemeProvider>
        </>
    )
}