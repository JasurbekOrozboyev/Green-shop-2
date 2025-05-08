import React from 'react';
import { Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram, faTwitter, faLinkedin, faYoutube, faCcPaypal, faCcMastercard, faCcVisa } from '@fortawesome/free-brands-svg-icons';
import Icon from '../img/icon.svg'

const Footer = () => {
  return (
    <footer className='container max-w-[1216px] m-auto mt-20'>
        <div className='flex justify-between items-start'>
          <div className='w-[204px] h-[201px]'>
            <img src="https://firebasestorage.googleapis.com/v0/b/aema-image-upload.appspot.com/o/greenshop%2Ficons%2Ffooter_flower_1.svg?alt=media&token=407c8917-880e-4c1d-a8a8-b377ff7cc61c" alt="gul" />
            <h2 className='text-4 font-bold'>Garden Care</h2>
            <p className='text-[14px] text-[#727272]'>We are an online plant shop offering a wide range of cheap and trendy plants.</p>
          </div>
          <div className='w-[204px] h-[201px]'>
            <img src="https://firebasestorage.googleapis.com/v0/b/aema-image-upload.appspot.com/o/greenshop%2Ficons%2Ffooter_flower_1.svg?alt=media&token=407c8917-880e-4c1d-a8a8-b377ff7cc61c" alt="gul" />
            <h2 className='text-4 font-bold'>Garden Care</h2>
            <p className='text-[14px] text-[#727272]'>We are an online plant shop offering a wide range of cheap and trendy plants.</p>
          </div>
          <div className='w-[204px] h-[201px]'>
            <img src="https://firebasestorage.googleapis.com/v0/b/aema-image-upload.appspot.com/o/greenshop%2Ficons%2Ffooter_flower_1.svg?alt=media&token=407c8917-880e-4c1d-a8a8-b377ff7cc61c" alt="gul" />
            <h2 className='text-4 font-bold'>Garden Care</h2>
            <p className='text-[14px] text-[#727272]'>We are an online plant shop offering a wide range of cheap and trendy plants.</p>
          </div>
          <div className='w-[400px] h-[201px]'>
            <h2 className='text-[18px] font-bold'>Would you like to join newsletters?</h2>
            <div className='w-[354px] h-10'>
              <input type="email" placeholder='enter your email address...' className='w-[265px] h-10 border rounded-bl rounded-tl px-3 py-1'/>
              <Button variant="contained" sx={{backgroundColor: '#00C951',}} className='mt-[55px] w-[85px] h-10'>
                <p>Join</p>
              </Button>
            </div>
            <p className='w text-[13px] text-[#727272]'>We usually post offers and challenges in newsletter. We’re your online houseplant destination. We offer a wide range of houseplants and accessories shipped directly from our (green)house to yours! </p>
          </div>
        </div>
        <div className='h-[88px] bg-[#EDF6EF]'>
          <ul className='flex justify-around items-center pt-[28px]'>
            <li className='flex items-center'>
                <img src={Icon} alt="Icon" className='w-[35px] h-[35px]'/>
                <p className='text-2xl font-bold text-[#46A358]'>GREENSHOP</p>
            </li>
            <li className='flex items-center gap-2'>
              <div>
              <FontAwesomeIcon icon={faLocationDot}  className='text-[#46A358] text-5'/>
              </div>
              <div>
                <p className='w-[185px] h-11 text-[14px] text-[#3D3D3D]'>70 West Buckingham Ave.
                Farmingdale, NY 11735</p>
              </div>
            </li>
            <li className='flex items-center gap-2'>
              <div>
              <FontAwesomeIcon icon={faEnvelope} className='text-[#46A358]'/>
              </div>
              <div>
                <p className='text-[14px] text-[#3D3D3D]'>contact@greenshop.com</p>
              </div>
            </li>
            <li className='flex items-center gap-2'>
              <div>
              <FontAwesomeIcon icon={faPhone} className='text-[#46A358]'/>
              </div>
              <div>
                <p className='text-[14px] text-[#3D3D3D]'>
                +88 01911 717 490
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div className='flex justify-between mt-5'>
          <ul className='flex flex-col gap-2'>
            <li>
              <p className='font-bold'>My Account</p>
            </li>
            <li>
              <p className='text-[#3D3D3D]'>My Account</p>
            </li>
            <li>
              <p className='text-[#3D3D3D]'>Address</p>
            </li>
            <li>
              <p className='text-[#3D3D3D]'>
              Wishlist
              </p>
            </li>
          </ul>
          <ul className='flex flex-col gap-2'>
            <li>
              <p className='font-bold'>Categories</p>
            </li>
            <li>
              <p className='text-[#3D3D3D]'>House Plants</p>
            </li>
            <li>
              <p className='text-[#3D3D3D]'>Potter Plants</p>
            </li>
            <li>
              <p className='text-[#3D3D3D]'>Seeds</p>
            </li>
            <li>
              <p className='text-[#3D3D3D]'>Small Plants</p>
            </li>
            <li>
              <p className='text-[#3D3D3D]'>Accessories</p>
            </li>
          </ul>
          <ul>
            <li>
              <h2 className='text-[18px] font-bold mb-5'>Social Media</h2>
              <div>
                <ul className='flex justify-between items-center gap-4'>
                  <li className='border px-3 py-2 rounded border-[#46A358]'>
                  <FontAwesomeIcon icon={faFacebookF} className='text-[#46A35899]'/>
                  </li>
                  <li className='border px-3 py-2 rounded border-[#46A358]'>
                  <FontAwesomeIcon icon={faInstagram} className='text-[#46A35899]'/>
                  </li>
                  <li className='border px-3 py-2 rounded border-[#46A35899]'>
                  <FontAwesomeIcon icon={faTwitter} className='text-[#46A35899]'/>
                  </li>
                  <li className='border px-3 py-2 rounded border-[#46A35899]'>
                  <FontAwesomeIcon icon={faLinkedin} className='text-[#46A35899]'/>
                  </li>
                  <li className='border px-3 py-2 rounded border-[#46A35899]'>
                  <FontAwesomeIcon icon={faYoutube} className='text-[#46A35899]'/>
                  </li>
                </ul>
                <h2 className='mt-[33px] mb-3 font-bold text-[18px]'>We accept</h2>
                <ul className='flex items-center gap-10'>
                  <li>
                  <FontAwesomeIcon icon={faCcPaypal}  className='text-[20px]'/>
                  </li>
                  <li>
                  <FontAwesomeIcon icon={faCcMastercard}  className='text-[20px]'/>
                  </li>
                  <li>
                  <FontAwesomeIcon icon={faCcVisa} className='text-[20px]' />
                  </li>
                  <li>
                      <p className='text-[6px] font-bold'>AMERICAN <br /> EXPRESS</p>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <hr  className='mt-5 text-green-500'/>
        <h2 className='text-center text-[14px] text-[#3D3D3D]'>© 2021 GreenShop. All Rights Reserved.</h2>
      </footer>
  );
};

export default Footer;