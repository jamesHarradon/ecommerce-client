import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getContacts, selectContacts } from './contactSlice'

const Contact = ({userId}) => {

    const dispatch = useDispatch();
    const contacts = useSelector(selectContacts);

    useEffect(() => {
        dispatch(getContacts(userId))
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <div>
            <h1>Contact</h1>
            {contacts.length > 0 && contacts.map(contact => 
                <div className="contact" key={contact.id} id={contact.id}>
                    <p>{contact.first_name} {contact.last_name}</p>
                    <p>{contact.address_line1}</p>
                    <p>{contact.address_line2}</p>
                    <p>{contact.town}</p>
                    <p>{contact.city}</p>
                    <p>{contact.county}</p>
                    <p>{contact.post_code}</p>
                    <p>{contact.phone}</p>
                    <p>{contact.email}</p>
                </div>
            )}
        </div>
    )
}

export default Contact;