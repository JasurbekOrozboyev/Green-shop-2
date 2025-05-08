import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Footer from '../components/footer';
import { Button, Snackbar, Alert } from '@mui/material'; 

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false); 

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${id}`)
      .then(res => {
        setProduct(res.data);
      })
      .catch(err => {
        console.error("Error", err);
      });
  }, [id]);

  const deleteProduct = () => {
    axios.delete(`https://dummyjson.com/products/${id}`)
      .then(() => {
        setOpenSnackbar(true); 
      })
      .catch(err => {
        console.error("O'chirishda xatolik:", err);
      });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false); 
  };

  if (!product) return <h2 className='text-center text-xl font-serif'>Loading...</h2>;

  return (
    <div className="p-4 max-w-[1216px] m-auto mt-10">
      <div className='flex justify-end mb-5'>
        <Button variant="contained" color="error" onClick={deleteProduct}>
          O'chirish
        </Button>
      </div>
      <div className='flex gap-10 justify-between items-center'>
        <div>
          <ul className="flex flex-col gap-16 mt-3">
            <li>
              <img className="w-40 shadow-2xl border-2 border-white hover:border-green-500" src={product.images} alt={product.title} />
            </li>
            <li>
              <img className="w-40 shadow-2xl border-2 border-white hover:border-green-500" src={product.images} alt={product.title} />
            </li>
            <li>
              <img className="w-40 shadow-2xl border-2 border-white hover:border-green-500" src={product.images} alt={product.title} />
            </li>
          </ul>
        </div>
        <div>
          <img src={product.images} alt={product.title} className="w-200 object-cover mt-4 shadow-xl border-2 border-white rounded hover:border-green-500" />
        </div>

        <div>
          <div className='flex justify-between items-center'>
            <div>
              <p className='text-2xl font-bold mb-4'>Meta</p>
              <p><span className='text-[18px] font-bold'>CreatedAt:</span> {product.meta.createdAt}</p>
              <p><span className='text-[18px] font-bold'>UpdatedAt:</span> {product.meta.updatedAt}</p>  
              <p><span className='text-[18px] font-bold'>Barcode</span>: {product.meta.barcode}</p>  
            </div>
            <div>
              <img className='p-4 shadow-2xl' src={product.meta.qrCode} alt="#" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold">{product.title}</h2>
            <p className="text-green-600 font-bold text-xl mt-2">Price: ${product.price}</p>
            <p className="mt-2 mb-2 text-[20px] font-serif">{product.description}</p>

            <div className='grid grid-cols-2 gap-1'>
              <p className='font-serif'><span className='text-[18px] font-bold'>Category:</span> {product.category}</p>
              <p className='font-serif'><span className='text-[18px] font-bold'>DiscountPercentage</span>: {product.discountPercentage}</p>
              <p className='font-serif'><span className='text-[18px] font-bold'>Rating</span>: {product.rating}</p>
              <p className='font-serif'><span className='text-[18px] font-bold'>Stock</span>: {product.stock}</p>
              <p className='font-serif'><span className='text-[18px] font-bold'>Brand</span>: {product.brand}</p>
              <p className='font-serif'><span className='text-[18px] font-bold'>SKU</span>: {product.sku}</p>
            </div>
          </div>
          <div>
            <h2 className='text-2xl font-bold'>Dimensions</h2>
            <ul className='flex w-full justify-between'>
              <li className='font-serif'><span className='text-[18px] font-bold'>Width</span>: {product.dimensions.width}</li>
              <li className='font-serif'><span className='text-[18px] font-bold'>Height</span>: {product.dimensions.height}</li>
              <li className='font-serif'><span className='text-[18px] font-bold'>Depth</span>: {product.dimensions.depth}</li>
            </ul>
          </div>
        </div>
      </div>
      
     
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{
          vertical: 'top',  
          horizontal: 'right',  
        }}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Mahsulot o'chirildi! <span className='text-red-500'>"Networkga etibor bering!"</span>
        </Alert>
      </Snackbar>

      <Footer />
    </div>
  );
};

export default ProductDetail;
