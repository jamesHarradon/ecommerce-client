import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { getProductsByTerm } from "../../components/Products/productsSlice";

export default function Searchbar () {

    const [ term, setTerm ] = useState('');

    const dispatch = useDispatch();

    const onChangeHandler = (e) => {
        const term = e.target.value;
        setTerm(term);
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(getProductsByTerm(term));
    }

    return (
        <div>
            <form onSubmit={onSubmitHandler}>
                <input type='search' onChange={(e) => onChangeHandler(e)}></input>
                <button type='submit'>Search</button>
            </form>
        </div>
        
    )
}

