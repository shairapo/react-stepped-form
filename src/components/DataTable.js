// DataTable.js
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const DataTable = () => {
  // Retrieve stored data from localStorage
  const storedName = localStorage.getItem('name');
  const storedEmail = localStorage.getItem('email');
  const storedParcelInfo = localStorage.getItem('parcelInfo');
  const storedAddress = localStorage.getItem('address');

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Field</TableCell>
            <TableCell align="right">Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row">Name</TableCell>
            <TableCell align="right">{storedName}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">Email</TableCell>
            <TableCell align="right">{storedEmail}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">Parcel Info</TableCell>
            <TableCell align="right">{storedParcelInfo}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">Address</TableCell>
            <TableCell align="right">{storedAddress}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
