import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBasketProductsByCustId, selectBasketProducts} from './basketSlice'
import BasketProducts from './BasketProducts';


const Basket = ({userId}) => {

    
    const dispatch = useDispatch();

    const basketProducts = useSelector(selectBasketProducts);


    useEffect(() => {
        dispatch(getBasketProductsByCustId(userId))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])



    return (
        <div>
            <h1>Basket</h1>
            <div>
                {basketProducts.map(product => <BasketProducts key={product.product_id} id={product.product_id} name={product.product_name} image={product.image} price={product.price_per_unit} userId={userId} />
                )}
            </div>
            
            
        </div>
    )
}

export default Basket;




