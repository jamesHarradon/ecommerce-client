import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { deleteBasketProducts, getBasketProductsByCustId } from './basketProductsSlice'
import { getBasketByCustId } from "./basketSlice";
import { setGuestBasket } from "../../guestSlice";


const BasketProducts = ({id, name, image, price, userId, guestId, guestBasket, cartId }) => {

    const dispatch = useDispatch();

    useEffect(() => {
        if (guestId) localStorage.setItem(guestId, JSON.stringify(guestBasket));
    },[guestBasket, guestId])

    const removeGuestBasketProductHandler = () => {
        let basket = guestBasket.filter(product => product.product_id !== id);
        console.log(id);
        console.log(basket);
        dispatch(setGuestBasket(basket));
    }

    const removeUserBasketProductHandler = (data) => {
        dispatch(deleteBasketProducts(data))
        .then(() => {
            dispatch(getBasketByCustId(userId));
            dispatch(getBasketProductsByCustId(userId));
        })
        
    }

    const removeBasketProductHandler = () => {
        if (!userId) {
            return removeGuestBasketProductHandler()
        } else {
            return removeUserBasketProductHandler({userId: userId, productId: id, cartId: cartId})
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