import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoginDetails, selectLoginDetails } from "./loginDetailsSlice";

const LoginDetails = ({userId}) => {
    
    const dispatch = useDispatch();
    const loginDetails = useSelector(selectLoginDetails);

    useEffect(() => {
        dispatch(getLoginDetails(userId))
    },[dispatch, userId])

    return (
        <div>
            <h1>Login Details</h1>
            {loginDetails && loginDetails.map(detail => 
                <div key={detail.contact_id}>
                    <p>Login Email: {detail.email}</p>
                </div>
            )}
            <button>Change Password</button>
        </div>
    )
}

export default LoginDetails;