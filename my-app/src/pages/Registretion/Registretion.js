import './Registretion.css'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from "axios"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';



function Registretion() {
    const [form, setForm] = useState({
        name: '',
        surname: '',
        lastname: '',
        phone: '',
        login: '',
        password: ''
    })

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
        console.log(form);
    }

    const registerHandler = async () => {
        try {
            await axios.post('/client/registretion', { ...form }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => console.log(res))
        } catch (err) { console.log(err) }
    }

    return (
        <div>
            <Header />



            <div className='main-registretion'>
                <div className='img-registretion'>
                    <img />
                </div>
                <div className='form-registreiteon'>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField onChange={changeHandler} id="standard-basic" label="Введите имя" variant="standard" name='name' />
                        <TextField onChange={changeHandler} id="standard-basic" label="Введите фамилию" variant="standard" name='surname' />
                        <TextField onChange={changeHandler} id="standard-basic" label="Введите отчество" variant="standard" name='lastname' />
                        <TextField onChange={changeHandler} id="standard-basic" label="Введите телефон" variant="standard" name='phone' />
                        <TextField onChange={changeHandler} id="standard-basic" label="Введите логин" variant="standard" name='login' />
                        <TextField onChange={changeHandler} id="standard-basic" label="Введите пароль" variant="standard" name='password' />
                        <TextField onChange={changeHandler} id="standard-basic" label="Повторите пароль" variant="standard" name='password2' />
                        <Button onClick={registerHandler} variant="outlined">Зарегистрироваться</Button>
                        <Link to='/login'>Уже есть аккаунт</Link>
                    </Box>
                </div>

            </div>
            <Footer />
        </div>

    )
}
export default Registretion;