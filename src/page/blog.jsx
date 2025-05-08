import Footer from '../components/footer';
import CommentsList from './comments';
const Blog = () => {
  
  return (
  <div className='container max-w-[1216px] m-auto mt-5'>
      <div className='w-full h-[300px] p-[50px] border border-gray-200 mt-3 flex max-2xl:h-[200px] max-md:h-[150px] justify-between rounded'>
      <img src="https://firebasestorage.googleapis.com/v0/b/aema-image-upload.appspot.com/o/greenshop%2Fimages%2Fblog_avatar_1.png?alt=media&amp;token=8174091c-24b5-42a0-886d-845bd15cccb9" class="w-[15%] h-full" alt="blog_avatar_1"/>
      <img class="w-[15%] h-full mt-[20px]" src="https://firebasestorage.googleapis.com/v0/b/aema-image-upload.appspot.com/o/greenshop%2Fimages%2Fblog_avatar_2.png?alt=media&amp;token=d2b8bf6f-7c67-4e93-b026-917f4291d9f6" alt="blog_avatar_2"/>
      <img class="w-[15%] h-full mt-[50px]" src="https://firebasestorage.googleapis.com/v0/b/aema-image-upload.appspot.com/o/greenshop%2Fimages%2Fblog_avatar_3.png?alt=media&amp;token=7abda4b5-0f9e-4fc1-8353-e32194b925c9" alt="blog_avatar_3"/>
      <img class="w-[15%] h-full mt-[20px]" src="https://firebasestorage.googleapis.com/v0/b/aema-image-upload.appspot.com/o/greenshop%2Fimages%2Fblog_avatar_4.png?alt=media&amp;token=2a9f4b03-30a0-4c89-b189-7c8835ab42e7" alt="blog_avatar_4"/>
      <img class="w-[15%] h-full" src="https://firebasestorage.googleapis.com/v0/b/aema-image-upload.appspot.com/o/greenshop%2Fimages%2Fblog_avatar_5.png?alt=media&amp;token=f65d9df1-ea8b-4ebe-9d23-e3e768f0f701" alt="blog_avatar_5"></img>
      </div>
      <div>
        <h2 className='text-8xl text-center font-bold'>Monetize your content with <span className='text-green-500'>GreenShop</span></h2>
        <h3 className='text-4xl text-center mt-3'>Greenshop - a platform for buying and selling, publishing and monetizing all types of flowers: articles, notes, video, photos, podcasts or songs.</h3>
      </div>
      <CommentsList/>
      <div >
      </div>
      <Footer/>
  </div>
  );
};

export default Blog;