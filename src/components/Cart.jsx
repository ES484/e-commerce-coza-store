import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {removeCart, addToCart, decrease, clearCart, getTotal} from './../features/cartSlice';
import {Link} from 'react-router-dom';

function Cart() {
  const cart = useSelector((state)=>state.cart);
  const dispatch = useDispatch();
  useEffect(()=>{dispatch(getTotal())}, [cart, dispatch]);
  const cartTitle = ["Description", "Quantity", "Remove", "Price"]
  return (
    <React.Fragment>
      <div className="container bg-white">
        {cart.cartItems.length === 0? 
        <div className="row">
        <div className="col-md-12">
          <div className='text-center'>
            <h2>Cart is Empty</h2>
            <Link to="/">
              <button>Go Shopping</button>
            </Link>
          </div>
        </div></div>: <>{cart.cartItems.map((product)=><div className='row align-items-center' key={product.id}>
          <div className="col-sm-12 col-lg-6 col-md-4">
            <div className='d-flex align-items-center'>
              <div>
                <img className='w-50' src={product.image} alt={product.title} />
              </div>
              <div className='w-100'>
                <h6>{product.title}</h6>
                <p>${product.price}</p>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-lg-6 col-md-8">
            <div className='d-flex align-items-center'>
              <div className='productQty'>
              <button onClick={()=>{
                      dispatch(decrease(product))}}>-</button>
              <span>{product.cartQuantity}</span>
              <button onClick={()=>{
                      dispatch(addToCart(product))}}>+</button>
              </div>
              <div className="price ps-5 text-center">
                <h5>Price: ${product.price*product.cartQuantity}</h5>
              </div>
              <div className='delete ms-auto pe-5'>
                <button onClick={()=>{dispatch(removeCart(product))}}>
                <i className="fa-solid fa-trash-can"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        )}
        <div className="col-md-12">
          <div>
            <div className='d-flex justify-content-end pe-5 py-4'>
              <h4>Total: ${cart.cartTotalAmount}</h4>
            </div>
            <div className="cartSummary">
              <button onClick={()=>{
                        dispatch(clearCart())}}>clear cart</button>
              <button><Link className='d-block' to="/">continue shopping</Link></button>
            </div>
          </div>
        </div></>
        }
        
      </div>
    </React.Fragment>
  )
}

export default Cart