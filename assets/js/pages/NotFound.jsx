import * as React from 'react';
import Box from '@mui/material/Box';

export default function NotFound() {

    return (
        <Box component="section" sx={{ p: 2, border: '1px dashed grey', textAlign: 'center' }}>
            <h1>404 - 找不到網頁</h1>
            <p>抱歉，您輸入的網址並不存在。</p>
        </Box>
    );
}