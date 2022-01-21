import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import GoogleLogin from 'react-google-login';

import { setUserId, setLoggedIn, setCartId } from "../../userSlice";
import { getBasketByCustId } from "../../features/Basket/basketSlice";
import { getBasketProductsByCustId } from "../../features/Basket/BasketProducts/basketProductsSlice";
import { setGuestId, setGuestBasketToDB, setGuestBasket, selectGuestId, selectGuestBasket } from "../../guestSlice";
import { getContacts } from "../../features/Account/Contact/contactSlice";
import { getLoginDetails } from "../../features/Account/LoginDetails/loginDetailsSlice";
import { getOrders } from "../../features/Account/Orders/ordersSlice";
import { getPaymentMethod } from "../../features/Account/PaymentMethods/paymentSlice";



const Login = () => {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const guestId = useSelector(selectGuestId);
    const guestBasket = useSelector(selectGuestBasket);
    
    
    const loginFunc = (id, guestBasket, guestId) => {
        dispatch(setUserId(id))
        dispatch(setLoggedIn(true));
        dispatch(setCartId(id));
        dispatch(getContacts(id));
        dispatch(getLoginDetails(id));
        dispatch(getOrders(id));
        dispatch(getPaymentMethod(id));
        if (guestBasket.length > 0) {
            dispatch(setGuestBasketToDB({userId: id, guestBasket: guestBasket}))
                .then(() => {
                    dispatch(setGuestId(null)); 
                    dispatch(setGuestBasket([]));
                    localStorage.removeItem(guestId);
                } )
        } else {
            dispatch(setGuestId(null)); 
            localStorage.removeItem(guestId);
        }
        dispatch(getBasketByCustId(id));
        dispatch(getBasketProductsByCustId(id));
        //expires same time as jwt - 60mins - resets redux state to initial
        setTimeout(() => navigate('/logout'), 3600000);
    }

    const handleLogin = async (response) => {
        // for google and normal login
        let url;
        let data;
        if (response.profileObj) {
            url = '/api/auth/google/login/success';
            const { givenName, familyName, email, googleId } = response.profileObj;
            data = { first_name: givenName, last_name: familyName, email: email, google_id: googleId};

        } else {
            url = '/api/auth/login';
            data = response;
        }
        try {
            const res = await fetch(url, {
                method: 'POST', 
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                const id = await res.json()
                loginFunc(id, guestBasket, guestId);
                navigate('/');
            } else if (res.status === 401) {
                alert('Login Unsuccessful. Please Try Again.')
            }
        } catch (err) {
            console.log(err);
            navigate('/error');
        }
    }

    const handleLoginError = (response) => {
        console.log(response);
        navigate('/error');
    }

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
        <div className='form-container'>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(handleLogin)}>
                <input type='email' id='email' name='email' placeholder="Email" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} ></input>
                <div className='invalid-feedback'>{errors.email?.message}</div>
                
                <input type='password' id='password' name='password' placeholder="Password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`}></input>
                <div className='invalid-feedback'>{errors.password?.message}</div>

                <button type='submit' className='login-btn'>Login</button>

            </form>
            <div>
                <GoogleLogin
                    clientId={process.env.REACT_APP_CLIENT_ID}
                    buttonText='Login with Google'
                    onSuccess={handleLogin}
                    onFailure={handleLoginError}
                    cookiePolicy={'single_host_origin'}
                />
            </div>
        </div>
    )
}

export default Login;