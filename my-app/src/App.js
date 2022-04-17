import './App.css';
import useRoutes from './Routes';
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/auth.hook';



function App() {

  const { login, logout, token, clientId, isReady } = useAuth();

  const isLogin = !!token;
  const routes = useRoutes(isLogin);

  return (
    <AuthContext.Provider value={{login, logout, token, clientId, isReady, isLogin}}>
      <div>
        {routes}
      </div>
    </AuthContext.Provider>
  );
}

export default App;
