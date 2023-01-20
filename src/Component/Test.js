import React from "react";
import AuthContext from "./store/userContext";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Test = ({ state, dispatch }) => {
  const cartItem = state.cart;

  const [total, setTotal] = useState();

  useEffect(() => {
    setTotal(
      cartItem.reduce((acc, curre) => acc + Number(curre.price) * curre.qty, 0)
    );
  }, [cartItem]);

  // console.log(total);
  const cartCtx = useContext(AuthContext);

  const changeQty = (id, qty) =>
    dispatch({
      type: "CHANGE_CART_QTY",
      payload: {
        id: id,
        qty: qty,
      },
    });
  return (
    <>
      <div class="content">
        {/* Start Content*/}
        <div className="container-fluid">
          {/* start page title */}
          <div className="row">
            <div className="col-12">
              <div className="page-title-box">
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <a href="">UBold</a>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="">Ecommerce</a>
                    </li>
                    <li className="breadcrumb-item active">Shopping Cart</li>
                  </ol>
                </div>
                <h4 className="page-title">Shopping Cart</h4>
              </div>
            </div>
          </div>
          {/* end page title */}
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-8">
                      <div className="table-responsive">
                        <table className="table table-borderless table-nowrap table-centered mb-0">
                          <thead className="table-light">
                            <tr>
                              <th>Product</th>
                              <th>Price</th>
                              <th>Quantity</th>
                              <th>Total</th>
                              <th style={{ width: 50 }} />
                            </tr>
                          </thead>
                          <tbody>
                            {cartItem.map((data, index) => {
                              return (
                                <tr key={index}>
                                  <td>
                                    <img
                                      src={data.thumbnail}
                                      alt="contact-img"
                                      title="contact-img"
                                      className="rounded me-3"
                                      style={{ height: 50, width: 50 }}
                                    />
                                    <p className="m-0 d-inline-block align-middle font-16">
                                      <a
                                        href="ecommerce-product-detail.html"
                                        className="text-reset font-family-secondary"
                                      >
                                        {data.productName}
                                      </a>
                                      <br />
                                      {/* <small className="me-2"><b>Size:</b> Large </small>
                              <small><b>Color:</b> Light Green
                              </small> */}
                                    </p>
                                  </td>
                                  <td>Rs.{data.price}</td>
                                  <td>
                                    <input
                                      type="number"
                                      min={1}
                                      defaultValue={data.qty}
                                      className="form-control"
                                      placeholder="Qty"
                                      onClick={() =>
                                        changeQty(data.id, data.qty)
                                      }
                                      style={{ width: 90 }}
                                    />
                                  </td>
                                  <td>$743.30</td>
                                  <td>
                                    <a
                                      href="#"
                                      className="action-icon"
                                      onClick={() =>
                                        dispatch({
                                          type: "REMOVE_CART",
                                          payload: data,
                                        })
                                      }
                                    >
                                      {" "}
                                      <i className="mdi mdi-delete" />
                                    </a>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>{" "}
                      {/* end table-responsive*/}
                      {/* Add note input*/}
                      <div className="mt-3">
                        <label
                          htmlFor="example-textarea"
                          className="form-label"
                        >
                          Add a Note:
                        </label>
                        <textarea
                          className="form-control"
                          id="example-textarea"
                          rows={3}
                          placeholder="Write some note.."
                          defaultValue={""}
                        />
                      </div>
                      {/* action buttons*/}
                      <div className="row mt-4">
                        <div className="col-sm-6">
                          <Link
                            to="/"
                            className="btn text-muted d-none d-sm-inline-block btn-link fw-semibold"
                          >
                            <i className="mdi mdi-arrow-left" /> Continue
                            Shopping{" "}
                          </Link>
                        </div>{" "}
                        {/* end col */}
                        <div className="col-sm-6">
                          <div className="text-sm-end">
                            <Link to="/checkout" className="btn btn-danger">
                              <i className="mdi mdi-cart-plus me-1" /> Checkout{" "}
                            </Link>
                          </div>
                        </div>{" "}
                        {/* end col */}
                      </div>{" "}
                      {/* end row*/}
                    </div>
                    {/* end col */}
                    <div className="col-lg-4">
                      <div className="border p-3 mt-4 mt-lg-0 rounded">
                        <h4 className="header-title mb-3">Order Summary</h4>
                        <div className="table-responsive">
                          <table className="table mb-0">
                            <tbody>
                              <tr>
                                <td>Grand Total :</td>
                                <td>Rs.{total}</td>
                              </tr>
                              <tr>
                                <td>Discount : </td>
                                <td>-$157.11</td>
                              </tr>
                              <tr>
                                <td>Shipping Charge :</td>
                                <td>$25</td>
                              </tr>
                              <tr>
                                <td>Estimated Tax : </td>
                                <td>$19.22</td>
                              </tr>
                              <tr>
                                <th>Total :</th>
                                <th>$1458.3</th>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        {/* end table-responsive */}
                      </div>
                      <div className="alert alert-warning mt-3" role="alert">
                        Use coupon code <strong>UBTF25</strong> and get 25%
                        discount !
                      </div>
                      <div className="input-group mt-3">
                        <input
                          type="text"
                          className="form-control form-control-light"
                          placeholder="Coupon code"
                          aria-label="Recipient's username"
                        />
                        <button
                          className="btn input-group-text btn-light"
                          type="button"
                        >
                          Apply
                        </button>
                      </div>
                    </div>{" "}
                    {/* end col */}
                  </div>{" "}
                  {/* end row */}
                </div>{" "}
                {/* end card-body*/}
              </div>{" "}
              {/* end card*/}
            </div>{" "}
            {/* end col */}
          </div>
          {/* end row */}
        </div>{" "}
        {/* container */}
      </div>
    </>
  );
};

export default Test;
