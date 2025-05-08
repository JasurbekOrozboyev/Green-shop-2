import React, { useState, useEffect } from 'react';
import { TextField, Button, Snackbar, Alert } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faEye, faHeart } from '@fortawesome/free-solid-svg-icons';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostBody, setNewPostBody] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [comments, setComments] = useState({});
  const [commentInputs, setCommentInputs] = useState({});

  useEffect(() => {
    fetch('https://dummyjson.com/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data.posts || []);
        setLoading(false);
      })
      .catch(err => {
        console.log("error", err);
        setLoading(false);
      });
  }, []);

  const addPost = () => {
    if (!newPostTitle || !newPostBody) {
      setSnackbarMessage("Maydonlarni to'ldiring!");
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
        setSnackbarMessage("Post qo'shildi!");
        setOpenSnackbar(true);
      })
      .catch(error => {
        console.log("Error", error);
        setOpenSnackbar(true);
      });
  };

  const deletePost = (postId) => {
    fetch(`https://dummyjson.com/posts/${postId}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(data => {
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

  const fetchComments = (postId) => {
    if (comments[postId]) return; 

    fetch(`https://dummyjson.com/comments/post/${postId}`)
      .then(res => res.json())
      .then(data => {
        setComments(prev => ({
          ...prev,
          [postId]: data.comments,
        }));
      });
  };

  const handleCommentChange = (postId, text) => {
    setCommentInputs(prev => ({ ...prev, [postId]: text }));
  };

  const submitComment = (postId) => {
    const commentText = commentInputs[postId];
    if (!commentText) return;

    fetch('https://dummyjson.com/comments/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        body: commentText,
        postId,
        userId: 5,
      }),
    })
      .then(res => res.json())
      .then(newComment => {
        setComments(prev => ({
          ...prev,
          [postId]: [...(prev[postId] || []), newComment],
        }));
        setCommentInputs(prev => ({ ...prev, [postId]: '' }));
        setSnackbarMessage("Izoh qo'shildi!");
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
        <TextField label="Post sarlavhasi" variant="outlined" fullWidth value={newPostTitle} onChange={(e) => setNewPostTitle(e.target.value)} />
        <TextField label="Post mazmuni" variant="outlined" multiline rows={4} fullWidth value={newPostBody} onChange={(e) => setNewPostBody(e.target.value)} />
        <Button variant="contained" color="primary" onClick={addPost}>
          Post qo'shish
        </Button>
      </div>

      {posts.length === 0 ? (
        <p>Postlar yo'q</p>
      ) : (
        <div>
          <h2 className='text-center font-bold text-2xl mb-2'>POSTLAR</h2>
          <div className="grid grid-cols-2 gap-4">
            {posts.map(post => (
              <div key={post.id} className="border border-gray-300 hover:border-black p-4 rounded flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-xl">{post.title}</h3>
                  <hr className='mt-1 mb-1'/>
                  <p className='text-justify'>{post.body}</p>
                </div>
                <div className='flex justify-between items-center gap-5 my-2'>
                  <ul>
                    <li className='flex items-center gap-2'><FontAwesomeIcon icon={faEye} /> {post.views}</li>
                  </ul>
                  <ul className='flex gap-4'>
                    <li><FontAwesomeIcon icon={faThumbsUp} /> {post.reactions?.likes || 0}</li>
                    <li><FontAwesomeIcon icon={faThumbsDown} /> {post.reactions?.dislikes || 0}</li>
                  </ul>
                </div>
                  <div>
                  <Button variant="outlined" color="error" onClick={() => deletePost(post.id)} className="mt-2">
                  O'chirish
                </Button>
                  </div>
               

                <div className="mt-2">
                  <Button onClick={() => fetchComments(post.id)}>Izohlarni</Button>
                  <TextField placeholder="Izoh yozing..." multiline fullWidth rows={2} className="mt-2" value={commentInputs[post.id] || ''} onChange={(e) => handleCommentChange(post.id, e.target.value)}/>
                  <Button onClick={() => submitComment(post.id)} className="mt-2">Yuborish</Button>

                  <div className="mt-3">
                    {(comments[post.id] || []).map(comment => (
                      <div className='flex justify-between items-center'>
                        <div>
                        <p className='font-serif'><span className='font-bold'>User</span> : {comment.user?.fullName}</p>
                        <p  key={comment.id} className="text-sm border-b py-1"><span className='font-bold'>Comment</span> : {comment.body}</p>
                        </div>
                        <p><FontAwesomeIcon icon={faHeart} /> {comment.likes}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Posts;
