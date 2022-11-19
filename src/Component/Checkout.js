import React, { useContext, useRef } from 'react'
import { useState,useEffect } from 'react';
import AuthContext from './store/userContext';
import { useNavigate } from "react-router-dom";


 const Checkout = ({state,dispatch}) => {
  const cartItem = state.cart;

  const ctx = useContext(AuthContext);
  const navigate = useNavigate();

  const [total, setTotal] = useState();
  const [formInput,setFormInput] = useState('');
    useEffect(() => {
      setTotal(
        cartItem.reduce((acc, curre) => acc + Number(curre.price) * curre.qty, 0)
      );
    }, [cartItem]);


    const handleInputChange = event => { 
      setFormInput([event.target.name] = [event.target.value]);
      //console.log(formInput);
    }

    const fName = useRef('');
    const lName = useRef('');
    const address = useRef('');
    const zipcode = useRef('');
    const orderNote = useRef('');

    const checkoutFormSubmit = (e) => {
      e.preventDefault();

      setFormInput( { 
          fname:fName.current.value,
          lName:lName.current.value,
          address:address.current.value,
          zipcode:zipcode.current.value,
          orderNote:orderNote.current.value
        });

      

        if(Object.keys(formInput).length > 0){
          localStorage.setItem('checkoutData',JSON.stringify(formInput));
          navigate("/payment");
        }

       // console.log(Object.keys(formInput).length);
        

      // if(ctx.checkoutFrmData.length > 0){
      //   navigate("/payment");
      // }
    }

     

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
            <li className="breadcrumb-item"><a href="">Myecom</a></li>
            <li className="breadcrumb-item"><a href="">Ecommerce</a></li>
            <li className="breadcrumb-item active">Checkout</li>
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
              <div className="nav nav-pills flex-column navtab-bg nav-pills-tab text-center" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                <a className="nav-link active show py-2" id="custom-v-pills-billing-tab" data-bs-toggle="pill" href="#custom-v-pills-billing" role="tab" aria-controls="custom-v-pills-billing" aria-selected="true">
                  <i className="mdi mdi-account-circle d-block font-24" />
                  Billing Info
                </a>
                <a className="nav-link mt-2 py-2" id="custom-v-pills-shipping-tab" data-bs-toggle="pill" href="#custom-v-pills-shipping" role="tab" aria-controls="custom-v-pills-shipping" aria-selected="false">
                  <i className="mdi mdi-truck-fast d-block font-24" />
                  Shipping Info</a>
                <a className="nav-link mt-2 py-2" id="custom-v-pills-payment-tab" data-bs-toggle="pill" href="#custom-v-pills-payment" role="tab" aria-controls="custom-v-pills-payment" aria-selected="false">
                  <i className="mdi mdi-cash-multiple d-block font-24" />
                  Payment Info</a>
              </div>  
              <div className="border mt-4 rounded">
                <h4 className="header-title p-2 mb-0">Order Summary</h4>
                <div className="table-responsive">
                  <table className="table table-centered table-nowrap mb-0">
                    <tbody>
                     
                      {
                        cartItem.map((data,index) => {
                          return( 
                            <tr key={index}>
                            <td>
                              <img src={data.thumbnail} alt="product-img" title="product-img" className="rounded me-2" style={{width:50,height:50}} />
                            </td>
                            <td>
                              <a href="ecommerce-product-detail.html" className="text-body fw-semibold">{data.title}</a>
                              <small className="d-block">{data.qty} x Rs.{data.price}</small>
                            </td>
                            <td className="text-end">
                            {data.qty} * {data.price}
                            </td>
                          </tr>
                          )
                        })

                      }
                     
                      <tr className="text-end">
                        <td colSpan={2}>
                          <h6 className="m-0">Sub Total:</h6>
                        </td>
                        <td className="text-end">
                         Rs.{total}
                        </td>
                      </tr>
                      <tr className="text-end">
                        <td colSpan={2}>
                          <h6 className="m-0">Shipping:</h6>
                        </td>
                        <td className="text-end">
                          FREE
                        </td>
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
              </div> {/* end .border*/}
            </div> {/* end col*/}
            <div className="col-lg-8">
              <div className="tab-content p-3">
                <div className="tab-pane fade active show" id="custom-v-pills-billing" role="tabpanel" aria-labelledby="custom-v-pills-billing-tab">
                  <div>
                    <h4 className="header-title">Billing Information</h4>
                    <p className="sub-header">Fill the form below in order to
                      send you the order's invoice.</p>
                    <form onSubmit={checkoutFormSubmit} id="checkOutForm">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="billing-first-name"  className="form-label">First Name</label>
                            <input className="form-control"  name='name' ref={fName} type="text" placeholder="Enter your first name" id="billing-first-name" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="billing-last-name"  className="form-label">Last Name</label>
                            <input className="form-control"  name='lname' ref={lName} type="text" placeholder="Enter your last name" id="billing-last-name" />
                          </div>
                        </div>
                      </div> {/* end row */}
                    
                      <div className="row">
                        <div className="col-12">
                          <div className="mb-3">
                            <label htmlFor="billing-address"  className="form-label">Address</label>
                            <input className="form-control"  name='address' ref={address} type="text" placeholder="Enter full address" id="billing-address" />
                          </div>
                        </div>
                      </div> {/* end row */}
                      <div className="row">
                       
                        <div className="col-md-4">
                          <div className="mb-3">
                            <label htmlFor="billing-zip-postal"  className="form-label">Zip Code</label>
                            <input className="form-control"  name='zipcode' ref={zipcode} type="text" placeholder="Enter your zip code" id="billing-zip-postal" />
                          </div>
                        </div>
                      </div> {/* end row */}
                     
                      <div className="row">
                        <div className="col-12">
                          
                          <div className="my-3">
                            <label htmlFor="example-textarea" className="form-label">Order Notes:</label>
                            <textarea className="form-control"  name='orderNote' ref={orderNote} id="example-textarea" rows={3} placeholder="Write some note.." defaultValue={""} />
                          </div>
                        </div>
                      </div> {/* end row */}
                      <div className="row mt-4">
                        <div className="col-sm-6">
                          <a href="ecommerce-cart.html" className="btn btn-secondary">
                            <i className="mdi mdi-arrow-left" /> Back to Shopping Cart </a>
                        </div> {/* end col */}
                        <div className="col-sm-6">
                          <div className="text-sm-end mt-2 mt-sm-0">
                            <button type='submit' className="btn btn-success">
                              <i className="mdi mdi-truck-fast me-1" /> Proceed to payment </button>
                          </div>
                        </div> {/* end col */}
                      </div> {/* end row */}
                    </form>
                  </div>    
                </div>
                <div className="tab-pane fade" id="custom-v-pills-shipping" role="tabpanel" aria-labelledby="custom-v-pills-shipping-tab">
                  <div>
                    <h4 className="header-title">Saved Address</h4>
                    <p className="sub-header">Fill the form below in order to
                      send you the order's invoice.</p>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="border p-3 rounded mb-3 mb-md-0">
                          <div className="float-end">
                            <a href="#"><i className="mdi mdi-square-edit-outline text-muted font-20" /></a>
                          </div>
                          <div className="form-check">
                            <input type="radio" id="customRadio1" name="customRadio" className="form-check-input" defaultChecked />
                            <label className="form-check-label font-16 fw-bold" htmlFor="customRadio1">Home</label>
                          </div>
                          <h5 className="mt-3">Brent Rowe</h5>
                          <p className="mb-2"><span className="fw-semibold me-2">Address:</span> 3559 Roosevelt Wilson Lane San Bernardino, CA 92405</p>
                          <p className="mb-2"><span className="fw-semibold me-2">Phone:</span> (123) 456-7890</p>
                          <p className="mb-0"><span className="fw-semibold me-2">Mobile:</span> (+01) 12345 67890</p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="border p-3 rounded mb-3 mb-md-0">
                          <div className="float-end">
                            <a href="#"><i className="mdi mdi-square-edit-outline text-muted font-20" /></a>
                          </div>
                          <div className="form-check">
                            <input type="radio" id="customRadio2" name="customRadio" className="form-check-input" />
                            <label className="form-check-label font-16 fw-bold" htmlFor="customRadio2">Office</label>
                          </div>
                          <h5 className="mt-3">Brent Rowe</h5>
                          <p className="mb-2"><span className="fw-semibold me-2">Address:</span> 3559 Roosevelt Wilson Lane San Bernardino, CA 92405</p>
                          <p className="mb-2"><span className="fw-semibold me-2">Phone:</span> (123) 456-7890</p>
                          <p className="mb-0"><span className="fw-semibold me-2">Mobile:</span> (+01) 12345 67890</p>
                        </div>
                      </div>
                    </div>
                    {/* end row*/}
                    <h4 className="header-title mt-4">Shipping Method</h4>
                    <p className="text-muted mb-3">Fill the form below in order to
                      send you the order's invoice.</p>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="border p-3 rounded mb-3">
                          <div className="form-check">
                            <input type="radio" id="shippingMethodRadio1" name="shippingOptions" className="form-check-input" defaultChecked />
                            <label className="form-check-label font-16 fw-bold" htmlFor="shippingMethodRadio1">Standard Delivery - FREE</label>
                          </div>
                          <p className="mb-0 ps-3 pt-1">Estimated 5-7 days shipping (Duties and tax may be due upon delivery)</p>
                        </div>
                        <div className="border p-3 rounded">
                          <div className="form-check">
                            <input type="radio" id="shippingMethodRadio2" name="shippingOptions" className="form-check-input" />
                            <label className="form-check-label font-16 fw-bold" htmlFor="shippingMethodRadio2">Fast Delivery - $25</label>
                          </div>
                          <p className="mb-0 ps-3 pt-1">Estimated 1-2 days shipping (Duties and tax may be due upon delivery)</p>
                        </div>
                      </div>
                    </div>
                    {/* end row*/}
                    <div className="row mt-4">
                      <div className="col-sm-6">
                        <a href="ecommerce-cart.html" className="btn btn-secondary">
                          <i className="mdi mdi-arrow-left" /> Back to Shopping Cart </a>
                      </div> {/* end col */}
                      <div className="col-sm-6">
                        <div className="text-sm-end mt-2 mt-sm-0">
                          <a href="ecommerce-checkout.html" className="btn btn-success">
                            <i className="mdi mdi-cash-multiple me-1" /> Continue to Payment </a>
                        </div>
                      </div> {/* end col */}
                    </div> {/* end row */}
                  </div>
                </div>
                <div className="tab-pane fade" id="custom-v-pills-payment" role="tabpanel" aria-labelledby="custom-v-pills-payment-tab">
                  <div>
                    <h4 className="header-title">Payment Selection</h4>
                    <p className="sub-header">Fill the form below in order to
                      send you the order's invoice.</p>
                    {/* Pay with Paypal box*/}
                    <div className="border p-3 mb-3 rounded">
                      <div className="float-end">
                        <i className="fab fa-cc-paypal font-24 text-primary" />
                      </div>
                      <div className="form-check">
                        <input type="radio" id="BillingOptRadio2" name="billingOptions" className="form-check-input" />
                        <label className="form-check-label font-16 fw-bold" htmlFor="BillingOptRadio2">Pay with Paypal</label>
                      </div>
                      <p className="mb-0 ps-3 pt-1">You will be redirected to PayPal website to complete your purchase securely.</p>
                    </div>
                    {/* end Pay with Paypal box*/}
                    {/* Credit/Debit Card box*/}
                    <div className="border p-3 mb-3 rounded">
                      <div className="float-end">
                        <i className="far fa-credit-card font-24 text-primary" />
                      </div>
                      <div className="form-check">
                        <input type="radio" id="BillingOptRadio1" name="billingOptions" className="form-check-input" defaultChecked />
                        <label className="form-check-label font-16 fw-bold" htmlFor="BillingOptRadio1">Credit / Debit Card</label>
                      </div>
                      <p className="mb-0 ps-3 pt-1">Safe money transfer using your bank account. We support Mastercard, Visa, Discover and Stripe.</p>
                      <div className="row mt-4">
                        <div className="col-md-12">
                          <div className="mb-3">
                            <label htmlFor="card-number" className="form-label">Card Number</label>
                            <input type="text" id="card-number" className="form-control" data-toggle="input-mask" data-mask-format="0000 0000 0000 0000" placeholder="4242 4242 4242 4242" />
                          </div>
                        </div>
                      </div> {/* end row */}
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="card-name-on" className="form-label">Name on card</label>
                            <input type="text" id="card-name-on" className="form-control" placeholder="Master Shreyu" />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label htmlFor="card-expiry-date" className="form-label">Expiry date</label>
                            <input type="text" id="card-expiry-date" className="form-control" data-toggle="input-mask" data-mask-format="00/00" placeholder="MM/YY" />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="mb-3">
                            <label htmlFor="card-cvv" className="form-label">CVV code</label>
                            <input type="text" id="card-cvv" className="form-control" data-toggle="input-mask" placeholder={123456} />
                          </div>
                        </div>
                      </div> {/* end row */}
                    </div>
                    {/* end Credit/Debit Card box*/}
                    {/* Cash on Delivery box*/}
                    <div className="border p-3 mb-3 rounded">
                      <div className="float-end">
                        <i className="fas fa-money-bill-alt font-24 text-primary" />
                      </div>
                      <div className="form-check">
                        <input type="radio" id="BillingOptRadio4" name="billingOptions" className="form-check-input" />
                        <label className="form-check-label font-16 fw-bold" htmlFor="BillingOptRadio4">Cash on Delivery</label>
                      </div>
                      <p className="mb-0 ps-3 pt-1">Pay with cash when your order is delivered.</p>
                    </div>
                    {/* end Cash on Delivery box*/}
                    <div className="row mt-4">
                      <div className="col-sm-6">
                        <a href="ecommerce-cart.html" className="btn btn-secondary">
                          <i className="mdi mdi-arrow-left" /> Back to Shopping Cart </a>
                      </div> {/* end col */}
                      <div className="col-sm-6">
                        <div className="text-sm-end mt-2 mt-sm-0">
                          <a href="ecommerce-checkout.html" className="btn btn-success">
                            <i className="mdi mdi-cash-multiple me-1" /> Complete Order </a>
                        </div>
                      </div> {/* end col */}
                    </div> {/* end row*/}
                  </div>
                </div>
              </div>
            </div> {/* end col*/}
          </div> {/* end row*/}
        </div>
      </div>
    </div>
  </div>
  {/* end row */}
</div> {/* container */}
{/* content */}

    </div>
  )
}
export default Checkout;