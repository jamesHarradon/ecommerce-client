import React from "react";
import { Link } from 'react-router-dom';

const Account = () => {
    return (
        <div>    
            <Link to='/account/orders'><h1>Orders</h1></Link>
            <Link to='/account/logindetails'><h1>Login Details</h1></Link>
            <Link to='/account/addresses'><h1>Addresses</h1></Link>
            <Link to='/account/paymentmethods'><h1>Payment Methods</h1></Link>
        </div>
    )
}

export default Account;