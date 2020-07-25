import React, {createContext, useReducer } from 'react';
import { AuthReducer } from '../reducers/AuthReducer';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const data = JSON.parse(localStorage.getItem('data')) || '';
    const AuthStatus = localStorage.getItem('AuthStatus') || false;
    const [state, dispatch] = useReducer(AuthReducer, { data: data, AuthStatus: AuthStatus });
    return (
        <AuthContext.Provider value={{state, dispatch}}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;