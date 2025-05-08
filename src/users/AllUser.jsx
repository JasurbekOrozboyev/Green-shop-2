import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://dummyjson.com/users')
      .then(res => setUsers(res.data.users))
      .catch(err => console.error("Foydalanuvchilarni olishda xatolik:", err));
  }, []);

  const filteredUsers = users.filter(user =>
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='container max-w-[1216px] m-auto mt-5'>
      <h1 className="text-2xl font-bold mb-4 text-center">Foydalanuvchilar ro'yxati</h1>
      <div className='w-full flex justify-end mt-2 mb-2'>
        <input className='w-[35%] border rounded py-1 px-3' type="search" placeholder='User search...' value={searchTerm}  onChange={(e) => setSearchTerm(e.target.value)} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 m-2">
        {filteredUsers.map(user => (
          <div
            key={user.id}
            className="border p-4 rounded shadow cursor-pointer hover:shadow-lg flex flex-col justify-center items-center"
            onClick={() => navigate(`/user/${user.id}`)}
          >
            <img src={user.image} alt={user.firstName} className="w-20 h-20 object-cover rounded-full mb-2" />
            <h2 className="text-sm font-bold text-center">{user.firstName} {user.lastName}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
