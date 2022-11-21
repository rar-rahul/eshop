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

<<<<<<< HEAD
    const checkoutData = ({data}) => {
        let d = data;
        return d;
    }

=======
>>>>>>> 9629ef2a59963ec5c78e9957477f0920efb533ac
   

    const contextValue = {
        userToken:token,
        isLogedIn:userIsLogedIn,
        login:loginHandler,
        logout:logoutHandler,
        cartData:[],
        cartTotal:0,
<<<<<<< HEAD
        cartCount:[],
        checkoutFrmData:checkoutData
=======
        cartCount:[]
>>>>>>> 9629ef2a59963ec5c78e9957477f0920efb533ac
    }

    return<AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>


   

}

export default AuthContext;