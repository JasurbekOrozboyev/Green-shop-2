import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Snackbar, Alert } from '@mui/material';  // Snackbar va Alert import qilish

const CategoryProducts = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const [sortOption, setSortOption] = useState('def');
  const [openSnackbar, setOpenSnackbar] = useState(false);  
  const [snackbarMessage, setSnackbarMessage] = useState('');  
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://dummyjson.com/products/category-list')
      .then(res => {
        setCategories(res.data);
      })
      .catch(err => {
        console.error("Kategoriyalarni olishda xatolik:", err);
      });
  }, []);

  useEffect(() => {
    axios.get('https://dummyjson.com/products')
      .then(res => {
        setProducts(res.data.products);
        setActiveCategory('');
      })
      .catch(err => {
        console.error("Mahsulotlarni olishda xatolik:", err);
      });
  }, []);

  useEffect(() => {
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartCount(currentCart.length);
  }, []); 

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    axios.get(`https://dummyjson.com/products/category/${category}`)
      .then(res => {
        setProducts(res.data.products);
      })
      .catch(err => {
        console.error("Error", err);
      });
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'cheap') {
      return a.price - b.price;
    } else if (sortOption === 'expensive') {
      return b.price - a.price;
    }
    return 0;
  });

  const handleAddToCart = (product) => {
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];

    if (!currentCart.some(item => item.id === product.id)) {
      currentCart.push(product);
      localStorage.setItem('cart', JSON.stringify(currentCart)); 
      setCartCount(currentCart.length);  

      setSnackbarMessage("Mahsulot savatga qo'shildi");
      setOpenSnackbar(true);
    } else {
      setSnackbarMessage("Bu mahsulot savatda bor!");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="p-4 flex justify-between gap-5">
      <div>
        <h2 className="text-xl font-bold mb-4">Categoriyalar</h2>
        <ul>
          <li onClick={() => {
            setActiveCategory('');
            axios.get('https://dummyjson.com/products')
              .then(res => setProducts(res.data.products));
          }}
            className={`w-50 border rounded mt-2 px-2 py-2 font-serif cursor-pointer hover:text-green-500 
            ${activeCategory === '' ? 'bg-green-100 text-green-700 font-bold' : ''}`}>All Products
          </li>
          {categories.map((category, index) => (
            <li key={index} onClick={() => handleCategoryClick(category)}
              className={`w-50 border rounded mt-2 px-2 py-2 font-serif cursor-pointer 
              hover:text-green-500 
              ${activeCategory === category ? 'bg-green-100 text-green-500 font-bold' : ''}`}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </li>
          ))}
        </ul>
      </div>

      <div className="w-full">
        <div className="flex justify-between items-center">
          <div>
            <ul className="flex items-center gap-10">
              <li className="text-[18px] hover:text-green-500 font-bold">All plants</li>
              <li className="text-[18px] hover:text-green-500 font-bold">New Arrivals</li>
              <li className="text-[18px] hover:text-green-500 font-bold">Sale</li>
            </ul>
          </div>
          <div className="flex items-center gap-2">
            <p className="font-bold">Sort by:</p>
            <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="border p-1 rounded">
              <option value="def">Default Sorting</option>
              <option value="cheap">The Cheapest</option>
              <option value="expensive">Most Expensive</option>
            </select>
          </div>
        </div>

        <div>
          <input
            type="search"
            placeholder="Title bo'yicha qidiruv..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded mt-2"
          />
        </div>

        <div className="grid grid-cols-3 gap-4 mt-3">
          {sortedProducts.map(product => (
            <div key={product.id} className="border border-gray-400 hover:border-black p-4 rounded shadow cursor-pointer">
              <div onClick={() => navigate(`/product/${product.id}`)}>
                <img src={product.images[0]} alt="#" />
                <h2 className="font-bold text-xl font-serif">{product.title}</h2>
                <p><span className='font-bold'>Category</span>: {product.category}</p>
                <p className="text-green-600 font-bold font-serif">${product.price}</p>
              </div>
              <div>
                <button onClick={() => handleAddToCart(product)} className="bg-green-500 text-white py-2 px-4 rounded flex items-center gap-2">
                  <FontAwesomeIcon icon={faCartShopping} />
                 
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={3000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CategoryProducts;
