import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import { Button } from '@mui/material'

import React, {useState, useEffect} from 'react';
import axios from 'axios';

import UpdateStreet from './UpadateStreet/UpadateStreet'


function Row(props) {
    const { row } = props;
    const [open, setOpen] = useState(false);

    function deleteHandel(e, id){
      axios.post('/street/delete', {streetId: id }, {
        headers: {
          'Content-Type': 'application/json'
        }
      
      })
        .then((res) => console.log(res))
        .catch((error) => console.log(error))
    }
  
    return (
      <React.Fragment>
         <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell align="right">{row.name}</TableCell>
          <TableCell align="right">{row.x}</TableCell>
          <TableCell align="right">{row.y}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Настройка
                </Typography>
                <Table size="small" aria-label="purchases">
                <Button variant="outlined" onClick={(e) => deleteHandel(e, row.id)}>Удалить</Button>
                <UpdateStreet streetId={row.id} name={row.name} x={row.x} y={row.y}></UpdateStreet>
                </Table>
  
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  
  

  export default Row;