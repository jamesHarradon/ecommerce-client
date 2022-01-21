import { nanoid } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { setGuestId, setGuestBasket, selectGuestId, selectGuestBasket } from "../../guestSlice";
import { selectCartId, selectUserId } from "../../userSlice";
import { getBasketProductsByCustId, addBasketProducts, selectBasketProducts } from "../../features/Basket/BasketProducts/basketProductsSlice";
import { getBasketByCustId } from "../../features/Basket/basketSlice";


const Product = ({ productId, name, price, image, description }) => {

    const cartId = useSelector(selectCartId);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const basketProducts = useSelector(selectBasketProducts);
    const userId = useSelector(selectUserId);
    const guestId = useSelector(selectGuestId);
    const guestBasket = useSelector(selectGuestBasket);

    useEffect(() => {
        if (guestId) localStorage.setItem(guestId, JSON.stringify(guestBasket))  
    },[guestBasket, guestId])
    
    const addToGuestBasketHandler = () => {
        if (!guestId) dispatch(setGuestId(nanoid()));
        let product = {product_id: productId, product_name: name, price_per_unit: price, quantity: 1, image: image, description: description };
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

    let basketToUse = guestId ? guestBasket || [] : basketProducts || [];
    
    return (
        <div className='product' key={productId}>
            <Link className="link" to={`/products/${productId}`}>
                <div className="link-container">
                    <h3>{name}</h3>
                    <img className='product-image' src={image} alt={name}></img>
                    <h3>{price}</h3>
                </div>
            </Link>
            {basketToUse.some(product => product.product_id === productId)
            ? <p>Item Added to Basket</p>
            : <button onClick={addToBasketHandler}>Add to Basket</button>
            }
            
        </div>
    )
}

export default Product;