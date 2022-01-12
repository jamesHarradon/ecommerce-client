import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectBasketProducts } from "../Basket/basketProductsSlice";


import Searchbar from "../../features/searchbar/Searchbar"


export default function Navbar({userId, guestBasket}) {

    const basketProducts = useSelector(selectBasketProducts);
    // try to refactor below
    if (userId) {
        return (
            <div className="navbar-container">
                <div className='navbar'>
                    <Link to='/'>
                        <p>logo</p>
                    </Link>
                    <Searchbar/>
                    <Link to='/account'><p>Account</p></Link>
                    <Link to='/basket'><p>Basket&#40;{basketProducts.length}&#41;</p></Link>
                    <Link to='/logout'><p>Logout</p></Link>
                </div>
            </div>
        )
    } else {
        return (
            <div className="navbar-container">
                <div className='navbar'>
                    <Link to='/'>
                        <p>logo</p>
                    </Link>
                    <Searchbar/>
                    <Link to='/register'><p>Register</p></Link>
                    <Link to='/login'><p>Login</p></Link>
                    <Link to='/basket'><p>Basket&#40;{guestBasket.length}&#41;</p></Link>
                </div>
            </div>
        )
    }
}

