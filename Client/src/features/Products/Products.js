import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, selectProducts, selectIsLoading, selectTerm } from "./productsSlice";
import { selectGuestId, setGuestBasket } from "../../guestSlice";
import Product from '../../components/Product/Product';
import loadingIcon from '../../loading.png';


const Products = () => {

    const dispatch = useDispatch();
    const products = useSelector(selectProducts);
    const term = useSelector(selectTerm);
    const regex = new RegExp(term, 'i');
    const productsFilter = products.filter(product => product.product_name.match(regex));
    const productsToMap = term ? productsFilter : products;
    const isLoading = useSelector(selectIsLoading);
    const guestId = useSelector(selectGuestId);
   
    
    useEffect(() => {
        if(products?.length < 1) dispatch(getProducts());
    });

    useEffect(() => {
        if(guestId) dispatch(setGuestBasket(JSON.parse(localStorage.getItem(guestId))))
      },[dispatch, guestId])


    return (
        
        <div className='products'>
            {isLoading && 
                <img id='loading-icon' src={loadingIcon} alt='loading icon'></img>
            }
            {productsToMap.map(product => <Product key={product.id} productId={product.id} name={product.product_name} price={product.price_per_unit} image={product.image} description={product.description} />)}
            {!isLoading && productsToMap.length === 0 && term && 
                <h1 className='lone-header'>No Results Found</h1>
            }
            
        </div>
    )
}

export default Products;