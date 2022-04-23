import './App.css';
import useRoutes from './Routes';
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/auth.hook';



function App() {

  const { login, logout, token, clientId, isReady, isOperator, isDriver } = useAuth();

  const isLogin = !!token;
  const routes = useRoutes(isLogin, isOperator, isDriver);

  return (
    <AuthContext.Provider value={{login, logout, token, clientId, isReady, isLogin, isOperator, isDriver}}>
      <div>
        {routes}
      </div>
    </AuthContext.Provider>
  );
}

export default App;
