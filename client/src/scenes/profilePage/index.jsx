import React, { useEffect, useState } from 'react'
import { setPosts } from "../../state/index.js";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import Navbar from '../navbar/index.jsx';
import MyPostWidget from '../widgets/MyPostWidget.jsx';
import UserWidget from '../widgets/UserWidget.jsx';
import AdvertWidget from '../widgets/AdvertWidget';
const index = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  const getUserdata = async () => {
    const response = await fetch(`${import.meta.env.VITE_HOST}/user/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };
  const getUserPosts = async () => {


    const response = await fetch(   //api call to get user specific posts
      `${import.meta.env.VITE_HOST}/post/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };
  useEffect(() => {
    getUserdata();
    getUserPosts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-12  my-5">
            <MyPostWidget picturePath={user?.picturePath} />
          </div>
        </div>

        <div className="row">
          <div className="col-md-3 col-12 my-3">
            <UserWidget userId={userId} picturePath={user?.picturePath} />
          </div>

          <div className="col-md-6 col-12 my-3">
            {posts.map((post,i) => <div className="card border border-0 rounded-bottom mb-5" key={i}> 

              <div className="card-body">

                <div className="d-flex align-items-center">
                  <img
                    width="100%"
                    height="100%"
                    alt="post"
                    style={{ borderRadius: "50%", height: "60px", width: "60px", objectFit: "cover" }}
                    src={`http://localhost:5000/assets/${user?.picturePath}`} />
                  <div className='ms-3'>
                    <h5 className="card-title">{` ${post.firstName} ${post.lastName}`}</h5>
                {/* //user?.picturePath   means if null means give undefined or if it is true load it */}

                  </div>
                </div>

                <p className="card-text mt-2 text-secondary"><i className="bi bi-geo-alt-fill"></i> &nbsp;   {post.location}</p>


                <p className="card-text">{post.description}</p>
                <img src={`${import.meta.env.VITE_HOST}/assets/${post.picturePath}`}  className="card-img-top rounded-0" alt="..." />
              </div>
              <div className="accordion accordion-flush" id="accordionFlushExample">
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                      Comments
                    </button>
                  </h2>
                  <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <ul className="list-group rounded-0">



                      {
                        post.comments.length > 0 ? (
                          <ul className="list-group rounded-0">
                            {post.comments.map((comment, i) => (
                              <li className="list-group-item" key={i}>{comment}</li>
                            ))}
                          </ul>
                        ) : (
                          <li className="list-group-item">No Comments to preview</li>
                        )
                      }
                    </ul>

                  </div>
                </div>
              </div>
              <div className="card-body">
                <a href="#" className="card-link ms-2 me-5 text-decoration-none text-secondary h6"><i className="bi bi-heart-fill"></i> &nbsp;Like</a>
                <a href="#" className=" ms-5 text-decoration-none text-secondary h6"><i className="bi bi-share-fill"></i> &nbsp;Share</a>
              </div>
            </div>)}
          </div>
          <div className="col-md-3 col-12 my-3">
            <AdvertWidget />
          </div>
        </div>
      </div>


    </>
  )
}

export default index