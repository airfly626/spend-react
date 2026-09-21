import * as React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { DataGrid } from '@mui/x-data-grid';
import { customIcons } from '../../pub/IconRating';
import PropTypes from 'prop-types';


const columns = [
    { field: 'spendDateRoc', headerName: '日期', width: 100 },
    {
        field: 'category',
        headerName: '類別',
        width: 100,
        // align: 'center',
        editable: true,
        valueGetter: (value, row) => `${row.categoryId.categoryName}`
    },
    {
        field: 'amount',
        headerName: '支出金額',
        type: 'number',
        width: 150,
        editable: true,
        valueGetter: (value, row) => `${parseInt(row.amount)}`
    },
    {
        field: 'description',
        headerName: '明細備註',
        width: 180,
        editable: true,
    },
    {
        field: 'mood',
        headerName: '心情',
        sortable: false,
        width: 100,
        valueGetter: (value, row) => customIcons[`${row.mood}`].label
    },
];

export default function DetailDataTable({ loading, items }) {


    return (
        <>
            {
                loading ?
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <CircularProgress aria-label="Loading…" />
                    </Box> :
                    <Box sx={{ width: '100%', height: 400 }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <DataGrid
                                rows={items}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: {
                                            pageSize: 25
                                        }
                                    },
                                }}
                                pageSizeOptions={[10, 25, 50, 100]}
                                disableColumnFilter
                                disableColumnSelector
                                disableDensitySelector
                                showToolbar
                                localeText={{
                                    paginationRowsPerPage: '每頁筆數：'
                                }}
                            />
                        </div>
                    </Box>
            }
        </>
    );
}

DetailDataTable.propTypes = {
    items: PropTypes.any,
    loading: PropTypes.bool
};