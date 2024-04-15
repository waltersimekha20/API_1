import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = ({ addProduct }) => {
    const navigate = useNavigate();
    
    const [product, setProduct] = useState({
        name: "",
        description: "",
        manufacturer: "",
        price: 0,
        quantity: 0,
        image_url: "",
        user_id: 0
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        addProduct(product);
        navigate('/');
    };

    const handleChange = (event) => {
        const input = event.target.id;
        const value = event.target.value;
        setProduct(prev => ({ ...prev, [input]: value }));
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-6">Add Product</h1>

            <div className="mb-4">
                <label htmlFor="name" className="block mb-2">Product Title</label>
                <input type="text" id="name" value={product.name} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
            </div>

            <div className="mb-4">
                <label htmlFor="description" className="block mb-2">Product Plot</label>
                <input type="text" id="description" value={product.description} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
            </div>

            <div className="mb-4">
                <label htmlFor="manufacturer" className="block mb-2">Manufacturer</label>
                <input type="text" id="manufacturer" value={product.manufacturer} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
            </div>

            <div className="mb-4">
                <label htmlFor="price" className="block mb-2">Price</label>
                <input type="number" id="price" value={product.price} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
            </div>

            <div className="mb-4">
                <label htmlFor="quantity" className="block mb-2">Quantity</label>
                <input type="number" id="quantity" value={product.quantity} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
            </div>

            <div className="mb-4">
                <label htmlFor="image_url" className="block mb-2">Image URL</label>
                <input type="text" id="image_url" value={product.image_url} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
            </div>

            <div className="mb-4">
                <label htmlFor="user_id" className="block mb-2">User ID</label>
                <input type="number" id="user_id" value={product.user_id} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
            </div>

            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md">Submit</button>
        </form>
    );
};

export default AddProduct;
