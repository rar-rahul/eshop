import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "./store/userContext";
import { useContext, useState } from "react";

const Cart = ({ state, dispatch }) => {
  const cartItem = state.cart;

  const [total, setTotal] = useState();

  useEffect(() => {
    setTotal(
      cartItem.reduce((acc, curre) => acc + Number(curre.price) * curre.qty, 0)
    );
  }, [cartItem]);

 // console.log(total);
  const cartCtx = useContext(AuthContext);

  const changeQty = (id,qty) => dispatch({
    type: "CHANGE_CART_QTY",
    payload: {
    id: id,
    qty: qty,
    },
})

  return (
    <div>
      <div
        className="relative z-10"
        aria-labelledby="slide-over-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <div className="pointer-events-auto w-screen max-w-md">
                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <h2
                        className="text-lg font-medium text-gray-900"
                        id="slide-over-title"
                      >
                        Shopping cart
                      </h2>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                        >
                          <span className="sr-only">Close panel</span>

                          <svg
                            className="h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        <ul
                          role="list"
                          className="-my-6 divide-y divide-gray-200"
                        >
                          {cartItem.map((data, index) => {
                            return (
                              <li className="flex py-6" key={index}>
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={data.thumbnail}
                                    alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a href="#"> {data.productName} </a>
                                      </h3>
                                      <p className="ml-4">Rs.{data.price}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">
                                      {data.productName}
                                    </p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                  <div style={{display:'flex', alignItems:'center', gap:10}}>
                         <button onClick={() => changeQty(data.id, data.qty - 1)}>-</button>
                         <span>{data.qty}</span>
                         <button onClick={() => changeQty(data.id, data.qty + 1)}>+</button>
                     </div>

                                    <div className="flex">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          dispatch({
                                            type: "REMOVE_CART",
                                            payload: data,
                                          })
                                        }
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>Rs.{total}.00</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      Shipping and taxes calculated at checkout.
                    </p>
                    <div className="mt-6">
                      <a
                        href="#"
                        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                      >
                        Checkout
                      </a>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or
                        <Link to="/">
                          {" "}
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
