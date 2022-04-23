import React, { useCallback, useContext, useState, useEffect } from 'react';
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import './Order.css'

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

import axios from 'axios';
import { AuthContext } from '../../context/AuthContext'

function Order() {
    const [fromWhere, setFromWhere] = React.useState('');
    const [where, setWhere] = React.useState('');
    const [type, setType] = React.useState('');
    console.log(fromWhere)
    console.log(where)
    console.log(type)

    const FromWhereHandleChange = (event) => {
        setFromWhere(event.target.value);
    };
    const WhereHandleChange = (event) => {
        setWhere(event.target.value);
    };
    const TypeHandleChange = (event) => {
        setType(event.target.value);
    };


    const { clientId } = useContext(AuthContext)

    const [type_auto, setType_auto] = useState([])
    const [street, setStreet] = useState([])

    const getStreet = useEffect(() => {
        axios.get('/street', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => setStreet(res.data))
            .catch((error) => console.log(error))

    }, [])

    const getType_auto = useEffect(() => {
        axios.get('/type_auto', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => setType_auto(res.data))
            .catch((error) => console.log(error))

    }, [])

    const AddOrderHandler = async () => {
        try {
            const sendStreet1 = street.filter((item) => item.name === fromWhere)[0]
            const sendStreet2 = street.filter((item) => item.name === where)[0]
            const sendTypeAuto = type_auto.filter((item) => item.name === type)[0]
            await axios.post('/order/add', { clientId,  sendStreet1, sendStreet2, sendTypeAuto }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => console.log(res))
        } catch (err) { console.log(err) }
    }

    return (
        <div>
            <Header />
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">От куда</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={fromWhere}
                    onChange={FromWhereHandleChange}
                    label="Age"
                >
                    {street.filter((item) => item.name !== where)
                    .map((item, ind) => 
                    <MenuItem key={ind} value = {item.name}>{item.name}</MenuItem>)}
                </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">Куда</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={where}
                    onChange={WhereHandleChange}
                    label="Age"
                >
                    {street.filter((item) => item.name !== fromWhere)
                    .map((item, ind) =>
                    <MenuItem key={ind} value = {item.name}>{item.name}</MenuItem>)}
                </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">Тип авто</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={type}
                    onChange={TypeHandleChange}
                    label="Age"
                >
                    {type_auto.map((item, ind) => 
                    <MenuItem key={ind} value = {item.name}>{item.name}</MenuItem>)}
                </Select>
            </FormControl>
            <Button onClick={AddOrderHandler} variant="outlined">Заказать</Button>
            <Footer />
        </div>
    )
}

export default Order;