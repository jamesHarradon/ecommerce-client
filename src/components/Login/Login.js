import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { setUserId, setLoggedIn, logout, setCartId } from "../../userSlice";
import { getBasketByCustId } from "../Basket/basketSlice";
import { getBasketProductsByCustId, selectBasketProducts } from "../Basket/basketProductsSlice";
import { setGuestId, setGuestBasketToDB, setGuestBasket } from "../../guestSlice";
import { getContacts } from "../Account/Contact/contactSlice";
import { getLoginDetails } from "../Account/LoginDetails/loginDetailsSlice";
import { getOrders } from "../Account/Orders/ordersSlice";
import { getPaymentMethod } from "../Account/PaymentMethods/paymentSlice";



const Login = ({guestId, guestBasket}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const basketProducts = useSelector(selectBasketProducts)
    
    const guestBasketToDB = async (userId, guestBasket) => {
        try {
            let cartId;
            const response = await fetch(`http://localhost:4000/api/cart/${userId}`, {credentials: 'include'});
            const existingCart = await response.json();
            
            if (existingCart) {
                cartId = existingCart.id;
                // deletes products in current cart in db
                await fetch(`http://localhost:4000/api/cart/products/deleteAll/${userId}/${cartId}`, {method: 'DELETE', credentials: 'include'});    
            } 
            if (!existingCart) {
                //creates new carts and gets cartId
                const newCart = await fetch(`http://localhost:4000/api/cart/new/${userId}`, {method: 'POST', credentials: 'include'});
                console.log(newCart);
                cartId = newCart.id 
            };
            //adds product to new cart in db
            guestBasket.forEach(async (product) => {
                await fetch(`http://localhost:4000/api/cart/products/add/${userId}/${cartId}/${product.product_id}`, {method: 'POST', credentials: 'include'});
            });
            
        } catch (err) {
            console.log(err);
        }
    } 

    
    const loginFunc = (id, guestBasket, basketProducts) => {
        dispatch(setUserId(id))
        dispatch(setLoggedIn(true));
        dispatch(setCartId(id));
        //account data
        dispatch(getContacts(id));
        dispatch(getLoginDetails(id));
        dispatch(getOrders(id));
        dispatch(getPaymentMethod(id));
        if (guestBasket.length > 0) guestBasketToDB(id, guestBasket, basketProducts)
        localStorage.removeItem(guestId);
        dispatch(setGuestId(null));
        dispatch(setGuestBasket([]));
        dispatch(getBasketByCustId(id));
        dispatch(getBasketProductsByCustId(id));
        //expires same time as jwt - 30mins - resets redux state to initial
        setTimeout(() => navigate('/logout'), 1800000);
    }

    const handleLogin = async (data) => {
        try {
            const response = await fetch('http://localhost:4000/api/auth/login', {
                method: 'POST', 
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const id = await response.json()
                loginFunc(id, guestBasket, basketProducts);
                navigate('/');
            } else if (response.status === 403) {
                alert('Login Unsuccessful. Please Try Again.')
            }
        } catch (err) {
            console.log(err);
            navigate('/error');
        }
    }

    // const handleGoogleLogin = async () => {
    //     try {
    //        await fetch('http://localhost:4000/auth/google');
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    const formSchema = Yup.object().shape({
        email: Yup.string()
        .required('Email is required')
        .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i, 'Email must be in correct format'),
        password: Yup.string()
        .required('Password is required')
        .min(7, 'Password length at least 7 characters')
        .max(20, 'Password length no more than 20 characters')
        .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])/, 'Password must have at least one lower case letter, one uppercase letter and one number')
    });

    const formOptions = {resolver: yupResolver(formSchema)};
    const { register, handleSubmit, formState:{ errors } } = useForm(formOptions);

    return (
        <div className='login-form'>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(handleLogin)}>
                <input type='email' id='email' name='email' placeholder="Email" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} ></input>
                <div className='invalid-feedback'>{errors.email?.message}</div>
                
                <br></br>
                <input type='password' id='password' name='password' placeholder="Password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`}></input>
                <div className='invalid-feedback'>{errors.password?.message}</div>

                <br></br>
                <button type='submit' className='login-btn'>Login</button>

            </form>

            <a className="link" href='http://localhost:4000/auth/google'>Login With Google</a>
        </div>
    )
}

export default Login;