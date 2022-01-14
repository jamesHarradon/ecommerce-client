import { nanoid } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { setGuestId, setGuestBasket } from "../../guestSlice";
import { setCartId } from "../../userSlice";
import { getBasketProductsByCustId, selectBasketProducts } from "../Basket/basketProductsSlice";
import { getBasketByCustId } from "../Basket/basketSlice";




const Product = ({id, name, price, quantity, image, description, userId, guestId, guestBasket }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const basketProducts = useSelector(selectBasketProducts);

    useEffect(() => {
        if (guestId) localStorage.setItem(guestId, JSON.stringify(guestBasket))  
    },[guestBasket, guestId])
    
    const addToGuestBasketHandler = () => {
        if (!guestId) dispatch(setGuestId(nanoid()));
        let product = {product_id: id, product_name: name, price_per_unit: price, quantity: quantity, image: image, description: description };
        dispatch(setGuestBasket([...guestBasket, product]));
        navigate('/basket')
    }
    
    const addToUserBasketHandler = async() => {
        try {
            const response = await fetch(`http://localhost:4000/api/cart/${userId}`, {credentials: 'include'});
            if (response.ok) {
                const cart = await response.json();
                const cartId = cart.id;
                await fetch(`http://localhost:4000/api/cart/products/add/${userId}/${cartId}/${id}`, {method: 'POST', credentials: 'include'});
                navigate('/basket')
            } else {
                throw new Error('System Error');
            }
        } catch (err) {
            console.log(err)
        }
    }

    const addToBasketHandler = () => userId ? addToUserBasketHandler() : addToGuestBasketHandler();

    let basketToUse = guestId ? guestBasket : basketProducts;
    

    return (
        <div key={id}>
            <Link to={`/products/${id}`}>
                <h3>{name}</h3>
                <img className='product-image' src={image} alt={name}></img>
                <h3>{price}</h3>
            </Link>
            {basketToUse.some(product => product.product_id === id)
            ? <p>Item Added to Basket</p>
            : <button onClick={addToBasketHandler}>Add to Basket</button>
            }
            
        </div>
    )
}

export default Product;