import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Main from './pages/Main/Main';
import Login from './pages/Login/Login'
import Registretion from './pages/Registretion/Registretion';
import ClientArea from './pages/ClientArea/ClientArea';

function useRoutes(isLogin) {
    if (isLogin) {
        return (
            <Routes>
                <Route path='/' element={<Main />}></Route>
                <Route path='/clientroom' element={<ClientArea />}></Route>
            </Routes>
            )
    }

    return (
        <Routes>
            <Route path='/' element={<Main />}></Route>
            <Route path='/login' element={<Login />}> </Route>
            <Route path='/registretion' element={<Registretion />}></Route>
        </Routes>
    )
}
export default useRoutes;