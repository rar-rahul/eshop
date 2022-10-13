
import { Header } from './Component/Header';
import {Routes ,Route } from 'react-router-dom';

import Home from './Component/Home';
import { Product } from './Component/Products/Product';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Cart from './Component/Cart';
import AuthContext from './Component/store/userContext';
import { useContext,useReducer,useState } from 'react';
import { CartReducer } from './CartReducer';

function App() {

  const cartCtx = useContext(AuthContext);
  const [cartCnt,setcartCnt] = useState(cartCtx.cartCount);

  const[state,dispatch] = useReducer(CartReducer,{
    cart: [],
  });

  return (
    <div className="App">
     
       <Header state={state}/>
     <Routes>
   <Route path='/' element={<Home  state={state} dispatch={dispatch}/>}/>
   <Route path='/login' element={<SignIn />}/>
   <Route path='/signup' element={<SignUp />}/>
   <Route path='/cart' element={<Cart state={state} dispatch={dispatch} />}/>
   </Routes>
  
     
    </div>
  
  );
}

export default App;
