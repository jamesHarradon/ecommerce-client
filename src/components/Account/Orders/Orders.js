import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Orders = () => {

    const [orders, setOrders] = useState();

    const navigate = useNavigate();

    const getOrders = async (data) => {
        try {
            const response = await fetch('http://localhost:4000/orders/history');
            const json = response.json();
            if(json) {
                setOrders(json)
            } else {
                setOrders(null);
            }
        } catch (err) {
            navigate('/error', { state: { err: err.message }})
        }
    }

    useEffect(() => {
        getOrders()
    },[])

    return (
        <div>
            <h1>Orders</h1>
            
        </div>
    )
}

export default Orders;