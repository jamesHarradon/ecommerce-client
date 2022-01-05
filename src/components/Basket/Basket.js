import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Basket = ({userId}) => {

    const [ basket, setBasket ] = useState([]);

    const navigate = useNavigate();

    const getBasket = async (data) => {
    
        try {
            const cartResponse = await fetch(`http://localhost:4000/cart/${userId}`, {credentials: 'include'});
            if(cartResponse.ok) {
                const cart = await cartResponse.json();
                const cartId = cart.id;
                const response = await fetch(`http://localhost:4000/cart/products/${userId}/${cartId}`, {credentials: 'include'});
                if(response.ok) {
                    const json = await response.json();
                    return setBasket(json);
                } else {
                    //create new cart for customer
                    return setBasket([]);
                }
            }
            
        } catch (err) {
            //navigate('/error', { state: {err: err.message}})
            console.log(err);
        }
    }

    useEffect(() => {
        getBasket();
    },[])


    return (
        <div>
            <h1>Basket</h1>
            {basket.map(product => 
                <div className="basket-product" key={product.product_name} id={product.product_name}>
                    <p>{product.product_name}</p>
                    <img src={product.image} alt={product.product_name}/>
                    <p>{product.price_per_unit}</p>
                </div>
            )}
        </div>
    )
}

export default Basket;




