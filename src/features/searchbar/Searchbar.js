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
        <div>
            <form onSubmit={onSubmitHandler}>
                <input id='searchbar' type='search' onChange={(e) => onChangeHandler(e)}></input>
                <button className="submit" type='submit'>Search</button>
            </form>
        </div>
        
    )
}

