import React from "react";
import { Link } from 'react-router-dom';

const Product = ({id, name, image, price, userId}) => {

    const addToBasketHandler = async() => {
        try {
            
            const response = await fetch(`http://localhost:4000/cart/${userId}`, {credentials: 'include'});
            
            const cart = await response.json();
            const cartId = cart.id;
            await fetch(`http://localhost:4000/cart/products/add/${userId}/${cartId}/${id}`, {method: 'POST', credentials: 'include'});
        
        } catch (err) {
            console.log(err)
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