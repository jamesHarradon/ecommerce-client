import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import GoogleLogin from 'react-google-login';

import { setLoggedIn, setUserId, getNewCartId } from "../../userSlice";
import { setGuestBasketToDB, setGuestId, setGuestBasket, selectGuestId, selectGuestBasket } from "../../guestSlice";
import { getBasketByCustId } from "../../features/Basket/basketSlice";
import { getBasketProductsByCustId } from "../../features/Basket/BasketProducts/basketProductsSlice";
import { getContacts } from "../../features/Account/Contact/contactSlice";
import { getPaymentMethod } from "../../features/Account/PaymentMethods/paymentSlice";
import { getLoginDetails } from "../../features/Account/LoginDetails/loginDetailsSlice";
import { getOrders } from "../../features/Account/Orders/ordersSlice";


const Register = () => {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const guestId = useSelector(selectGuestId);
    const guestBasket = useSelector(selectGuestBasket);

    const loginFunc = (id, guestBasket, guestId) => {
        dispatch(setUserId(id))
        dispatch(setLoggedIn(true));
        dispatch(setGuestId(null));
        //account data
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
            dispatch(getNewCartId(id))
        }
        dispatch(getBasketByCustId(id))
        dispatch(getBasketProductsByCustId(id))
        //expires same time as jwt - 60mins - resets redux state to initial
        setTimeout(() => navigate('/logout'), 3600000)
    }

    const handleRegister = async (response) => {
        // for google and normal register
        let url;
        let data;
        if (response.profileObj) {
            url = 'http://localhost:4000/api/auth/google/login/success';
            const { givenName, familyName, email, googleId } = response.profileObj;
            data = { first_name: givenName, last_name: familyName, email: email, google_id: googleId};

        } else {
            url = 'http://localhost:4000/api/customer/register';
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
            } else if (res.status === 400) {
                //if user already exists in the db
                alert('You already have an account, please login to continue');
                navigate('/login');
            }
        } catch (err) {
            console.log(err);
            navigate('/error');
        }
    }

    const handleRegisterError = (response) => {
        console.log(response);
        navigate('/error');
    }
    
    const formSchema = Yup.object().shape({
        first_name: Yup.string()
        .required('First Name is required'),
        last_name: Yup.string()
        .required('Last Name is required'),
        email: Yup.string()
        .required('Email is required')
        .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i, 'Email must be in correct format'),
        password: Yup.string()
        .required('Password is required')
        .min(7, 'Password length at least 7 characters')
        .max(20, 'Password length no more than 20 characters')
        .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])/, 'Password must have at least one lower case letter, one uppercase letter and one number'),
        confirmPassword: Yup.string()
        .required('Confirm password is required')
        .oneOf([Yup.ref('password')], 'Passwords must match'),
    });

    const formOptions = {resolver: yupResolver(formSchema)};
    const { register, handleSubmit, formState:{ errors } } = useForm(formOptions);

    return (
        <div className='form-container'>
            <h1>Register</h1>
            <form className='register-form' onSubmit={handleSubmit(handleRegister)}>
                <div className="register-form-fields">
                    
                    <input type='text' id='first_name' name='first_name' placeholder="First Name" {...register('first_name')} className={`form-control ${errors.first_name ? 'is-invalid' : ''}`}></input>
                    <div className='invalid-feedback'>{errors.first_name?.message}</div>

                    <input type='text' id='last_name' name='last_name' placeholder="Last Name" {...register('last_name')} className={`form-control ${errors.last_name ? 'is-invalid' : ''}`} ></input>
                    <div className='invalid-feedback'>{errors.last_name?.message}</div>
                    
                    <input type='email' id='email' name='email' placeholder="Email" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} ></input>
                    <div className='invalid-feedback'>{errors.email?.message}</div>
                    
                    <input type='password' id='password' name='password' placeholder="Password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`}></input>
                    <div className='invalid-feedback'>{errors.password?.message}</div>
                    
                    <input type='password' id='confirmPassword' name='confirmPassword' placeholder="Confirm Password" {...register('confirmPassword')} className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}></input>
                    <div className='invalid-feedback'>{errors.confirmPassword?.message}</div>
                </div>
                <button type='submit' className='btn'>Register</button>    
            </form>
            <div>
                <GoogleLogin
                    clientId={process.env.REACT_APP_CLIENT_ID}
                    buttonText='Register with Google'
                    onSuccess={handleRegister}
                    onFailure={handleRegisterError}
                    cookiePolicy={'single_host_origin'}
                />
            </div>

            
        </div>
    )
}

export default Register;