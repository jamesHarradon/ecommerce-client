import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { getBasketProductsByCustId } from './basketProductsSlice'
import { getBasketByCustId } from "./basketSlice";
import { setGuestBasket } from "../../guestSlice";


const BasketProducts = ({id, name, image, price, userId, guestId, guestBasket }) => {

    const dispatch = useDispatch();

    useEffect(() => {
        localStorage.setItem(guestId, JSON.stringify(guestBasket));
    },[guestBasket, guestId])

    const removeGuestBasketProductHandler = () => {
        let basket = guestBasket.filter(product => product.product_id !== id);
        console.log(id);
        console.log(basket);
        dispatch(setGuestBasket(basket));
    }

    
    const removeUserBasketProductHandler = async () => {
        try {
            const response = await fetch(`http://localhost:4000/api/cart/${userId}`, {credentials: 'include'});
            const cart = await response.json();
            const cartId = cart.id;
            await fetch(`http://localhost:4000/api/cart/products/delete/${userId}/${cartId}/${id}`, {method: 'DELETE', credentials: 'include'});
            // gets basket data
            dispatch(getBasketProductsByCustId(userId));
            dispatch(getBasketByCustId(userId));
            
        } catch (err) {
            console.log(err)
        }
    }

    const removeBasketProductHandler = () => {
        if (!userId) {
            return removeGuestBasketProductHandler()
        } else {
            return removeUserBasketProductHandler()
        }
    }

    
    return (
    
        <div className="basket-product" key={id} id={name}>
            <p>{name}</p>
            <img src={image} alt={name}/>
            <p>{price}</p>
            <button onClick={removeBasketProductHandler}>X</button>
        </div>

    )
}

export default BasketProducts;