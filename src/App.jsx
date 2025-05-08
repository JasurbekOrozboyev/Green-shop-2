import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Headers from './components/headers';
import Home from './page/home';
import Blog from './page/blog';
import LoginModal from './Auth/login'; 
import Profile from './page/profile';
import ProductDetail from './products/productInfo';
import AllUser from './users/AllUser'
import UserDetails from './users/user'
import Posts from './posts/posts'

function App() {
  const openModal = () => setModalOpen(true);

  return (
    <Router>
      <Headers onLoginClick={openModal} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/login" element={<LoginModal />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/AllUser" element={<AllUser />} />
        <Route path="/user/:id" element={<UserDetails />} />
        <Route path="/posts" element={<Posts />} />
      </Routes>

     
    </Router>
  );
}

export default App;
