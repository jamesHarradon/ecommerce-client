import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { getLoginDetails, selectLoginDetails } from "./loginDetailsSlice";
import { useNavigate } from "react-router-dom";

const LoginDetails = ({userId}) => {
    
    const [ changePassword, setChangePassword ] = useState(false)

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loginDetails = useSelector(selectLoginDetails);

    useEffect(() => {
        dispatch(getLoginDetails(userId))
    },[dispatch, userId, changePassword])

    const changePasswordHandler = async (data) => {
        try {
            const response = await fetch(`http://localhost:4000/api/auth/change-password/${userId}`, {
                method: 'PUT', 
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            console.log(response)
            if(response.ok) {
                alert('Password Changed Successfully');
                setChangePassword(false);
            } else {
                alert('There was a problem');
            }
        } catch (err) {
            navigate('/error')
        }
    }

    const formSchema = Yup.object().shape({
        current_password: Yup.string()
        .required('Password is required')
        .min(7, 'Password length at least 7 characters')
        .max(20, 'Password length no more than 20 characters')
        .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])/, 'Password must have at least one lower case letter, one uppercase letter and one number'),
        confirm_current_password: Yup.string()
        .required('Confirm password is required')
        .oneOf([Yup.ref('current_password')], 'Passwords must match'),
        new_password: Yup.string()
        .required('Password is required')
        .min(7, 'Password length at least 7 characters')
        .max(20, 'Password length no more than 20 characters')
        .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])/, 'Password must have at least one lower case letter, one uppercase letter and one number'),
        confirm_new_password: Yup.string()
        .required('Confirm password is required')
        .oneOf([Yup.ref('new_password')], 'Passwords must match'),
    });

    const formOptions = {resolver: yupResolver(formSchema)};
    const { register, handleSubmit, formState:{ errors } } = useForm(formOptions);

    return (
        <div className='form-container'>
            <h1>Login Details</h1>
            {loginDetails && loginDetails.map(detail => 
                <div key={detail.contact_id}>
                    <p>Email: {detail.email}</p>
                </div>
            )}
            {!changePassword &&
            <button onClick={() => setChangePassword(true)}>Change Password</button>
            }
            {changePassword && 
            <div className='change-password-form'>
                <form onSubmit={handleSubmit(changePasswordHandler)}>
                    <label htmlFor="current_password">Current Password:</label>
                    <input type='password' id='current_password' name='current_password' {...register('current_password')} className={`form-control ${errors.current_password ? 'is-invalid' : ''}`}></input>
                    <div className='invalid-feedback'>{errors.current_password?.message}</div>
                    
                    <label htmlFor="confirm_current_password">Confirm Current Password:</label>
                    <input type='password' id='confirm_current_password' name='confirm_current_password' {...register('confirm_current_password')} className={`form-control ${errors.confirm_current_password ? 'is-invalid' : ''}`}></input>
                    <div className='invalid-feedback'>{errors.confirm_current_password?.message}</div>

                    <br></br>
                    <label htmlFor="new_password">New Password:</label>
                    <input type='password' id='new_password' name='new_password' {...register('new_password')} className={`form-control ${errors.new_password ? 'is-invalid' : ''}`}></input>
                    <div className='invalid-feedback'>{errors.new_password?.message}</div>
                    
                    <label htmlFor="confirm_new_password">Confirm New Password:</label>
                    <input type='password' id='confirm_new_password' name='confirm_new_password' {...register('confirm_new_password')} className={`form-control ${errors.confirm_new_password ? 'is-invalid' : ''}`}></input>
                    <div className='invalid-feedback'>{errors.confirm_new_password?.message}</div>
                    
                    <br></br>
                    <button type='submit' className='change-password-btn'>Change Password</button> 
                </form>
            </div>
            }
            
        </div>
    )
}

export default LoginDetails;