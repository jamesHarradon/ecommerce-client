import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, selectProducts } from "./productsSlice";


import Product from "../Product/Product";

const Products = ({ userId }) => {

    const dispatch = useDispatch();
    const products = useSelector(selectProducts);

    useEffect(() => {
        dispatch(getProducts());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);


    return (
        <div>
            {products.map(product => <Product key={product.id} id={product.id} name={product.product_name} image={product.image} price={product.price_per_unit} userId={userId}/>)}
        </div>
    )
}

export default Products;