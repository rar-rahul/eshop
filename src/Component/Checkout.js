import React, { useContext, useRef } from 'react'
import { useState,useEffect } from 'react';
import AuthContext from './store/userContext';
import { useNavigate } from "react-router-dom";
import OrderSummary from './OrderSummary';


 const Checkout = ({state,dispatch}) => {
  const cartItem = state.cart;

  const ctx = useContext(AuthContext);
  const navigate = useNavigate();
  const initialValue = {};
  const [total, setTotal] = useState();
  const [formdata,setFormData] = useState(initialValue);
    
    // const handleInputChange = event => { 
    //   setFormInput([event.target.name] = event.target.value);
    //   //console.log(formInput);
    // }

    const fName = useRef('');
    const lName = useRef('');
    const address = useRef('');
    const zipcode = useRef('');
    const orderNote = useRef('');

    let billData = { 
      fname:fName.current.value,
      lName:lName.current.value,
      address:address.current.value,
      zipcode:zipcode.current.value,
      orderNote:orderNote.current.value,
      userId:1
    }
    //console.log(billData);

    const handleChange = (e) => {
      setFormData({ ...formdata, [e.target.name]: e.target.value });
    };

   

    const checkoutFormSubmit = (e) => {
      e.preventDefault();

          localStorage.setItem('checkoutData',JSON.stringify(formdata));

          if(localStorage.getItem('checkoutData')){
            navigate("/payment");
          }

    }

    useEffect(() => {
      setTotal(
        cartItem.reduce((acc, curre) => acc + Number(curre.price) * curre.qty, 0)
      );
    }, [cartItem]);   

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
            
            {/* Order Summary Component*/}
            <OrderSummary cartItem={cartItem} total={total}/> 
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
                            <input className="form-control" onChange={(e) =>handleChange(e)}  name='name' ref={fName} type="text" placeholder="Enter your first name" id="billing-first-name" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="billing-last-name"  className="form-label">Last Name</label>
                            <input className="form-control" onChange={(e) =>handleChange(e)} name='lname' ref={lName} type="text" placeholder="Enter your last name" id="billing-last-name" />
                          </div>
                        </div>
                      </div> {/* end row */}
                    
                      <div className="row">
                        <div className="col-12">
                          <div className="mb-3">
                            <label htmlFor="billing-address"  className="form-label">Address</label>
                            <input className="form-control" onChange={(e) =>handleChange(e)} name='address' ref={address} type="text" placeholder="Enter full address" id="billing-address" />
                          </div>
                        </div>
                      </div> {/* end row */}
                      <div className="row">
                       
                        <div className="col-md-4">
                          <div className="mb-3">
                            <label htmlFor="billing-zip-postal"  className="form-label">Zip Code</label>
                            <input className="form-control" onChange={(e) => handleChange(e)} name='zipcode' ref={zipcode} type="text" placeholder="Enter your zip code" id="billing-zip-postal" />
                          </div>
                        </div>
                      </div> {/* end row */}
                     
                      <div className="row">
                        <div className="col-12">
                          
                          <div className="my-3">
                            <label htmlFor="example-textarea" className="form-label">Order Notes:</label>
                            <textarea className="form-control" onChange={(e) =>handleChange(e)} name='orderNote' ref={orderNote} id="example-textarea" rows={3} placeholder="Write some note.." defaultValue={""} />
                          </div>
                        </div>
                      </div> {/* end row */}
                      <div className="row mt-4">
                        <div className="col-sm-6">
                          <a href="" className="btn btn-secondary">
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