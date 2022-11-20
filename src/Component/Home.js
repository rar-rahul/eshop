import React, { useContext, useState,useEffect } from "react";
import AuthContext from "./store/userContext";

const Home = ({state,dispatch}) => {

  const {cart} = state;

  console.log(state);

 // const productList = props.data;
  const [list, setlist] = useState([]);

  const allProducts = async () => {
    const responce = await fetch("https://dummyjson.com/products");
    const data = await responce.json();
    setlist(data.products);    
  };

  useEffect(() => {
    allProducts();
    
  },[]);



  //const [cart, setCart] = useState([]);

  // const cartCtx = useContext(AuthContext);

  // const addToCart = (product) => {
  //   let cart = [];

  //   if(cartCtx.cartData.find((cartProduct) => cartProduct.id === product.id)){
  //     console.log("already exist in my basket");
  //   }
  

  //   setCart([
  //     ...cart,
  //     {
  //       id: product.id,
  //       productName: product.title,
  //       price: product.price,
  //       pimage:product.images[0],
  //       qty:1
  //     },
  //   ]);

  // };
  // cartCtx.cartData.push(...cart);
 // console.log(cartCtx.cartCount);

  

  return (
    <>
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
            Customers also purchased
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {list.map((curreData, index) => {
              return (
                <div className="group relative border" key={index}>
                  <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                    <img
                      src={curreData.images[0]}
                      alt="Front"
                      className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        {curreData.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">Black</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      ${curreData.price}
                    </p>
                  </div>


                  {cart.some((p) => p.id === curreData.id) ? (
            <button
              style={{padding:5,border:0,borderRadius:5,backgroundColor:'#e53935',color:'white'}}
              onClick={() => dispatch({
                  type: "REMOVE_CART",
                  payload: curreData,
                })
              }
            >
              Remove from Cart
            </button>
          ) : (
            <button
             style={{padding:5,border:0,borderRadius:5,backgroundColor:'green',color:'white'}}
             onClick={() => dispatch({
                  type: "ADD_TO_CART",
                  payload: {
                    id: curreData.id,
                    title: curreData.title,
                    thumbnail: curreData.images[0],
                    qty: curreData.qty,
                    price: curreData.price,
                  },
                })
              }
            >
              Add to Cart
            </button>
          )}

                
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
