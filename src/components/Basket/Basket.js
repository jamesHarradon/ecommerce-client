import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBasketProductsByCustId, selectBasketProducts} from './basketProductsSlice'
import { getBasketByCustId, selectBasket } from "./basketSlice";
import BasketProducts from './BasketProducts';
import { selectContacts } from "../Account/Contact/contactSlice";


const Basket = ({userId, guestId, guestBasket }) => {

    
    const dispatch = useDispatch();

    const basket = useSelector(selectBasket);
    const basketProducts = useSelector(selectBasketProducts);
    const contacts = useSelector(selectContacts);
    const email = contacts[0].email;
    const bodyToSend = { products: basketProducts, email: email}

    let basketToUse = guestId ? guestBasket : basketProducts;
    
    let guestTotal;
    if (guestBasket.length > 0) {
        guestTotal = guestBasket.map(product => product.price_per_unit.split('').splice(1).join('')).reduce((cont, champ) => parseFloat(cont) + parseFloat(champ));
    }
    
    useEffect(() => {
        if (userId) {
            dispatch(getBasketProductsByCustId(userId));
            dispatch(getBasketByCustId(userId));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const checkoutHandler = async (data) => {
        try {
            const response = await fetch(`http://localhost:4000/api/checkout/${userId}`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                const jsonResponse = await response.json();
                window.location = jsonResponse.url;
            } else {
                throw new Error('There was a problem')
            };

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <h1>Basket</h1>
            {userId && basketToUse.length > 0 &&
                <button onClick={() => checkoutHandler(bodyToSend)}>Checkout</button>
            }
            {!userId &&
                <p>Please Login/Register to Checkout</p>
            }
        
            { basketProducts.length > 0 && <h3 key='total'>Total: {basket.total_cost}</h3>}
            { guestBasket.length > 0 && <h3>Total: £{guestTotal}</h3>}
            <div>
                {basketToUse.length > 0 && basketToUse.map(product => <BasketProducts key={product.product_id} id={product.product_id} name={product.product_name} image={product.image} price={product.price_per_unit} userId={userId} guestId={guestId} guestBasket={guestBasket} />
                )}
                {basketToUse.length < 1 && <h2>Your Basket is Empty</h2>}
            </div>
        </div>
    )
}

export default Basket;




