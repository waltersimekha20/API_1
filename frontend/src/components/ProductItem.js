import React from 'react';
import { Link } from 'react-router-dom';
const ProductItem = ({ id, name, image, description,}) => {
console.log(id)
    const deleteProduct = () => {
        fetch(`http://127.0.0.1:5000/products/${id}`,{
          method:"DELETE"
        })
        .then(res => res.json())
        .then(data => console.log(data))
      }
  return (
    <div>

      <img src={image} alt={name}/>
      <p>{name}</p>
      <p>{description}</p>
      <p>{id}</p>
      <Link to={`editProducts/${id}`}>EDITPRODUCT</Link>
      <button onClick={deleteProduct}>delete</button>

    </div>
  );
}

export default ProductItem;
