import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { selectProducts } from "../Products/productsSlice";



const ProductDetail = () => {

    const params = useParams();
    const navigate = useNavigate();
    const products = useSelector(selectProducts);
    const product = products.filter(prod => prod.id === parseInt(params.id));
    

    return (
        <div>
            {product.map(fProd => (
                <div className='product-detail'>
                    <h2>{fProd.product_name}</h2>
                    <img src={fProd.image} alt={fProd.product_name}></img>
                    <p>{fProd.description}</p>
                    <p>{fProd.price_per_unit}</p>
                </div>
            ))}
            <button onClick={() => navigate('/')}>Back</button>
        </div>
    )
    
        
    
}

export default ProductDetail;