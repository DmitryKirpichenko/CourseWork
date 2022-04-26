import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Main from './pages/Main/Main';
import Login from './pages/Login/Login'
import Registretion from './pages/Registretion/Registretion';
import ClientArea from './pages/ClientArea/ClientArea';
import Order from './pages/Order/Order';
import DriverArea from './pages/DriverArea/DriverArea';
import OperatorArea from './pages/OperatorArea/OperatorArea'

function useRoutes(isLogin, isOperator, isDriver) {
    if (isLogin) {
        if(isOperator){

        }
        if(isDriver){
            return (
                <Routes>
                    <Route path='/' element={<Main />}></Route>
                    <Route path='/driverroom' element={<DriverArea />}></Route>
                </Routes>
                )
        }
        if(isOperator){
            return(
                <Routes>
                    <Route path='/' element={<Main />}></Route>
                    <Route path='/operatorroom' element={<OperatorArea />}></Route>
                </Routes>
            )
        }
        return (
            <Routes>
                <Route path='/' element={<Main />}></Route>
                <Route path='/clientroom' element={<ClientArea />}></Route>
                <Route path='/order' element={<Order />}></Route>
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