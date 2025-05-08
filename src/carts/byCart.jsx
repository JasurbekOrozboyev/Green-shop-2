import React, { useState, useEffect } from 'react';

const ByCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://dummyjson.com/carts/1')
      .then(res => res.json())
      .then(data => {
        const apiCartItems = data.products || [];

        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];

        const allCartItems = [...apiCartItems, ...storedCart];

        const formattedCartItems = allCartItems.map(item => ({
          ...item,
          source: storedCart.some(storedItem => storedItem.id === item.id) ? 'localStorage' : 'api',
        }));

        setCartItems(formattedCartItems);
        setLoading(false);
      })
      .catch(err => {
        setError("Erroe", err);
        setLoading(false);
      });
  }, []);

  const handleDeleteLocalItem = (id) => {
    const updatedLocalCart = JSON.parse(localStorage.getItem('cart')).filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(updatedLocalCart));

    setCartItems(prevItems => prevItems.filter(item => !(item.id === id && item.source === 'localStorage')));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container p-5">
      <h2 className="text-2xl font-bold mb-4">Savatdagi Mahsulotlar</h2>
      {cartItems.length === 0 ? (
        <p>Savatcha bo'sh!</p>
      ) : (
        <div>
          <h3 className="font-bold text-xl mb-2">API dan olingan mahsulotlar</h3>
          <div className="grid grid-cols-3 gap-4">
            {cartItems.filter(item => item.source === 'api').map(item => (
              <div key={item.id} className="border border-gray-200 hover:border-black p-4 rounded shadow">
                <img src={item.thumbnail} alt={item.title} className="w-full h-48 object-cover mb-2" />
                <h2 className='font-bold text-xl'>{item.title}</h2>
                <p><span className='font-bold mr-1'>Total</span>: ${item.total}</p>
                <p><span className='font-bold mr-1'>Quantity</span>: {item.quantity}</p>
                <p><span className='font-bold mr-1'>Price</span>: ${item.price}</p>
              </div>
            ))}
          </div>

          <h3 className="font-bold text-xl mb-2 mt-6">LocalStoragedan olingan mahsulotlar</h3>
          <div className="grid grid-cols-3 gap-4">
            {cartItems.filter(item => item.source === 'localStorage').map(item => (
              <div key={item.id} className="border border-gray-200 hover:border-black p-4 rounded shadow">
                <img src={item.thumbnail} alt={item.title} className="w-full h-48 object-cover mb-2" />
                <h2 className='font-bold text-xl'>{item.title}</h2>
                <p><span className='font-bold mr-1'>Price</span>: ${item.price}</p>
                <button onClick={() => handleDeleteLocalItem(item.id)} className="mt-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                  O'chirish
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ByCart;
