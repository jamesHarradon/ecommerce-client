import React from "react";

import Searchbar from "../../features/counter/searchbar/Searchbar"
import BasketIcon from "../../features/basketIcon/BasketIcon"

export default function Navbar() {
    return (
        <div className='navbar'>
            <p>logo</p>
           <Searchbar/>
           <a href='/account'>Account</a>
           <BasketIcon/>    
        </div>
    )
}

