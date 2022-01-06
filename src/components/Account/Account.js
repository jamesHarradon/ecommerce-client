import React, { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';

const Account = ({userId}) => {
    const navigate = useNavigate();

    // useEffect(() => {
    //     if(!userId) navigate('/login')
    // },[navigate, userId])
    

    
    return (
        <div>    
            <Link to='/account/orders'><h1>Orders</h1></Link>
            <Link to='/account/logindetails'><h1>Login Details</h1></Link>
            <Link to='/account/contact'><h1>Contact</h1></Link>
            <Link to='/account/paymentmethods'><h1>Payment Methods</h1></Link>
        </div>
    )
}

export default Account;