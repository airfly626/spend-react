import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { customIcons } from '../../pub/IconRating';
import PropTypes from 'prop-types';


export default function RecordTable({ rows, handleUpdate, handleClickOpen }) {

  const total = rows.reduce((sum, row) => {
    const amount = parseInt(row?.amount || 0, 10);

    return sum + amount;
  }, 0);


  return (
    <>
      <Grid container spacing={0} sx={{ my: '5rem' }}>
        <Grid size={{ xs: 12, sm: 12, md: 10 }} offset={{ xs: 0, sm: 0, md: 1 }}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>項目</TableCell>
                  <TableCell align="right">支出金額</TableCell>
                  <TableCell>明細備註</TableCell>
                  <TableCell align="right">心情</TableCell>
                  <TableCell align="center">操作</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  rows.map((row) => {
                    return (
                      <TableRow
                        hover
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">{row.categoryId.categoryName}</TableCell>
                        <TableCell align="right">{parseInt(row.amount)}</TableCell>
                        <TableCell>{row.description}</TableCell>
                        <TableCell align="right">{customIcons[`${row.mood}`].label}</TableCell>
                        <TableCell align="center">
                          <IconButton aria-label="edit" color="success" onClick={() => handleUpdate(row.id)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton aria-label="delete" color="error" onClick={() => handleClickOpen(row.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    )
                  })
                }
                <TableRow>
                  <TableCell>今日總支出</TableCell>
                  <TableCell align="right">{total}</TableCell>
                  <TableCell />
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 1 }}></Grid>
      </Grid >
    </>
  );
}

RecordTable.propTypes = {
  rows: PropTypes.any,
  handleUpdate: PropTypes.func,
  handleClickOpen: PropTypes.func
};