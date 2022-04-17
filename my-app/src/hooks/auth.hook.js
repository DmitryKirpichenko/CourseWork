import { useState, useEffect, useCallback } from "react";

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [clientId, setClientId] = useState(null);
    const [isReady, setIsReady] = useState(false);

    const login = useCallback((jwtToken, id) =>{
        setToken(jwtToken);
        setClientId(id);
        localStorage.setItem('clientData', JSON.stringify({
            clientId: id,
            token : jwtToken
        }))
    },[])

    const logout = () => {
        setToken(null);
        setClientId(null);
        localStorage.removeItem('clientData')
    }

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('clientData'))
        if(data && data.token) {
            login(data.token, data.clientId)
        }
        setIsReady(true);
    },[login])

    return {login, logout, token, clientId, isReady}
}