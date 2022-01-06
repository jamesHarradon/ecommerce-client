import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserId } from "../../userSlice";

// add logout fetch to this to get rid of token
const Logout = () => {
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:4000/auth/logout', {method: 'POST', credentials: 'include'});
            if(response.ok) {
                dispatch(setUserId(null));
            } 

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        handleLogout();
    });

    return (
        <div>
            <h1>
                You have successfully logged out
            </h1>
        </div>
    )
}

export default Logout;