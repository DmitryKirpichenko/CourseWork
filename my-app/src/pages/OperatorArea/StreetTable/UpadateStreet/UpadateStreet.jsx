import React, {useState} from 'react'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import axios from 'axios'

function UpdateStreet({streetId, name, x, y }) {
    const [form, setForm] = useState({
        streetId,
        name,
        x,
        y
    })

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
        console.log(form);
    }

    const UpdateHandler = async () => {
        try {
            await axios.post('/street/update', { ...form }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => console.log(res))
        } catch (err) { console.log(err) }
    }
    return (
        <div>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField onChange={changeHandler} id="standard-basic"  label="Название" variant="standard" name='name' />
                <TextField onChange={changeHandler} id="standard-basic"  type='number' label="X" variant="standard" name='x' />
                <TextField onChange={changeHandler} id="standard-basic" type='number' label="Y" variant="standard" name='y' />
                <Button onClick={UpdateHandler}  variant="outlined">Обновить</Button>
            </Box>
        </div>
    )
}

export default UpdateStreet