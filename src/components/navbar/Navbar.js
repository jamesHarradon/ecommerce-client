import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectBasketProducts } from "../../features/Basket/BasketProducts/basketProductsSlice";
import logo from '../../uku-logo.png'
import Searchbar from '../searchbar/Searchbar'
import { selectUserId } from "../../userSlice";
import { selectGuestBasket } from "../../guestSlice";


export default function Navbar() {

    const basketProducts = useSelector(selectBasketProducts);
    const userId = useSelector(selectUserId);
    const guestBasket = useSelector(selectGuestBasket);

    return (
        <div className="navbar-container">
            <div className='navbar'>
                <Link id='logo' className="link" to='/'>
                    <img className="logo" src={logo} alt='ukulele logo'></img>
                </Link>
                <Searchbar />
                {userId &&
                    <div className='navbar-text'>
                        <Link className="link" to='/account'><p>Account</p></Link>
                        <Link className="link" to='/basket'><p>Basket&#40;{basketProducts?.length}&#41;</p></Link>
                        <Link className="link" to='/logout'><p>Logout</p></Link>
                    </div>
                }
                {!userId &&
                    <div className='navbar-text'>
                        <Link className="link" to='/register'><p>Register</p></Link>
                        <Link className="link" to='/login'><p>Login</p></Link>
                        <Link className="link" to='/basket'><p>Basket&#40;{guestBasket?.length}&#41;</p></Link>
                    </div>
                }
                
            </div>
        </div>
    )  
}

