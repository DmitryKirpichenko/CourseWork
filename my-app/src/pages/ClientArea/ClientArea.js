import './ClientArea.css'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import { Button } from '@mui/material'
import { ButtonGroup } from '@mui/material'
import TextField from '@mui/material/TextField';

import React, { useCallback, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import axios from 'axios';
import { AuthContext } from '../../context/AuthContext'

function createData(name, calories, fat, carbs, protein, cost, driverName, auto) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    history: [
      {
        date: cost,
        customerId: driverName,
        amount: auto,
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

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
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.calories}</TableCell>
        <TableCell align="right">{row.fat}</TableCell>
        <TableCell align="right">{row.carbs}</TableCell>
        <TableCell align="right">{row.protein}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Подробная информация
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Цена</TableCell>
                    <TableCell>Водитель</TableCell>
                    <TableCell align="right">Авто</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
  createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
  createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];




function ClientArea() {
  const { clientId, isDriver, isOperator } = useContext(AuthContext)

  const [cond, setCond] = useState(3)

  const [ data, setData ] = useState([])

  const [com, setCom] = useState('')

  const changeHandler = (event) => {
        setCom(event.target.value);
    }

  const UpdateHandler = async () => {
    try {
        await axios.post('/client/update', { clientId, com }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => console.log(res))
    } catch (err) { console.log(err) }
}

  const getOrder = useEffect(() => {
        axios.get('/order', {
        headers: {
          'Content-Type': 'application/json'
        },
        params: { clientId, cond, isDriver, isOperator }
      })
        .then((res) => setData(res.data))
        .catch((error) => console.log(error))

  }, [cond])

  let rowss = data.map((item) => createData(item.data,
                                            item.departure_street.name,
                                            item.destination_street.name, 
                                            item.condition, 
                                            item.auto = 'null' ? '-' : item.auto.number, 
                                            item.price, 
                                            item.auto = 'null' ? '-' : item.auto.driver.surname + ' ' + item.auto.driver.name, 
                                            item.auto = 'null' ? '-' : item.auto.brand ))
  return (
    <div>
      <Header />
      <div className='main-clientarea'>
        <div className='menu-clientarea'>
          <ButtonGroup
            orientation="vertical"
            aria-label="vertical outlined button group"
          >
            <Button variant="outlined" onClick={(e) => setCond(3)}>Прошлые заказы</Button>
            <Button variant="outlined" onClick={(e) => setCond(0)}>В обработке</Button>
            <Button variant="outlined" onClick={(e) => setCond(2)}>Ожидают оплаты</Button>

            <TextField onChange={changeHandler} multiline minRows={3} maxRows={3}  id="standard-basic"  label="Комментарий" variant="standard" />
            <Button variant="outlined" onClick={(e) => UpdateHandler()}>Отправить</Button>
            
          </ButtonGroup>

          
                

        </div>
        <div className='table-clientarea'>
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
        </div>
      </div>
      <Footer />
    </div>
  )
}
export default ClientArea;