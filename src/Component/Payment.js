import React from "react";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./store/userContext";
import {
  CardElement,
  useStripe,
  PaymentElement,
  useElements,
} from "@stripe/react-stripe-js";
import OrderSummary from "./OrderSummary";
import axios from "axios";

 const Payment = ({ state, dispatch }) => {
  const cartItem = state.cart;
  const [total, setTotal] = useState();
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setTotal(
      cartItem.reduce((acc, curre) => acc + Number(curre.price) * curre.qty, 0)
    );
  }, [cartItem]);

  //Handle order place 
  const handleSubmit = async (event) => {
    event.preventDefault();

    //orderData
    const checkoutData = localStorage.getItem("checkoutData");
    const dataObj = JSON.parse(checkoutData);
    const productIds = [];

    {
      cartItem.map((curr) => {
        productIds.push(curr.id);
      });
    }

    dataObj["pids"] = productIds;

    axios.post("http://127.0.0.1:8000/api/orderPlace", dataObj)
    .then((res) => {
      if (res.data === 200) {
       
        dispatch({ type: 'CLEAR_CART' });
       
        navigate("/order");
       
      } else {
        alert("something wrong while placing the order")
      }
    });
  };

  return (
    <div>
      {/* Start Content*/}
      <div className="container-fluid">
        {/* start page title */}
        <div className="row">
          <div className="col-12">
            <div className="page-title-box">
              <div className="page-title-right">
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item">
                    <a href="">Myecom</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="">Ecommerce</a>
                  </li>
                  <li className="breadcrumb-item active">Payment</li>
                </ol>
              </div>
              <h4 className="page-title">Checkout</h4>
            </div>
          </div>
        </div>
        {/* end page title */}
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-4">
                    {/* Order Summary Component*/}
                    <OrderSummary cartItem={cartItem} total={total} />{" "}
                    {/* end .border*/}
                  </div>{" "}
                  {/* end col*/}
                  <div className="col-lg-8">
                    <div className="tab-content p-3">
                      <form onSubmit={handleSubmit}>
                        <div
                          className="tab-pane fade active show"
                          id="custom-v-pills-payment"
                          role="tabpanel"
                          aria-labelledby="custom-v-pills-payment-tab"
                        >
                          <div>
                            <h4 className="header-title">Payment Selection</h4>
                            <p className="sub-header">
                              Fill the form below in order to send you the
                              order's invoice.
                            </p>
                            {/* Pay with Paypal box*/}
                            <div className="border p-3 mb-3 rounded">
                              <div className="float-end">
                                <i className="fab fa-cc-paypal font-24 text-primary" />
                              </div>
                              <div className="form-check">
                                <input
                                  type="radio"
                                  id="BillingOptRadio1"
                                  name="paymethod"
                                  className="form-check-input"
                                  value="online"
                                />
                                <label
                                  className="form-check-label font-16 fw-bold"
                                  htmlFor="BillingOptRadio1"
                                >
                                  Pay with Online
                                </label>
                              </div>
                              <p className="mb-0 ps-3 pt-1">
                                You will be redirected to Online website to
                                complete your purchase securely.
                              </p>
                            </div>
                            <div className="border p-3 mb-3 rounded">
                              <div className="float-end">
                                <i className="fas fa-money-bill-alt font-24 text-primary" />
                              </div>
                              <div className="form-check">
                                <input
                                  type="radio"
                                  id="BillingOptRadio2"
                                  name="paymethod"
                                  className="form-check-input"
                                  value="cod"
                                />
                                <label
                                  className="form-check-label font-16 fw-bold"
                                  htmlFor="BillingOptRadio2"
                                >
                                  Cash on Delivery
                                </label>
                              </div>
                              <p className="mb-0 ps-3 pt-1">
                                Pay with cash when your order is delivered.
                              </p>
                            </div>
                            {/* end Cash on Delivery box*/}
                            <div className="row mt-4">
                              <div className="col-sm-6">
                                <a href="#" className="btn btn-secondary">
                                  <i className="mdi mdi-arrow-left" /> Back to
                                  Shopping Cart{" "}
                                </a>
                              </div>{" "}
                              {/* end col */}
                              <div className="col-sm-6">
                                <div className="text-sm-end mt-2 mt-sm-0">
                                  <button
                                    type="submit"
                                    className="btn btn-success"
                                  >
                                    <i className="mdi mdi-cash-multiple me-1" />{" "}
                                    Complete Order{" "}
                                  </button>
                                </div>
                              </div>{" "}
                              {/* end col */}
                            </div>{" "}
                            {/* end row*/}
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>{" "}
                  {/* end col*/}
                </div>{" "}
                {/* end row*/}
              </div>
            </div>
          </div>
        </div>
        {/* end row */}
      </div>{" "}
      {/* container */}
      {/* content */}
    </div>
  );
};
export default Payment;
