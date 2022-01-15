import { nanoid } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { setGuestId, setGuestBasket } from "../../guestSlice";
import { setCartId, selectCartId } from "../../userSlice";
import { getBasketProductsByCustId, addBasketProducts, selectBasketProducts } from "../Basket/basketProductsSlice";
import { getBasketByCustId } from "../Basket/basketSlice";




const Product = ({productId, name, price, quantity, image, description, userId, guestId, guestBasket }) => {

    const cartId = useSelector(selectCartId);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const basketProducts = useSelector(selectBasketProducts);

    useEffect(() => {
        if (guestId) localStorage.setItem(guestId, JSON.stringify(guestBasket))  
    },[guestBasket, guestId])
    
    const addToGuestBasketHandler = () => {
        if (!guestId) dispatch(setGuestId(nanoid()));
        let product = {product_id: productId, product_name: name, price_per_unit: price, quantity: quantity, image: image, description: description };
        dispatch(setGuestBasket([...guestBasket, product]));
        navigate('/basket')
    }
    
    const addToUserBasketHandler = (data) => {
        dispatch(addBasketProducts(data))
        .then(() => {
            dispatch(getBasketByCustId(userId));
            dispatch(getBasketProductsByCustId(userId));
            navigate('/basket');
        })  
    }

    const addToBasketHandler = userId ? () => addToUserBasketHandler({userId: userId, cartId: cartId, productId: productId}) : () => addToGuestBasketHandler();

    let basketToUse = guestId ? guestBasket : basketProducts;
    
    return (
        <div className='product' key={productId}>
            <Link className="link" to={`/products/${productId}`}>
                <h3>{name}</h3>
                <img className='product-image' src={image} alt={name}></img>
                <h3>{price}</h3>
            </Link>
            {basketToUse.some(product => product.product_id === productId)
            ? <p>Item Added to Basket</p>
            : <button onClick={addToBasketHandler}>Add to Basket</button>
            }
            
        </div>
    )
}

export default Product;