import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../userSlice";



// add logout fetch to this to get rid of token
const Logout = ({timeoutId}) => {
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            const response = await fetch('/api/auth/logout', {method: 'POST', credentials: 'include'});
            if(response.ok) {
                
                //clears timeout for logout after 1hr
                window.clearTimeout(timeoutId);
                // the below 'logout' action is set in userSlice but defined in store.
                // when dispatched, it resets all redux state to initial state
                dispatch(logout()); 
                //removes redux state in local storage to stop rehydrate
                localStorage.removeItem('persist:root');
                
            } 

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        handleLogout();
    });

    return (
        <div className='logout'>
            <h1>
                You have successfully logged out
            </h1>
        </div>
    )
}

export default Logout;