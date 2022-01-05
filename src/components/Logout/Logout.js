import React, { useEffect } from "react";

// add logout fetch to this to get rid of token
const Logout = ({setLoggedIn, setUserId}) => {

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:4000/auth/logout', {method: 'POST', credentials: 'include'});
            if(response.ok) {
                setLoggedIn(false);
                setUserId('')
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