import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, selectProducts } from "./productsSlice";
import { selectGuestId, setGuestBasket } from "../../guestSlice";
import Product from '../../components/Product/Product'


const Products = () => {

    const dispatch = useDispatch();
    const products = useSelector(selectProducts);
    const guestId = useSelector(selectGuestId);
   
    
    useEffect(() => {
        if(!products.length > 0) dispatch(getProducts());
    });

    useEffect(() => {
        if(guestId) dispatch(setGuestBasket(JSON.parse(localStorage.getItem(guestId))))
      },[dispatch, guestId])


    return (
        <div className='products'>
            {products.map(product => <Product key={product.id} productId={product.id} name={product.product_name} price={product.price_per_unit} image={product.image} description={product.description} />)}
        </div>
    )
}

export default Products;