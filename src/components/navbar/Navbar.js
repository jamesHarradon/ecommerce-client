import React from "react";
import { Link } from "react-router-dom";


import Searchbar from "../../features/searchbar/Searchbar"


export default function Navbar({userId}) {

    // try to refactor below
    if (userId) {
        return (
            <div className='navbar'>
            <Link to='/'>
                <p>logo</p>
            </Link>
            <Searchbar/>
            <Link to='/account'><p>Account</p></Link>
            <Link to='/basket'><p>Basket</p></Link>
            <Link to='/logout'><p>Logout</p></Link>
        </div>
        )
    } else {
        return (
            <div className='navbar'>
            <Link to='/'>
                <p>logo</p>
            </Link>
            <Searchbar/>
            <Link to='/register'><p>Register</p></Link>
            <Link to='/login'><p>Login</p></Link>
            <Link to='/account'><p>Account</p></Link>
            <Link to='/basket'><p>Basket</p></Link>
        </div>
        )
    }
}

