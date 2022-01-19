import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { deleteBasketProducts, getBasketProductsByCustId, incrementBasketProduct, selectBasketProducts } from './basketProductsSlice'
import { getBasketByCustId } from "./basketSlice";
import { setGuestBasket } from "../../guestSlice";


const BasketProducts = ({id, name, image, price, quantity, userId, guestId, guestBasket, cartId }) => {

    const dispatch = useDispatch();
    const basketProducts = useSelector(selectBasketProducts);

    let basketToUse = userId ? basketProducts : guestBasket;

    useEffect(() => {
        if (guestId) localStorage.setItem(guestId, JSON.stringify(guestBasket));
    },[guestBasket, guestId]);

    const incrementProduct = (userId, cartId, id) => {
        
        userId ? dispatch(incrementBasketProduct({userId: userId, cartId: cartId, productId: id})) : dispatch(setGuestBasket()); 
    }
        

    const decrementProduct = (userId, id, array) => {

        let basket = array.map(product => {
            if (product.product_id === id && product.quantity > 1) {
                return {...product, quanity: product.quantity - 1} 
            } else if (product.product_id === id && !product.quantity > 1) {
                return console.log('item removed');
                //return removeGuestBasketProductHandler(id);
            }else {
                return {...product};
            }
        });
        console.log(basket);
        //userId ? dispatch(selectBasketProducts(basket)) : dispatch(setGuestBasket(basket));   
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
            <img src={image} alt={name}/>
            <p id='product-name'>{name}</p>
            <p id='product-price'>{price}</p>
            <p id='product-quantity'>{quantity}</p>
            <button onClick={() => incrementProduct(userId, id, basketToUse)}>+</button>
            <button onClick={removeBasketProductHandler}>X</button>
            <button onClick={() => decrementProduct(userId, id, basketToUse)}>-</button>
            
        </div>

    )
}

export default BasketProducts;