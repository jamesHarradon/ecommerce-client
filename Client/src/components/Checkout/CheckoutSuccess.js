import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getNewCartId, selectCartId, selectUserId } from "../../userSlice";
import { selectContacts } from "../../features/Account/Contact/contactSlice";
import { getOrders } from '../../features/Account/Orders/ordersSlice'
import { getBasketProductsByCustId } from "../../features/Basket/BasketProducts/basketProductsSlice";
import { getBasketByCustId } from "../../features/Basket/basketSlice";

const CheckoutSuccess = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const contactData = useSelector(selectContacts);
    const userId = useSelector(selectUserId);
    const cartId = useSelector(selectCartId);
    const firstName = contactData[0].first_name;

    const onClickHandler = async () => {
        try {
            //creates order from cart and deletes cart from db
            const response = await fetch(`/api/orders/new/${userId}/${cartId}`, {
                method: 'POST', 
                credentials: 'include'
            });
            if (response.ok) {
                // updates orders
                dispatch(getOrders(userId));
                // creates new empty basket in db and updates state
                dispatch(getNewCartId(userId));
                dispatch(getBasketByCustId(userId));
                dispatch(getBasketProductsByCustId(userId));
                navigate('/account/orders');
            } else {
                throw new Error('System Error');
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div>
            <h1>Payment Successful</h1>
            <p>Thank you for your purchase, {firstName}</p>
            <button onClick={onClickHandler}>Order Summary</button>
        </div>

    )
}

export default CheckoutSuccess;