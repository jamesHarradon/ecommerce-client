import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getOrders, selectOrders } from "./ordersSlice";

const Orders = ({ userId }) => {

    const dispatch = useDispatch();
    const orders = useSelector(selectOrders);

    useEffect(() => {
        dispatch(getOrders(userId))
    },[dispatch, userId])

    return (
        <div className='orders'>
            <h1>Orders</h1>
            {!orders &&
                <p>No Orders to Display.</p>
            }
            {orders && orders.map(order => 
                <div className='order' key={order.id} id={order.id}>
                    <p>Order ID: {order.id}</p>
                    <p>Order Date/Time: {order.order_date.split('').splice(0, 19)} </p>
                    <p>Total Cost: {order.total_cost} </p>
                </div>
            )}
            
        </div>
    )
}

export default Orders;