import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectProducts } from "../../features/Products/productsSlice";



const ProductDetail = () => {

    const params = useParams();
    const navigate = useNavigate();
    const products = useSelector(selectProducts);
    const product = products.filter(product => product.id === parseInt(params.id));
    

    return (
        <div>
            {product.map(data => (
                <div className='product-detail'>
                    <h2>{data.product_name}</h2>
                    <img src={data.image} alt={data.product_name}></img>
                    <p className='description'>{data.description}</p>
                    <p>£{data.price_per_unit}</p>
                </div>
            ))}
            <button onClick={() => navigate('/')}>Back</button>
        </div>
    )
    
        
    
}

export default ProductDetail;