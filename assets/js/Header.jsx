import * as React from 'react';
import { NavLink } from 'react-router';
import {
    AppBar, Toolbar, Typography, Container, Grid, Card, CardContent, CardMedia, CardActions,
    Avatar, AvatarGroup, Box, Button, Link, Chip, Stack, IconButton, Divider, Paper
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import FitbitIcon from '@mui/icons-material/Fitbit';
import Mode from './public/ToggleBgColorMode';


export default function Header() {

    return (
        <AppBar
            position="fixed"
            sx={{
                top: 20,
                left: '50%',
                transform: 'translateX(-50%)',
                width: { xs: '90%', md: '70%' },
                maxWidth: '1200px',
                bgcolor: 'rgba(252, 252, 252, 0.4)',
                backdropFilter: 'blur(8px)',
                borderRadius: '50px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                color: '#47536b'
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0.75rem' }}>
                <Box direction="row" spacing={3} sx={{ flexGrow: 1 }}>
                    <Link
                        underline="none"
                        component={NavLink}
                        to="/"
                        aria-label="homepage"
                        sx={{ color: '#e27711', mx: 0.5, display: 'inline-flex', alignItems: 'center' }}
                    >
                        <FitbitIcon sx={{ fontSize: '1.8rem' }} />
                    </Link>
                    <Typography
                        variant="h6"
                        component="span"
                        sx={{ fontWeight: 800, color: '#e27711' }}
                    >
                        記
                    </Typography>
                    <Typography component="span" sx={{ fontWeight: 800 }}>帳</Typography>
                </Box>
                <Box>
                    <Button
                        key="明細"
                        color="inherit"
                        to="/"
                        sx={{ fontSize: '1rem' }}
                        component={NavLink}
                    >
                        明細
                    </Button>
                    <Button
                        key="表單"
                        color="inherit"
                        to="/DetailTable"
                        sx={{ fontSize: '1rem' }}
                        component={NavLink}
                    >
                        表單
                    </Button>
                </Box>
                <Box>
                    <Mode />
                </Box>
                <Box>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    )
}