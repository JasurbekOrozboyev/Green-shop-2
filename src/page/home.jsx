import React, { useState, useEffect, useRef } from "react";
import { Button } from '@mui/material';
import CategoryProducts from "../products/category";
import Footer from '../components/footer'

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideCount = 3; 
  const slideInterval = useRef(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideCount);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    slideInterval.current = setInterval(nextSlide, 3000); 
    return () => clearInterval(slideInterval.current);
  }, []);

  return (
    <div className="container max-w-[1216px] m-auto overflow-hidden pt-2">
      <ul
        className="flex transition-transform duration-700"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        <li className='w-full flex-shrink-0 flex justify-between items-center'>
          <div className='w-[50%]'>
            <p>Welcome to GreenShop</p>
            <h1 className='w-[571px] text-[80px] font-extrabold leading-tight mt-2'>
              LET'S MAKE A BETTER <span className='text-[#46A358]'>PLANET</span>
            </h1>
            <p className='w-[557px] h-[45px] text-[#727272] text-[14px] mt-2 mb-[55px]'>
              We are an online plant shop offering a wide range of cheap and trendy plants. Use our plants to create an unique Urban Jungle. Order your favorite plants!
            </p>
            <Button variant="contained" sx={{ backgroundColor: '#00C951' }} className='mt-[55px]'>
              <p>SHOP NOW</p>
            </Button>
          </div>
          <div className='w-[50%]'>
            <img src="https://firebasestorage.googleapis.com/v0/b/aema-image-upload.appspot.com/o/greenshop%2Fimages%2Fflower1.png?alt=media&token=0b53d608-7264-4c54-b497-a9bf054fcd9d" alt="gul" className='w-full' />
          </div>
        </li>

        <li className='w-full flex-shrink-0 flex justify-between items-center'>
          <div className='w-[50%]'>
            <p>Welcome to GreenShop</p>
            <h1 className='w-[571px] text-[80px] font-extrabold leading-tight mt-2'>
              LET'S LIVE IN A BETTER <span className='text-[#46A358]'>PLANET</span>
            </h1>
            <p className='w-[557px] h-[45px] text-[#727272] text-[14px] mt-2 mb-[55px]'>
              We are an online plant shop offering a wide range of cheap and trendy plants. Use our plants to create an unique Urban Jungle. Order your favorite plants!
            </p>
            <Button variant="contained" sx={{ backgroundColor: '#00C951' }} className='mt-[55px]'>
              <p>SHOP NOW</p>
            </Button>
          </div>
          <div className='w-[50%]'>
            <img src="https://firebasestorage.googleapis.com/v0/b/aema-image-upload.appspot.com/o/greenshop%2Fimages%2Fhero-flower-1.png?alt=media&token=74ea8d3d-06b5-41e7-bb12-7caaf3035a6d" alt="gul" className='w-full' />
          </div>
        </li>

        <li className='w-full flex-shrink-0 flex justify-between items-center'>
          <div className='w-[50%]'>
            <p>Welcome to GreenShop</p>
            <h1 className='w-[571px] text-[80px] font-extrabold leading-tight mt-2'>
              LET'S OBSERVE A BETTER <span className='text-[#46A358]'>PLANET</span>
            </h1>
            <p className='w-[557px] h-[45px] text-[#727272] text-[14px] mt-2 mb-[55px]'>
              We are an online plant shop offering a wide range of cheap and trendy plants. Use our plants to create an unique Urban Jungle. Order your favorite plants!
            </p>
            <Button variant="contained" sx={{ backgroundColor: '#00C951' }} className='mt-[55px]'>
              <p>SHOP NOW</p>
            </Button>
          </div>
          <div className='w-[50%]'>
            <img src="https://firebasestorage.googleapis.com/v0/b/aema-image-upload.appspot.com/o/greenshop%2Fimages%2Fhero-flower-2.png?alt=media&token=5b5addec-d344-4897-a983-95c9b10a1662" alt="gul" className='w-full' />
          </div>
        </li>
      </ul>

      <div className='flex justify-center mt-4 space-x-2'>
        {[...Array(slideCount)].map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-[#46A358]' : 'bg-gray-300'}`}
          ></button>
        ))}
      </div>
      <CategoryProducts />
      <Footer/>
    </div>
  );
};

export default Home;
