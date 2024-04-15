import logo from './logo.svg';
import './App.css';
import AddProduct from './components/AddProducts';
import Productlist from './components/productlist';
import EditProduct from './components/EditProduct';
import { useEffect } from 'react';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

function App() {
  const [products, setProducts] = useState([])

  
  useEffect(() => {   
  //  fetchData()  //
  fetch("http://127.0.0.1:5000/products")
  .then(response => response.json())
  .then(data => setProducts(data))
  }, []);
   
  const fetchData = async () => {
    const response = await fetch("http://127.0.0.1:5000/products")
    const jsonData = await response.json()
    setProducts(jsonData)
  }
 console.log(products)

  const addProduct = (data) => {
    fetch("http://127.0.0.1:5000/products", {
      method:"POST",
      headers: {"Content-Type":"application/json", "Accept":"application/json"},
      body:JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => console.log(data))   
  }
  //Function that patches the animation

  //Function that deletes the animation
  


  return (

    <Routes>
      <Route path='/' element={<Productlist products={products} /> } ></Route>
      <Route path='/addProducts' element={<AddProduct addProduct={addProduct}/> } ></Route>
      <Route path='/editProducts/:id' element={<EditProduct /> } ></Route>




    </Routes>
   
  );
}

export default App;

