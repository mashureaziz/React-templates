import React from 'react';
import { useState } from 'react';

const AuthContext = React.createContext({
    token : '',
    isLoggedIn : false,
    login :(token) => {},
    logout :() => {}
});

const AuthContextProvider = (props) => {
    function retrieveToken() {
        if(localStorage.getItem('authToken')) {
            return localStorage.getItem('authToken');
        }
        return null;
    }
    
    const [token, setToken] = useState(retrieveToken);
    const isLoggedIn = !!token;

    const loginHandler = (token) => {
        localStorage.setItem('authToken',token);
        setToken(token);
    }
    const logoutHandler = ()=> {
        localStorage.removeItem('authToken');
        setToken(null);
    }

    const contextValue = {
        token,
        isLoggedIn,
        login : loginHandler,
        logout : logoutHandler
    }

    return(
    <AuthContext.Provider value = {contextValue}>
        {props.children}
    </AuthContext.Provider>
    )
}

export default AuthContext;
export {AuthContextProvider};
