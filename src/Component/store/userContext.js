import { createContext, useState } from "react";

const AuthContext = createContext();


export const AuthContextProvider = (props) => { 

    const[token,setToken] = useState(null);

    const userIsLogedIn = !!token;

    const loginHandler = (token) => {
        setToken(token);
    }

    const logoutHandler = () => { 
        setToken(null);
    }

   

    const contextValue = {
        userToken:token,
        isLogedIn:userIsLogedIn,
        login:loginHandler,
        logout:logoutHandler,
        cartData:[],
        cartTotal:0,
        cartCount:[]
    }

    return<AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>


   

}

export default AuthContext;