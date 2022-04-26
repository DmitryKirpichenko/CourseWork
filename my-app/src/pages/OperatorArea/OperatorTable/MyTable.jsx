import Row from './Row'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import React, { useCallback, useContext, useState, useEffect } from 'react';


function MyTable({ rowss }) {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Дата</TableCell>
                        <TableCell align="right">Улица оправления</TableCell>
                        <TableCell align="right">Улица прибытия</TableCell>
                        <TableCell align="right">Состояние</TableCell>
                        <TableCell align="right">Авто</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rowss.map((row) => (
                        <Row key={row.name} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default MyTable;