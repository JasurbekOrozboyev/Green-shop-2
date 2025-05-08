import React, { useEffect, useState } from 'react';
import { useParams,  Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@mui/material';



const User = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`https://dummyjson.com/users/${id}`)
      .then(res => setUser(res.data))
      .catch(err => console.error("Error", err));
  }, [id]);

  if (!user) return <h2 className='text-center'>Yuklanmoqda...</h2>;

  return (
    <div className='container max-w-[1216px] m-auto mt-5'>
      <h1 className="text-2xl font-bold mb-4 text-center">Foydalanuvchi haqida</h1>
      <div className='flex justify-between items-end gap-10'>
      <div className="w-full p-4 rounded shadow-xl flex items-center justify-between gap-12">
        <div>
        <img src={user.image} alt={user.firstName} className="w-60 object-cover rounded-full mb-4" />
        </div>
        <div className='w-full flex gap-15'>
            <div>
                <h2 className="text-xl font-bold font-serif mb-2">{user.firstName} {user.lastName}</h2>
                <p><span className='font-bold mr-2'>Maiden Name</span>: {user.maidenName}</p>
                <p><span className='font-bold mr-2'>Email</span>: {user.email}</p>
                <p><span className='font-bold mr-2'>Phone</span>: {user.phone}</p>
                <p><span className='font-bold mr-2'>Age</span>: {user.age}</p>
                <p><span className='font-bold mr-2'>birthDate</span>: {user.birthDate}</p>
                <p><span className='font-bold mr-2'>Gender</span>: {user.gender}</p>
                <p><span className='font-bold mr-2'>IP</span>: {user.ip}</p>
            </div>
            <div>
                <h2 className='text-xl font-bold font-serif mb-2'>Address</h2>
                <p> <span className='font-bold mr-2'>Address</span>: {user.address.address}</p>
                <p> <span className='font-bold mr-2'>City</span>: {user.address.city}</p>
                <p> <span className='font-bold mr-2'>State</span>: {user.address.state}</p>
                <p> <span className='font-bold mr-2'>State Code</span>: {user.address.stateCode}</p>
                <p> <span className='font-bold mr-2'>Postal Code</span>: {user.address.postalCode}</p>
                <p className='text-xl font-bold font-serif'>Coordinates</p>
                <ul className='flex gap-12'>
                    <li> <span className='font-bold mr-2'>lat</span>: {user.address.coordinates.lat}</li>
                    <li> <span className='font-bold mr-2'>lang</span>: {user.address.coordinates.lng}</li>
                </ul>
            </div>
            <div>

            </div>

       </div>
      </div>
     
        <div className='mt-3'>
        <Button variant="contained" color="success">
            <Link to="/AllUser"> Orqaga</Link>
        </Button>
        </div>
      </div>
        
    </div>
  );
};

export default User;
