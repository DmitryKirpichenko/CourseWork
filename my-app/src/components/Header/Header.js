import './Header.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Menu from '../../containers/Menu/Menu'

function Header() {
    const { logout, isLogin } = useContext(AuthContext)
    return (
        <div className='main-header'>
            <div className='label-name'>
                FTaxi
            </div>
            <hr />
            <div className='grid-main'>
                <div className='main-href'>
                    <Link to='/'>Главная</Link>
                </div>
                <div className='record-href'>
                    <a href='#'>Онлайн-запись</a>
                </div>
                <div className='list'>
                    {isLogin
                    ? <Menu/>
                    : <Link to='/login'>Вход</Link>}
                </div>
            </div>
        </div>
    );
}

export default Header;