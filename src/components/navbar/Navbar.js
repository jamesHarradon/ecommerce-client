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
                    <Link className="link" to='/'>
                        <p>logo</p>
                    </Link>
                    <Searchbar/>
                    <Link className="link" to='/account'><p>Account</p></Link>
                    <Link className="link" to='/basket'><p>Basket&#40;{basketProducts?.length}&#41;</p></Link>
                    <Link className="link" to='/logout'><p>Logout</p></Link>
                </div>
            </div>
        )
    } else {
        return (
            <div className="navbar-container">
                <div className='navbar'>
                    <Link className="link" to='/'>
                        <p>logo</p>
                    </Link>
                    <Searchbar/>
                    <Link className="link" to='/register'><p>Register</p></Link>
                    <Link className="link" to='/login'><p>Login</p></Link>
                    <Link className="link" to='/basket'><p>Basket&#40;{guestBasket?.length}&#41;</p></Link>
                </div>
            </div>
        )
    }
}

