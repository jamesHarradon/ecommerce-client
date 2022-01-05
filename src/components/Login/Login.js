import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const Login = ({setLoggedIn}) => {

    const navigate = useNavigate();

    const handleLogin = async (data) => {
        try {
            const response = await fetch('http://localhost:4000/auth/login', {
                method: 'POST', 
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                setLoggedIn(true);
                //expires same time as jwt - 30mins
                setTimeout(() => setLoggedIn(false), 1800000)
                navigate('/');
            } else if (response.status === 403) {
                alert('Login Unsuccessful. Please Try Again.')
            }
        } catch (err) {
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
            <p>Please login to continue</p>
            <form onSubmit={handleSubmit(handleLogin)}>
                <label htmlFor="email">Email:</label>
                <input type='email' id='email' name='email' {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} ></input>
                <div className='invalid-feedback'>{errors.email?.message}</div>
                
                <br></br>
                <label htmlFor="password">Password:</label>
                <input type='password' id='password' name='password' {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`}></input>
                <div className='invalid-feedback'>{errors.password?.message}</div>

                <br></br>
                <button type='submit' className='login-btn'>Login</button>

            </form>

            <a href='http://localhost:4000/auth/google'>Login With Google</a>
        </div>
    )
}

export default Login;