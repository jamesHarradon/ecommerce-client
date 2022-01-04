import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Searchbar from "../../features/searchbar/Searchbar"


export default function Navbar({user, setUser}) {

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await fetch('http://localhost:4000/auth/logout', {method: 'POST'});
            setUser(false);
            navigate('/products');

        } catch (err) {
            console.log(err);
        }
    }
    // try to refactor below
    if (user) {
        return (
            <div className='navbar'>
            <Link to='/products'>
                <p>logo</p>
            </Link>
            <Searchbar/>
            <Link to='/account'><p>Account</p></Link>
            <Link to='/basket'><p>Basket</p></Link>
            <Link to='/logout'><p onClick={handleLogout}>Logout</p></Link>
        </div>
        )
    } else {
        return (
            <div className='navbar'>
            <Link to='/products'>
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

