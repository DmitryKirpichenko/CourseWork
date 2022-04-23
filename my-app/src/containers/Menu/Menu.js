import *  as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom'


const ITEM_HEIGHT = 48;

export default function LongMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (event) => {
        setAnchorEl(null);
    };
    const { logout, isLogin, isDriver, isOperator } = React.useContext(AuthContext)

    const options = function (){
        if(isOperator){
            return[<Link to='/operatorroom'>Личный кабинет</Link>,
            <Link onClick={logout} to='/login'>Выход</Link>,]
        }
        if(isDriver){
            return [<Link to='/driverroom'>Личный кабинет</Link>,
            <Link onClick={logout} to='/login'>Выход</Link>,]
        }
        return [<Link to='/clientroom'>Личный кабинет</Link>,
        <Link to='/order'>Сделать заказ</Link>,
        <Link onClick={logout} to='/login'>Выход</Link>,]
    }


    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                {options().map((option) => (
                    <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}