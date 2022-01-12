import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPaymentMethod, selectPaymentMethod } from "./paymentSlice";

const PaymentMethods = ({userId}) => {

    const dispatch = useDispatch();
    const paymentMethod = useSelector(selectPaymentMethod);

    useEffect(() => {
        dispatch(getPaymentMethod(userId))
    },[dispatch, userId])

    return (
        <div>
            <h1>Payment Methods</h1>
            {paymentMethod && paymentMethod.map(card => 
                <div key={card.id}>
                   <p>{card.card_type}</p> 
                   <p>{card.card_number}</p> 
                   <p>{card.expiry_date.split('').splice(0, 7)}</p> 
                   <p>{card.name_on_card}</p>
                   <p>{card.security_code}</p>  
                </div>
            )}
        </div>
    )
}

export default PaymentMethods;