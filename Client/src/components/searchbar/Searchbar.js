import React from "react";
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom";
import { setTerm } from "../../features/Products/productsSlice";

export default function Searchbar () {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    let location = useLocation();
    

    const onChangeHandler = (e) => {
        const term = e.target.value;
        dispatch(setTerm(term));
        location.pathname !== '/' && navigate('/');
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
    };

    return (
        <div className='searchbar'>
            <form onSubmit={onSubmitHandler}>
                <input id='searchbar-input' type='search' placeholder="Search products" onChange={(e) => onChangeHandler(e)}></input>
            </form>
        </div>
        
    )
}

