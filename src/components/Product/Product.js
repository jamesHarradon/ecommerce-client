import React from "react";
import { Link } from 'react-router-dom';


const Product = ({id, name, image, price}) => {
    return (
        <div key={id}>
            <Link to={`/products/${id}`}>
                <h3>{name}</h3>
                <img className='product-image' src={image} alt={name}></img>
                <h3>{price}</h3>
            </Link>
        </div>
    )
}

export default Product;