import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { addPaymentMethod, getPaymentMethod, selectPaymentMethod } from "./paymentSlice";
import { DateTime } from 'luxon';
import { selectUserId } from "../../../userSlice";

const PaymentMethods = () => {

    const [ addCard, setAddCard ] = useState(false);
    const dispatch = useDispatch();
    const card = useSelector(selectPaymentMethod);
    const userId = useSelector(selectUserId);
    const dt = DateTime.now();
    const dtFormatted = dt.toString().split('').splice(0, 7).join('')

    useEffect(() => {
        dispatch(getPaymentMethod(userId))
    },[dispatch, userId, addCard]);

    const addCardHandler = async (data) => {
        dispatch(addPaymentMethod({userId: userId, ...data}))
        .then(() => {
            setAddCard(false);
            dispatch(getPaymentMethod(userId))
        })
        .catch(() => alert('There was a problem adding payment data'))   
    }

    const formSchema = Yup.object().shape({
        card_type: Yup.string()
        .required('Card Type is required'),
        card_number: Yup.string()
        .length(16, 'Card Number must be 16 digits')
        .required('Card Number is required'),
        expiry_date: Yup.string()
        .required('Expiry Date is required'),
        name_on_card: Yup.string()
        .required('Name on Card is required')
    });

    const formOptions = {resolver: yupResolver(formSchema)};
    const { register, handleSubmit, formState:{ errors } } = useForm(formOptions);

    return (
        <div className='payment-method-container'>
            <h1>Payment Methods</h1>
            {card && 
                <div key={card.id}>
                <p>{card.card_type}</p> 
                <p>{card.card_number}</p> 
                <p>{card.expiry_date}</p> 
                <p>{card.name_on_card}</p>
            </div>
            }
            
            
            {!card && !addCard && <button onClick={() => setAddCard(true)}>Add Card</button>}
            {addCard &&
            
            <div className='form-container'>
                <form onSubmit={handleSubmit(addCardHandler)}>
                    <label htmlFor="card_type">Card Type:</label>
                    <input type='text' id='card_type' name='card_type' {...register('card_type')} className={`form-control ${errors.card_type ? 'is-invalid' : ''}`}></input>
                    <div className='invalid-feedback'>{errors.card_type?.message}</div>
                    
                    <br></br>
                    <label htmlFor="card_number">Card Number:</label>
                    <input type='text' id='card_number' name='card_number' {...register('card_number')} className={`form-control ${errors.card_number ? 'is-invalid' : ''}`}></input>
                    <div className='invalid-feedback'>{errors.card_number?.message}</div>

                    <br></br>
                    <label htmlFor="expiry_date">Expiry Date:</label>
                    <input type='month' min={dtFormatted} id='expiry_date' name='expiry_date' {...register('expiry_date')} className={`form-control ${errors.expiry_date ? 'is-invalid' : ''}`}></input>
                    <div className='invalid-feedback'>{errors.expiry_date?.message}</div>
                    
                    <br></br>
                    <label htmlFor="name_on_card">Name on Card:</label>
                    <input type='text' id='name_on_card' name='name_on_card' {...register('name_on_card')} className={`form-control ${errors.name_on_card ? 'is-invalid' : ''}`}></input>
                    <div className='invalid-feedback'>{errors.name_on_card?.message}</div>
                    
                    <br></br>
                    <button type='submit' className='add-card-btn'>Add Card</button> 
                </form>
            </div>
            }

        </div>
    )
}

export default PaymentMethods;