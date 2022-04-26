import React, { useCallback, useContext, useState, useEffect } from 'react';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button'

import axios from 'axios';



function SelectAuto({con, id, type}) {

    console.log(con, id, type)

    function operatorUpdate(e, id, auto) {
        axios.post('/order/update/operator', { orderId: id, number: auto }, {
          headers: {
            'Content-Type': 'application/json'
          }
      
        })
          .then((res) => console.log(res))
          .catch((error) => console.log(error))
      }

    const [autos, setAutos] = useState([])
    const [auto, setAuto] = React.useState('');

    const AutoHandleChange = (event) => {
        setAuto(event.target.value);
    };

    useEffect(async () => {
        let res = await axios.get('/autos', {
            headers: {
                'Content-Type': 'application/json'
            },
            params: { type }
        })
        setAutos(res.data)
    }, [])

    if (con == 0) {

        return (
            <div>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">Машина</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={auto}
                        onChange={AutoHandleChange}
                        label="Age"
                    >
                        {autos.map((item, ind) =>
                            <MenuItem key={ind} value={item.number}>{item.number}</MenuItem>)}
                    </Select>
                </FormControl>
                <Button variant="outlined" onClick={(e) => operatorUpdate(e, id, auto)} >Назначить </Button>
            </div>
        )

    }
    else{
        return(
            <div></div>
        )
    }
}

export default SelectAuto;