import Row from './Row'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import React, {useState, useEffect} from 'react';

import axios from 'axios';

import AddStreet from './AddStreet/AddStreet'

function createData(name, x, y, id) {
    return {
      name,
      x,
      y,
      id,
    };
}

function StreetTable() {
    const [data, setData] = useState([])

    const getAutos = useEffect(() => {
        axios.get('/street', {
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then((res) => setData(res.data))
          .catch((error) => console.log(error))
    
      }, [])

      let rowss = data.map((item) => createData(item.name,
        item.x,
        item.y,
        item._id))

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell>Название</TableCell>
                        <TableCell align="right">x</TableCell>
                        <TableCell align="right">y</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rowss.map((row) => (
                        <Row key={row.name} row={row} />
                    ))}
                </TableBody>
            </Table>
            <AddStreet></AddStreet>
        </TableContainer>
    )
}

export default StreetTable;