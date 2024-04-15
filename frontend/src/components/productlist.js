import React from 'react';
import ProductItem from './ProductItem';

const Productlist = ({products, deleteProduct}) => {
console.log(products);
    const displayEvents = products?.map(event => {
        return <ProductItem key = {event.id} id = {event.id} name = {event.name} description  = {event.description} image = {event.image} deleteProduct={deleteProduct}/>
    })
  return (
    <div>
      {displayEvents}
      
    </div>
  );
}

export default Productlist;
