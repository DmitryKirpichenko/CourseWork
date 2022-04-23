import './Login.css'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios"
import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function Login() {

    const [form, setForm] = useState({
        login: '',
        password: ''
    })

    const {login} = useContext(AuthContext)

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
        console.log(form);
    }

    const loginHandler = async () => {
        try {
            await axios.post('/client/login', { ...form }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                login(res.data.token, res.data.clientId, res.data.operator, res.data.driver)
                console.log(res.data)
            })
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
                        <TextField onChange={changeHandler} id="standard-basic" label="Введите логин" variant="standard" name='login' />
                        <TextField onChange={changeHandler} id="standard-basic" label="Введите пароль" variant="standard" name='password' />
                        <Button  onClick={loginHandler}  variant="outlined">Войти</Button>
                        <Link to='/registretion'>Нет аккаунта</Link>
                    </Box>
                </div>

            </div>
            <Footer />
        </div>

    )
}
export default Login;