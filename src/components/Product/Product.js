import { nanoid } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { setGuestId, setGuestBasket } from "../../guestSlice";
import { getBasketProductsByCustId } from "../Basket/basketProductsSlice";
import { getBasketByCustId } from "../Basket/basketSlice";




const Product = ({id, name, price, quantity, image, description, userId, guestId, guestBasket }) => {

    const dispatch = useDispatch();

    useEffect(() => {
        if (guestId) localStorage.setItem(guestId, JSON.stringify(guestBasket))  
    },[guestBasket, guestId])
    
    const addToGuestBasketHandler = () => {
        if (!guestId) dispatch(setGuestId(nanoid()));
        let product = {product_id: id, product_name: name, price_per_unit: price, quantity: quantity, image: image, description: description };
        dispatch(setGuestBasket([...guestBasket, product]));
    }
    
    const addToUserBasketHandler = async() => {
        try {
            console.log('called')
            let cartId;
            const response = await fetch(`http://localhost:4000/api/cart/${userId}`, {credentials: 'include'});
            const cart = await response.json();
            console.log(cart);
            if (cart) {
                console.log(cart.id)
                cartId = cart.id;
            } else {
                const newCartResponse = await fetch(`http://localhost:4000/api/cart/new/${userId}`, {
                    method: 'POST',
                    credentials: 'include'
                });
                const newCart = await newCartResponse.json();
                cartId = newCart.id;
            }
            
            await fetch(`http://localhost:4000/api/cart/products/add/${userId}/${cartId}/${id}`, {method: 'POST', credentials: 'include'});
            dispatch(getBasketByCustId(userId));
            dispatch(getBasketProductsByCustId(userId));
        } catch (err) {
            console.log(err)
        }
    }


    const addToBasketHandler = () => {
        if (!userId) {
            return addToGuestBasketHandler();
        } else {
            return addToUserBasketHandler();
        }
    }
    return (
        <div key={id}>
            <Link to={`/products/${id}`}>
                <h3>{name}</h3>
                <img className='product-image' src={image} alt={name}></img>
                <h3>{price}</h3>
            </Link>
            <button onClick={addToBasketHandler}>Add to Basket</button>
        </div>
    )
}

export default Product;