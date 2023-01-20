import { Header } from "./Component/Header";
import { Routes, Route } from "react-router-dom";

//import Home from "./Component/Home";
import { Product } from "./Component/Products/Product";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Cart from "./Component/Cart";
import Test from "./Component/Test";
import Checkout from "./Component/Checkout";
import AuthContext from "./Component/store/userContext";
import { useContext, useReducer, useState,lazy,Suspense} from "react";
import { CartReducer } from "./CartReducer";
//import { Payment } from "./Component/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Order from "./Component/Order";



import { Circles } from  'react-loader-spinner'
import Footer from "./Component/Footer";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51M6WnVSBkG1kWfLlifIC4AQ765VYeYqPEPS9aopm3mjKw1guEtrKaIfZjHhkT2velFuvXsqKN4dbH2UexPTaG6j100nnCkg9UY"
);
<Circles
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="circles-loading"
  wrapperStyle={{ 
    left:"50%",
    marginLeft:"50px"
   
   
  }}
  wrapperClass=""
  visible={true}
/>

const Home = lazy(() => import('./Component/Home'));
const Payment = lazy(() => import('./Component/Payment'));

function App() {
  const cartCtx = useContext(AuthContext);

  const token = localStorage.getItem("token");
  if (token) {
    cartCtx.login(token);
  }

  const [cartCnt, setcartCnt] = useState(cartCtx.cartCount);

  const [state, dispatch] = useReducer(CartReducer, {
    cart: [],
  });

  return (
    
    <div className="App">
      <Header state={state} />
      <Routes>
        <Route path="/" element={
            <Suspense fallback={<div><Circles/></div>}>
        <Home state={state} dispatch={dispatch} />
        </Suspense>
      } />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/cart"
          element={<Cart state={state} dispatch={dispatch} />}
        />
        <Route
          path="/checkout"
          element={<Checkout state={state} dispatch={dispatch} />}
        />
        <Route
          path="/test"
          element={<Test state={state} dispatch={dispatch} />}
        />
       
        <Route
          path="/payment"
          element={
            <Suspense fallback={<div><Circles/></div>}>
            <Elements stripe={stripePromise}>
              <Payment state={state} dispatch={dispatch} />
            </Elements>
            </Suspense>
          }
        />
        
       
         <Route path="/order" element={<Order />} />
      </Routes>
      <Footer/>
    </div>
   
  );
}

export default App;
