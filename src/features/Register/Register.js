import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';



const Register = ({setLoggedIn}) => {
    
    const navigate = useNavigate();

    const handleRegistration = async (data) => {
        try {
            const response = await fetch('http://localhost:4000/customer/register', { 
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
                navigate('/products');
            } else if(response.status === 400) {
                //if user already exists in the db
                alert('You already have an account, please login to continue');
                navigate('/login');
               
            }
        } catch (err) {
            navigate('/error');
        }
    }

    const handleGoogleRegister = async () => {
        try {
            await fetch('http://localhost:4000/auth/google');
        } catch (err) {
            console.log(err);
        }
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
        <div className='register'>
            <h1>Register</h1>
            <form onSubmit={handleSubmit(handleRegistration)}>
                <label htmlFor="first_name">First Name:</label>
                <input type='text' id='first_name' name='first_name' {...register('first_name')} className={`form-control ${errors.first_name ? 'is-invalid' : ''}`}></input>
                <div className='invalid-feedback'>{errors.first_name?.message}</div>

                <br></br>
                <label htmlFor="last_name">Last Name:</label>
                <input type='text' id='last_name' name='last_name' {...register('last_name')} className={`form-control ${errors.last_name ? 'is-invalid' : ''}`} ></input>
                <div className='invalid-feedback'>{errors.last_name?.message}</div>
                
                <br></br>
                <label htmlFor="email">Email:</label>
                <input type='email' id='email' name='email' {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} ></input>
                <div className='invalid-feedback'>{errors.email?.message}</div>
                
                <br></br>
                <label htmlFor="password">Password:</label>
                <input type='password' id='password' name='password' {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`}></input>
                <div className='invalid-feedback'>{errors.password?.message}</div>
                
                <br></br>
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input type='password' id='confirmPassword' name='confirmPassword' {...register('confirmPassword')} className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}></input>
                <div className='invalid-feedback'>{errors.confirmPassword?.message}</div>
                
                <br></br>
                <button type='submit' className='register-btn'>Register</button>
                
            </form>

            <button onClick={handleGoogleRegister}>Register With Google</button>
        </div>
    )
}

export default Register;