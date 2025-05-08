import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Icon from "../img/icon.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { IconButton, Badge, Button, Snackbar, Alert } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginModal from '../Auth/login'; 

const Headers = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [username, setUsername] = useState(null); 
  const [openSnackbar, setOpenSnackbar] = useState(false); 
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate(); 

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }

    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartCount(storedCart.length);
  }, []);

  const handleLoginClick = () => {
    const token = localStorage.getItem('token'); 

    if (token) {
      navigate("/profile");
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsLoginModalOpen(false);
  };

  

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const isUserLoggedIn = !!localStorage.getItem('token');

  return (
    <div className="container max-w-[1216px] m-auto">
      <header className="w-full flex justify-between items-center py-4">
        <div className="flex items-center gap-2">
          <img src={Icon} alt="icon" className="w-10 h-10" />
          <h2 className="text-2xl text-green-500 font-bold">GREENSHOP</h2>
        </div>

        <nav className="flex gap-8">
          <ul className="flex items-center gap-8">
            <li>
              <NavLink to="/" className={({ isActive }) =>
                  isActive
                    ? "text-green-500 font-bold font-serif"
                    : "hover:text-green-500 font-serif"
                }>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/blog" className={({ isActive }) =>
                  isActive
                    ? "text-green-500 font-bold font-serif"
                    : "hover:text-green-500 font-serif"
                }>
                Blog
              </NavLink>
            </li>
            {isUserLoggedIn && (
              <>
                <li>
                  <NavLink to="/AllUser" className={({ isActive }) =>
                      isActive
                        ? "text-green-500 font-bold font-serif"
                        : "hover:text-green-500 font-serif"
                    }>
                    Users
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/posts" className={({ isActive }) =>
                      isActive
                        ? "text-green-500 font-bold font-serif"
                        : "hover:text-green-500 font-serif"
                    }>
                    Posts
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-5">
          <div>
            <FontAwesomeIcon icon={faMagnifyingGlass} className="text-xl" />
          </div>
          <div>
            <IconButton aria-label="cart" color="primary">
              <Badge badgeContent={cartCount} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </div>
          <div>
            {username ? (
              <Button variant="contained" color="success" onClick={() => navigate("/profile")}>
                {username}
              </Button>
            ) : (
              <Button variant="contained" color="success" onClick={handleLoginClick}>
                Login
              </Button>
            )}
          </div>
        </div>
      </header>

      <LoginModal isOpen={isLoginModalOpen} onClose={handleCloseModal} />

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

export default Headers;
