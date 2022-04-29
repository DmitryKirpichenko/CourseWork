import React, {useState} from 'react'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import axios from 'axios'

function UpdateStreet() {
    const [form, setForm] = useState({
        name: '',
        x: '',
        y: ''
    })

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
        console.log(form);
    }

    const UpdateHandler = async () => {
        if(form.name !== '' && form.x !== '' && form.y !== '')
        try {
            await axios.post('/street/add', { ...form }, {
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
                <Button onClick={UpdateHandler}  variant="outlined">Добавить</Button>
            </Box>
        </div>
    )
}

export default UpdateStreet