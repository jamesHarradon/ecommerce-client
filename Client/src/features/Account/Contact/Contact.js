import React, { useEffect } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { addContacts, getContacts, selectContacts } from './contactSlice'
import { selectUserId } from "../../../userSlice";

const Contact = () => {

    //to do - add edit contact feature

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const contacts = useSelector(selectContacts);
    const userId = useSelector(selectUserId);

    useEffect(() => {
        dispatch(getContacts(userId))
    },[dispatch, userId])

    const handleAddContact = (data) => {
        dispatch(addContacts({userId: userId, ...data}))
        .then(() => {
            dispatch(getContacts(userId));
            navigate('/account/contact');
        })
        .catch(() => alert('There was a problem adding contact'));
    }

    const formSchema = Yup.object().shape({
        address_line1: Yup.string()
        .required('Address Line 1 is required'),
        address_line2: Yup.string(),
        town_city: Yup.string()
        .required('Town/City is required'),
        county: Yup.string()
        .required('County is required'),
        post_code: Yup.string()
        .required('Post Code is required')
        .matches(/^[a-zA-Z]{1,2}([0-9]{1,2}|[0-9][a-zA-Z])\s*[0-9][a-zA-Z]{2}$/, 'Post Code must be in correct format for UK'),
        phone: Yup.string()
        .required('Phone is required')
        .matches(/^\+?(?:\d\s?){10,12}$/, 'Phone must be in correct format for UK'),
        email: Yup.string()
        .required('Email is required')
        .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i, 'Email must be in correct format'),
        
    });

    const formOptions = {resolver: yupResolver(formSchema)};
    const { register, handleSubmit, formState:{ errors } } = useForm(formOptions);
    

    return (
        <div className='contact-container'>
            <h1>Contact Details</h1>
            {contacts && contacts.map(contact => 
                <div className="contact" key={contact.contact_id} id={contact.contact_id}>
                    <p>{contact.first_name} {contact.last_name}</p>
                    <p>{contact.address_line1}</p>
                    <p>{contact.address_line2}</p>
                    <p>{contact.town_city}</p>
                    <p>{contact.county}</p>
                    <p>{contact.post_code}</p>
                    <p>{contact.phone}</p>
                    <p>{contact.email}</p>
                </div>
            )}
            {!contacts &&
                <div className='form-container'>
                    <h2>Add Contact</h2>
                    <form onSubmit={handleSubmit(handleAddContact)}>
                        <label htmlFor="address_line1">Address Line 1:</label>
                        <input type='text' id='address_line1' name='address_line1' {...register('address_line1')} className={`form-control ${errors.address_line1 ? 'is-invalid' : ''}`}></input>
                        <div className='invalid-feedback'>{errors.address_line1?.message}</div>

                        <br></br>
                        <label htmlFor="address_line2">Address Line 2:</label>
                        <input type='text' id='address_line2' name='address_line2' {...register('address_line2')} className={`form-control ${errors.address_line2 ? 'is-invalid' : ''}`} ></input>
                        <div className='invalid-feedback'>{errors.address_line2?.message}</div>

                        <br></br>
                        <label htmlFor="town_city">Town/City:</label>
                        <input type='text' id='town_city' name='town_city' {...register('town_city')} className={`form-control ${errors.town_city ? 'is-invalid' : ''}`} ></input>
                        <div className='invalid-feedback'>{errors.town_city?.message}</div>

                        <br></br>
                        <label htmlFor="county">County:</label>
                        <input type='text' id='county' name='county' {...register('county')} className={`form-control ${errors.county ? 'is-invalid' : ''}`} ></input>
                        <div className='invalid-feedback'>{errors.county?.message}</div>

                        <br></br>
                        <label htmlFor="post_code">Post Code:</label>
                        <input type='text' id='post_code' name='post_code' {...register('post_code')} className={`form-control ${errors.post_code ? 'is-invalid' : ''}`} ></input>
                        <div className='invalid-feedback'>{errors.post_code?.message}</div>

                        <br></br>
                        <label htmlFor="phone">Phone:</label>
                        <input type='text' id='phone' name='phone' {...register('phone')} className={`form-control ${errors.phone ? 'is-invalid' : ''}`} ></input>
                        <div className='invalid-feedback'>{errors.phone?.message}</div>
                        
                        <br></br>
                        <label htmlFor="email">Email:</label>
                        <input type='email' id='email' name='email' {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} ></input>
                        <div className='invalid-feedback'>{errors.email?.message}</div>
                        
                        <br></br>
                        <button type='submit' className='submit-btn'>Add Contact</button>
                    </form>
                </div>
            
            }
        </div>
    )
}

export default Contact;