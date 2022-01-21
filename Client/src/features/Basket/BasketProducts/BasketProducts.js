import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { deleteBasketProducts, getBasketProductsByCustId, incrementBasketProduct, decrementBasketProduct } from './basketProductsSlice'
import { getBasketByCustId } from '../basketSlice'
import { selectCartId, selectUserId } from '../../../userSlice'
import { setGuestBasket, selectGuestId, incrementGuestBasketProduct, decrementGuestBasketProduct, selectGuestBasket } from "../../../guestSlice";


const BasketProducts = ({id, name, price, quantity, image, description }) => {

    const dispatch = useDispatch();
    const guestBasket = useSelector(selectGuestBasket);
    const guestId = useSelector(selectGuestId);
    const userId = useSelector(selectUserId);
    const cartId = useSelector(selectCartId);

    useEffect(() => {
        if (guestId) localStorage.setItem(guestId, JSON.stringify(guestBasket));
    },[guestBasket, guestId]);


    const incrementProduct = (userId, cartId, id) => {
        if (userId) {
            dispatch(incrementBasketProduct({userId: userId, cartId: cartId, productId: id}))
            .then(() => {
                dispatch(getBasketByCustId(userId));
                dispatch(getBasketProductsByCustId(userId));
            })
        } else {
            dispatch(incrementGuestBasketProduct(id));
        } 
    }   
        

    const decrementProduct = (userId, cartId, id) => {
        if (userId) {
            quantity < 2 ? removeUserBasketProductHandler({userId: userId, cartId: cartId, productId: id}) : dispatch(decrementBasketProduct({userId: userId, cartId: cartId, productId: id}))
            .then(() => {
                dispatch(getBasketByCustId(userId));
                dispatch(getBasketProductsByCustId(userId));
            })
            
        } else {
            if (quantity < 2) {
                removeGuestBasketProductHandler(id)
            } else {
                dispatch(decrementGuestBasketProduct(id));
            }
            
        } 
    }

    const removeGuestBasketProductHandler = (id) => {
        let basket = guestBasket.filter(product => product.product_id !== id);
        dispatch(setGuestBasket(basket));
    }

    const removeUserBasketProductHandler = (data) => {
        dispatch(deleteBasketProducts(data))
        .then(() => {
            dispatch(getBasketByCustId(userId));
            dispatch(getBasketProductsByCustId(userId));
        })   
    }

    const removeBasketProductHandler = (userId) => {
        if (!userId) {
            return removeGuestBasketProductHandler(id)
        } else {
            return removeUserBasketProductHandler({userId: userId, productId: id, cartId: cartId})
        }
    }

    
    return (
    
        <div className="basket-product" key={id} id={name}>
            <p id='product-name'>{name}</p>
            <div className='basket-product-flex'>
                <img src={image} alt={name}/>
                <div className="basket-product-elements">
                    <p id='product-price'>{price}</p>
                    <p id='product-quantity'>Quantity: {quantity}</p>
                    <button onClick={() => incrementProduct(userId, cartId, id)}>+</button>
                    <button onClick={() => removeBasketProductHandler(userId)}>Remove</button>
                    <button onClick={() => decrementProduct(userId, cartId, id)}>-</button>
                </div>
            </div>
            
        </div>

    )
}

export default BasketProducts;