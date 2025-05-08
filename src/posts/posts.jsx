import React, { useState, useEffect } from 'react';
import { TextField, Button, Snackbar, Alert } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faEye } from '@fortawesome/free-solid-svg-icons';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPostTitle, setNewPostTitle] = useState(''); 
  const [newPostBody, setNewPostBody] = useState(''); 
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(''); 

  useEffect(() => {
    fetch('https://dummyjson.com/posts')
      .then(res => res.json())
      .then(data => {
        console.log("API javobi:", data);
        setPosts(data.posts || []); 
        setLoading(false);
      })
      .catch(err => {
        setError("error", err);
        setLoading(false);
      });
  }, []); 

  const addPost = () => {
    if (!newPostTitle || !newPostBody) {
      setSnackbarMessage("Iltimos, sarlavha va mazmunni to'ldiring.");
      setOpenSnackbar(true);
      return;
    }
  
    fetch('https://dummyjson.com/posts/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: newPostTitle,
        body: newPostBody,
        userId: 5,
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log("Post qo'shildi:", data);
        setPosts(prevPosts => [
          ...prevPosts,
          {
            ...data,
            reactions: { likes: 0, dislikes: 0 },
            views: 0,
          },
        ]);
        setNewPostTitle('');
        setNewPostBody('');
        setSnackbarMessage("Post muvaffaqiyatli qo'shildi!");
        setOpenSnackbar(true);
      })
      .catch(error => {
        console.log("Error", error);
        setSnackbarMessage("Postni qo'shishda xatolik.");
        setOpenSnackbar(true);
      });
  };
  

  const deletePost = (postId) => {
    fetch(`https://dummyjson.com/posts/${postId}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(data => {
        console.log("Post o'chirildi:", data);
        setPosts(prevPosts => prevPosts.filter(post => post.id !== postId)); 
        setSnackbarMessage("Post o'chirildi!");
        setOpenSnackbar(true);
      })
      .catch(error => {
        console.error("Error", error);
        setSnackbarMessage("error");
        setOpenSnackbar(true);
      });
  };

  if (loading) {
    return <h2 className='text-center'>Loading...</h2>; 
  }

  
  return (
    <div className="container max-w-[1216px] m-auto">
      <h2 className="text-2xl font-bold mb-4">Postlar</h2>

      <div className="mb-4 flex flex-col gap-3">
       <div>
       <TextField label="Post sarlavhasi" variant="outlined" fullWidth value={newPostTitle} onChange={(e) => setNewPostTitle(e.target.value)}
        />
       </div>
        <div>
        <TextField label="Post mazmuni" variant="outlined" multiline rows={4} fullWidth value={newPostBody} onChange={(e) => setNewPostBody(e.target.value)}
        />
        </div>
        <Button variant="contained"  color="primary"   onClick={addPost}>
          Yangi post qo'shish
        </Button>
      </div>

      {posts.length === 0 ? (
        <p>Postlar yo'q</p>
      ) : (
        <div >
          <h2 className='text-center font-bold text-2xl mb-2'>POSTLAR</h2>
          <div className="grid grid-cols-3 gap-4">
          {posts.map(post => (
            <div key={post.id} className="border border-gray-300 hover:border-black shadow-xl p-4 rounded flex flex-col justify-between items-end">
              <div>
              <h3 className="font-bold text-xl">{post.title}</h3>
              <hr className='mt-1 mb-1'/>
              <p className='text-justify'>{post.body}</p>
              
              </div>
              <div className='flex justify-between items-center gap-5'>
                <ul >
                    <li className='flex items-center gap-2'><span><FontAwesomeIcon icon={faEye} /></span>  {post.views}</li>
                </ul>
              <ul className='w-full flex gap-5'>
                <li><span><FontAwesomeIcon icon={faThumbsUp} /></span> {post.reactions.likes}</li>
                <li><span><FontAwesomeIcon icon={faThumbsDown} /></span> {post.reactions.dislikes}</li>
              </ul>
              <div>
              <Button variant="outlined" color="error" onClick={() => deletePost(post.id)} className="mt-2">
                O'chirish
              </Button>
              </div>
              </div>
            </div>
          ))}
          </div>
        </div>
      )}

      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)} anchorOrigin={{
          vertical: 'top', 
          horizontal: 'right',
        }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Posts;
