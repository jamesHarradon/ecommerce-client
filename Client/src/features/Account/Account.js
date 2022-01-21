import React from "react";
import { Link } from 'react-router-dom';

const Account = () => {
   
    return (
        <div className='account'>    
            <Link className="link" to='/account/orders'><h1>Orders</h1></Link>
            <Link className="link" to='/account/logindetails'><h1>Login Details</h1></Link>
            <Link className="link" to='/account/contact'><h1>Contact</h1></Link>
            <Link className="link" to='/account/paymentmethods'><h1>Payment Methods</h1></Link>
        </div>
    )
}

export default Account;