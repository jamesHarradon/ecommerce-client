import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBasketProductsByCustId, selectBasketProducts} from './BasketProducts/basketProductsSlice'
import { getBasketByCustId, selectBasket } from "./basketSlice";
import BasketProducts from './BasketProducts/BasketProducts'
import { selectContacts } from "../Account/Contact/contactSlice";
import { selectIsLoggedIn, selectUserId } from "../../userSlice";
import { selectGuestBasket, selectGuestId } from "../../guestSlice";


const Basket = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const basket = useSelector(selectBasket);
    const basketProducts = useSelector(selectBasketProducts);
    const contacts = useSelector(selectContacts);
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const userId = useSelector(selectUserId);
    const guestId = useSelector(selectGuestId);
    const guestBasket = useSelector(selectGuestBasket);

    let email = contacts && isLoggedIn ? contacts[0].email : null;
    const bodyToSend = { products: basketProducts, email: email}

    let basketToUse = guestId ? guestBasket : basketProducts;
    
    let guestTotal;
    if (guestBasket.length > 0) {
        guestTotal = guestBasket.map(product => product.quantity * parseFloat(product.price_per_unit)).reduce((cont, champ) => cont + champ);
    }
    
    useEffect(() => {
        if (userId) {
            dispatch(getBasketProductsByCustId(userId));
            dispatch(getBasketByCustId(userId));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const checkoutHandler = async (data) => {
        if (!contacts || contacts.length < 1) {
            alert('Please complete contact details before checking out.');
            return navigate('/account/contact');
        }
        try {
            const response = await fetch(`/api/checkout/${userId}`, {
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
            <div className="basket-flex"> 
                
                { basketProducts.length > 0 && 
                    <h3 key='total'>Total: £{basket.total_cost}</h3>
                }
                { guestBasket.length > 0 && 
                    <h3>Total: £{guestTotal}</h3>
                }
                {userId && basketToUse.length > 0 &&
                    <button className='checkout-btn' onClick={() => checkoutHandler(bodyToSend)}>Checkout</button>
                }
                {!userId && guestBasket.length > 0 &&
                    <p>Please Login/Register to Checkout</p>
                }
            </div>
            <div>
                {basketToUse.length > 0 && 
                    basketToUse.map(product => <BasketProducts key={product.product_id} id={product.product_id} name={product.product_name} price={product.price_per_unit} quantity={product.quantity} image={product.image} description={product.description}  />
                )}
                {basketToUse.length < 1 && 
                    <h2>Your Basket is Empty</h2>
                }
            </div>
        </div>
    )
}

export default Basket;




