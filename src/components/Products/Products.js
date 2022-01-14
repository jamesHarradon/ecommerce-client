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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    useEffect(() => {
        if(guestId) dispatch(setGuestBasket(JSON.parse(localStorage.getItem(guestId))))
      },[dispatch, guestId])


    return (
        <div>
            {products.map(product => <Product key={product.id} id={product.id} guestId={guestId} name={product.product_name} price={product.price_per_unit} quantity={product.quantity} image={product.image} description={product.description}  userId={userId} guestBasket={guestBasket} />)}
        </div>
    )
}

export default Products;