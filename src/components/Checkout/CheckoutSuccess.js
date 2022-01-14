import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getNewCartId } from "../../userSlice";
import { getOrders } from "../Account/Orders/ordersSlice";
import { getBasketProductsByCustId } from "../Basket/basketProductsSlice";
import { getBasketByCustId } from "../Basket/basketSlice";

const CheckoutSuccess = ({userId, cartId}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const onClickHandler = async () => {
        try {
            //creates order from cart and deletes cart from db
            const response = await fetch(`http://localhost:4000/api/orders/new/${userId}/${cartId}`, {
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
            <button onClick={onClickHandler}>Order Summary</button>
        </div>

    )
}

export default CheckoutSuccess;