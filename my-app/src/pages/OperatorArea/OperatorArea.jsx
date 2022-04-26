import './OperatorArea.css'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import { Button } from '@mui/material'
import { ButtonGroup } from '@mui/material'

import React, { useCallback, useContext, useState, useEffect } from 'react';

import axios from 'axios';
import { AuthContext } from '../../context/AuthContext'

import MyTable from './OperatorTable/MyTable'

import StreetTable from './StreetTable/StreetTable'



function createData(name, calories, fat, carbs, protein, cost, driverName, auto, id, type_auto) {
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
    id,
    type_auto,
  };
}










function OperatorArea() {
  const { clientId, isDriver, isOperator } = useContext(AuthContext)

  const [cond, setCond] = useState(3)

  const [table, setTable] = useState(1)

  const [data, setData] = useState([])

  const [autos, setAutos] = useState([])

  const getAutos = useEffect(() => {
    axios.get('/autos', {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => setAutos(res.data))
      .catch((error) => console.log(error))

  }, [])

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
    item.client.surname + ' ' + item.client.name,
    item.client.phone,
    item._id,
    item.type_auto.name))
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
            <Button variant="outlined" onClick={(e) => setCond(0)}>Ожидают</Button>
            <Button variant="outlined" onClick={(e) => setCond(1)}>Выполняются</Button>
            <Button variant="outlined" onClick={(e) => setCond(2)}>Ожидают оплату</Button>
            <Button variant="outlined" onClick={(e) => setTable(2)}>Улицы</Button>

          </ButtonGroup>

        </div>
        <div className='table-clientarea'>
        <MyTable rowss={rowss}></MyTable>
        </div>
      </div>
      <Footer />
    </div>
  )
}
export default OperatorArea;