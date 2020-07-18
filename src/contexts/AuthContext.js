import React, {createContext, useReducer } from 'react';
import { AuthReducer } from '../reducers/AuthReducer';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const [state, dispatch] = useReducer(AuthReducer, { data:'', token:'', AuthStatus: true });
    return (
        <AuthContext.Provider value={{state, dispatch}}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;