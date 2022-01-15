import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, selectProducts } from "./productsSlice";
import { setGuestBasket } from "../../guestSlice";


import Product from "../Product/Product";

const Products = ({ userId, guestId, guestBasket }) => {

    const dispatch = useDispatch();
    const products = useSelector(selectProducts);
    

    useEffect(() => {
        dispatch(getProducts());
    },[dispatch]);

    useEffect(() => {
        if(guestId) dispatch(setGuestBasket(JSON.parse(localStorage.getItem(guestId))))
      },[dispatch, guestId])


    return (
        <div className='products'>
            {products.map(product => <Product key={product.id} productId={product.id} guestId={guestId} name={product.product_name} price={product.price_per_unit} quantity={product.quantity} image={product.image} description={product.description}  userId={userId} guestBasket={guestBasket} />)}
        </div>
    )
}

export default Products;