import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';
import Fade from '@mui/material/Fade';
import Grow from '@mui/material/Grow';
import Slide from '@mui/material/Slide';
import PropTypes, { any } from 'prop-types';


let globalAutobarManager = () => {
    console.warn("SnackbarProvider 未封裝，無法調用 Autobar");
};

const SnackbarContext = createContext(null);

export function SnackbarProvider({ children }) {
    const [snack, setSnack] = useState({
        open: false,
        message: '',
        severity: 'info',
        vertical: 'top',
        horizontal: 'center',
        transition: Grow,
        seconds: 2500,
    });

    const handleClose = useCallback((event, reason) => {
        if (reason === 'clickaway') return;
        setSnack((prev) => ({ ...prev, open: false }));
    }, []);

    const showAutoSnackbar = useCallback((message, severity = 'info') => {
        setSnack({
            open: true,
            message,
            severity,
            vertical: 'top',
            horizontal: 'center',
            transition: Grow,
            seconds: 2500,
        });
    }, []);

    useEffect(() => {
        globalAutobarManager = showAutoSnackbar;
    }, [showAutoSnackbar]);

    return (
        <SnackbarContext.Provider value={showAutoSnackbar}>
            {children}

            <Snackbar
                open={snack.open}
                onClose={handleClose}
                slots={{ transition: snack.transition }}
                autoHideDuration={snack.seconds}
                anchorOrigin={{ vertical: snack.vertical, horizontal: snack.horizontal }}
                key={snack.vertical + snack.horizontal}
            >
                <Alert variant="filled" severity={snack.severity} onClose={handleClose}>
                    {snack.message}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
}

export const useAutoSnackbar = () => {
    const context = useContext(SnackbarContext);
    if (!context) throw new Error("useAutobar 必須在 SnackbarProvider 內部使用");
    return context;
};

export const AutoSnackbar = (message, severity) => {
    globalAutobarManager(message, severity);
};

SnackbarProvider.propTypes = {
    children: PropTypes.any
};