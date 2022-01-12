import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserId, logout } from "../../userSlice";



// add logout fetch to this to get rid of token
const Logout = ({guestId}) => {
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/auth/logout', {method: 'POST', credentials: 'include'});
            if(response.ok) {
                localStorage.removeItem(guestId);
                dispatch(logout()); 
                // the above 'logout' action is set in userSlice but defined in store.
                // when dispatched, it resets all redux state to initial state
                
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