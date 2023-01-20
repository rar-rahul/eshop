import React from 'react'

const OrderSummary = ({cartItem,total}) => {
  return (
    <div>
         <div className="border mt-4 rounded">
                      <h4 className="header-title p-2 mb-0">Order Summary</h4>
                      <div className="table-responsive">
                        <table className="table table-centered table-nowrap mb-0">
                          <tbody>
                            {cartItem.map((data, index) => {
                              return (
                                <tr key={index}>
                                  <td>
                                    <img
                                      src={data.thumbnail}
                                      alt="product-img"
                                      title="product-img"
                                      className="rounded me-2"
                                      style={{ width: 50, height: 50 }}
                                    />
                                  </td>
                                  <td>
                                    <a
                                      href="ecommerce-product-detail.html"
                                      className="text-body fw-semibold"
                                    >
                                      {data.title}
                                    </a>
                                    <small className="d-block">
                                      {data.qty} x Rs.{data.price}
                                    </small>
                                  </td>
                                  <td className="text-end">
                                    {data.qty} * {data.price}
                                  </td>
                                </tr>
                              );
                            })}

                            <tr className="text-end">
                              <td colSpan={2}>
                                <h6 className="m-0">Sub Total:</h6>
                              </td>
                              <td className="text-end">Rs.{total}</td>
                            </tr>
                            <tr className="text-end">
                              <td colSpan={2}>
                                <h6 className="m-0">Shipping:</h6>
                              </td>
                              <td className="text-end">FREE</td>
                            </tr>
                            <tr className="text-end">
                              <td colSpan={2}>
                                <h5 className="m-0">Total:</h5>
                              </td>
                              <td className="text-end fw-semibold">
                                Rs.{total}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      {/* end table-responsive */}
                    </div>  
    </div>
  )
}

export default OrderSummary