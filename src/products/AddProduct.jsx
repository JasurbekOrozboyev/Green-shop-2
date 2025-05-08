import React, { useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import Slide from '@mui/material/Slide';

const AddProduct = () => {
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    brand: '',
    stock: ''
  });

  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success'); // 'success', 'error', etc.

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('https://dummyjson.com/products/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: product.title,
        description: product.description,
        price: parseFloat(product.price),
        category: product.category,
        brand: product.brand,
        stock: parseInt(product.stock)
      })
    });

    const data = await response.json();

    if (response.ok) {
      setAlertMessage("Mahulot qo'shildi");
      setAlertSeverity('success');
      setOpenAlert(true);
    } else {
      setAlertMessage('Xatolik yuz berdi');
      setAlertSeverity('error');
      setOpenAlert(true);
    }
  };

  return (
    <div className="w-full mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Mahsulot qo'shish</h2>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="title">Title</label>
          <input type="text" id="title" name="title" value={product.title} onChange={handleChange} className="w-full p-2 border rounded" required/>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="description">Description</label>
          <textarea id="description" name="description" value={product.description} onChange={handleChange} className="w-full p-2 border rounded" required>
          </textarea>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="price">Price</label>
          <input type="number" id="price" name="price" value={product.price} onChange={handleChange} className="w-full p-2 border rounded" required/>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="category">Category</label>
          <input type="text" id="category" name="category" value={product.category} onChange={handleChange} className="w-full p-2 border rounded" required/>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="brand">Brand</label>
          <input type="text" id="brand" name="brand" value={product.brand} onChange={handleChange} className="w-full p-2 border rounded" required/>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="stock">Stock</label>
          <input type="number" id="stock" name="stock" value={product.stock} onChange={handleChange} className="w-full p-2 border rounded" required/>
        </div>

        <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded w-full">
          Mahsulot qo'shish
        </button>
      </form>

      <Snackbar
        open={openAlert}
        autoHideDuration={4000}
        onClose={() => setOpenAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={() => setOpenAlert(false)} severity={alertSeverity}>
          {alertMessage} <span className='text-red-500'>"Networkka etibor bering!"</span>
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AddProduct;
