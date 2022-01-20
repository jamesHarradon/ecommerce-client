import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { getProductsByTerm } from "../../components/Products/productsSlice";

export default function Searchbar () {

    const [ term, setTerm ] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    let location = useLocation();

    const onChangeHandler = (e) => {
        const term = e.target.value;
        setTerm(term);
        
        
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(getProductsByTerm(term));  
        
    };

    return (
        <div className='searchbar'>
            <form onSubmit={onSubmitHandler}>
                <input id='searchbar-input' type='search' placeholder="Search products" onChange={(e) => onChangeHandler(e)}></input>
            </form>
        </div>
        
    )
}

