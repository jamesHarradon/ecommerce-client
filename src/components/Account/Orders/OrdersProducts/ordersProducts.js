import React, { useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrdersProducts, selectOrdersProducts } from "./ordersProductsSlice";
import { selectOrders } from "../ordersSlice";
import { selectUserId } from "../../../../userSlice";

const OrdersProducts = () => {

    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    const userId = useSelector(selectUserId);
    const orders = useSelector(selectOrders);
    const order = orders.filter(order => order.id === parseInt(params.id));
    const orderTotal = order[0].total_cost;
    const ordersProducts = useSelector(selectOrdersProducts);

    

    useEffect(() => {
        dispatch(getOrdersProducts({userId: userId, orderId: parseInt(params.id)}))
    },[params.id, dispatch, userId]);
    
    return (
        <div>
            <h1>Order No. {params.id}</h1>
            {ordersProducts.length > 0 && ordersProducts.map(product => (
                <div className='orders-product' key={product.product_id}>
                    <p>{product.product_name}</p>
                    <div className='orders-product-flex'>
                    <img src={product.image} alt={product.product_name}></img>
                        <div className='orders-product-numbers'>
                            <p>Cost: {product.price_per_unit}</p>
                            <p>Quantity: {product.quantity}</p>
                            <p>Total: {product.total_cost}</p>
                        </div>
                    </div>  
                </div>
            ))}
            <h3><b>Total For Order: {orderTotal}</b></h3>
            <button onClick={() => navigate('/account/orders')}>All Orders</button>
        </div>


    )
}

export default OrdersProducts;