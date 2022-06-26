import React from 'react';
import {Link} from 'react-router-dom';
import homeImg from '../images/home.png';
import {useSelector} from 'react-redux';

function Navbar() {
    const {cartTotalQuantity} = useSelector((state)=>state.cart)
  return (
    <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <h1>Coza Store</h1>
                </Link>
                <div>
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <div className='cartNums'>
                        <Link className="nav-link" to="cart">
                            <i className="fa-solid fa-cart-shopping fa-xl text-black"></i>
                            <span className='cartNums'>{cartTotalQuantity<1? "0": cartTotalQuantity}</span>
                        </Link>
                    </div>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
        <section className='slider text-center'>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <div className='text-uppercase'>
                            <h2>new</h2>
                            <h3>arrivals</h3>
                            <Link to='/'>
                                <button>shop now</button>
                            </Link>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div>
                            <img className='w-75' src={homeImg} alt="homeImg" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </React.Fragment>
  )
}

export default Navbar