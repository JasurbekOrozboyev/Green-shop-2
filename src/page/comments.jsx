import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CommentsList = () => {
  const [comments, setComments] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); 

  useEffect(() => {
    axios.get('https://dummyjson.com/comments')
      .then(res => setComments(res.data.comments))
      .catch(err => console.error("Error", err));
  }, []);

  const filteredComments = comments.filter(comment =>
    comment.user.fullName.toLowerCase().startsWith(searchTerm.toLowerCase()) 
  );

  return (
    <div className='container max-w-[1216px] m-auto mt-5'>
      <h1 className="text-4xl font-bold font-serif mb-4 text-center">Commentlar ro'yxati</h1>
      <div className='w-full flex justify-end mt-2 mb-2'>
        <input className='w-[35%] border rounded py-1 px-3' type="search" placeholder='Search FullName...' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} 
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {filteredComments.map(comment => (
          <div className="border border-gray-300 p-4 rounded shadow-xl hover:border-black">
            <h2 className="font-bold text-xl">{comment.user.fullName}</h2>
            <p className="text-sm text-gray-600">Like: {comment.likes}</p>
            <p className="mt-1"><span className='font-bold'>Comment</span> :{comment.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsList;
