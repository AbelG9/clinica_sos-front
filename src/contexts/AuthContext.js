import React, {createContext, useReducer } from 'react';
import { AuthReducer } from '../reducers/AuthReducer';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const [state, dispatch] = useReducer(AuthReducer, { data:'', token:'', AuthStatus: false });
    return (
        <AuthContext.Provider value={{state, dispatch}}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;