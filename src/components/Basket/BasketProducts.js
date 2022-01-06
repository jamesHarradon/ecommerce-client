import React, { useEffect } from "react";

const BasketProducts = ({id, name, image, price, userId}) => {

    const removeProductHandler = async () => {
        try {
            const response = await fetch(`http://localhost:4000/cart/${userId}`, {credentials: 'include'});
            const cart = await response.json();
            const cartId = cart.id;
            await fetch(`http://localhost:4000/cart/products/delete/${userId}/${cartId}/${id}`, {method: 'DELETE', credentials: 'include'})
        } catch (err) {
            console.log(err)
        }
    }

    
    return (
    
        <div className="basket-product" key={id} id={name}>
            <p>{name}</p>
            <img src={image} alt={name}/>
            <p>{price}</p>
            <button onClick={removeProductHandler}>X</button>
        </div>

    )
}

export default BasketProducts;