import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBasketProductsByCustId, selectBasketProducts} from './basketProductsSlice'
import { getBasketByCustId, selectBasket } from "./basketSlice";
import BasketProducts from './BasketProducts';


const Basket = ({userId, guestId, guestBasket }) => {

    
    const dispatch = useDispatch();

    const basket = useSelector(selectBasket);
    const basketProducts = useSelector(selectBasketProducts);

    let basketToMap;

    guestId ? basketToMap = guestBasket : basketToMap = basketProducts;

    let guestTotal;
    if (guestBasket.length > 0) {
        guestTotal = guestBasket.map(product => product.price_per_unit.split('').splice(1).join('')).reduce((cont, champ) => parseFloat(cont) + parseFloat(champ));
    }
    
    useEffect(() => {
        if (userId) {
            dispatch(getBasketProductsByCustId(userId));
            dispatch(getBasketByCustId(userId));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <div>
            <h1>Basket</h1>
            { basketProducts.length > 0 && <h3 key='total'>Total: {basket.total_cost}</h3>}
            { guestBasket.length > 0 && <h3>Total: £{guestTotal}</h3>}
            <div>
                {basketToMap.length > 0 && basketToMap.map(product => <BasketProducts key={product.product_id} id={product.product_id} name={product.product_name} image={product.image} price={product.price_per_unit} userId={userId} guestId={guestId} guestBasket={guestBasket} />
                )}
                {basketToMap.length < 1 && <h2>Your Basket is Empty</h2>}
            </div>
        </div>
    )
}

export default Basket;




