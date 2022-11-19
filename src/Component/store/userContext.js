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

    const checkoutData = ({data}) => {
        let d = data;
        return d;
    }

   

    const contextValue = {
        userToken:token,
        isLogedIn:userIsLogedIn,
        login:loginHandler,
        logout:logoutHandler,
        cartData:[],
        cartTotal:0,
        cartCount:[],
        checkoutFrmData:checkoutData
    }

    return<AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>


   

}

export default AuthContext;