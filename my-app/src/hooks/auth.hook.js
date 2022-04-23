import { useState, useEffect, useCallback } from "react";

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [clientId, setClientId] = useState(null);
    const [isOperator, setIsOperator] = useState(null);
    const [isDriver, setIsDriver] = useState(null);
    const [isReady, setIsReady] = useState(false);

    const login = useCallback((jwtToken, id, operator, driver) =>{
        setToken(jwtToken);
        setClientId(id);
        setIsOperator(operator);
        setIsDriver(driver);
        localStorage.setItem('clientData', JSON.stringify({
            clientId: id,
            token : jwtToken,
            isOperator: operator,
            isDriver: driver
        }))
    },[])

    const logout = () => {
        setToken(null);
        setClientId(null);
        setIsOperator(null);
        setIsDriver(null);
        localStorage.removeItem('clientData')
    }

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('clientData'))
        if(data && data.token) {
            login(data.token, data.clientId, data.isOperator, data.isDriver)
        }
        setIsReady(true);
    },[login])

    return {login, logout, token, clientId, isReady, isDriver, isOperator}
}