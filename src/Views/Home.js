import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context';
import { Header } from "../components/Header";
import { getPosts, deletePost } from "../apiCalls";
import Register from "../components/Register";

const Home = () => {
  const [blogPosts, setBlogPosts] = useState();


  const { login, setCurrentUser, currentUser, setCurrentPost, setEditing } = useContext(AuthContext);

  useEffect(() => {
    getPosts().then(res => setBlogPosts(res.data))
    const getLocalUser = JSON.parse(localStorage.getItem("user"))
    setCurrentUser(getLocalUser)
  }, []);

  const handleDelete = async (post) => {
    const token = localStorage.getItem("jwt")
    let res = await deletePost(post.creator.username, post.title, token).then(
      getPosts(token))
    setBlogPosts(res)
    setCurrentPost(null)

  }

  const handleEdit = (post) => {
    setEditing(true);
    console.log(post, " this is post in handleedit")
    setCurrentPost(post)
    navigate("/addpost")
  }
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt")

  return (
    <>
      <Header />
      <div className="container-fluid">
      {blogPosts?.map((post, i) => (
        <div key={i} className="border border-striped m-3">
          <div>{post.title}</div>
          <div>{post.content} <br />name: {post.creator?.name}</div>
          {currentUser?.name === post?.creator?.username ? <div><button onClick={() => handleDelete(post)}>delete</button> <button onClick={() => handleEdit(post)}>Edit</button></div> : null}
        </div>
      ))
      }
      </div>

    </>
  );
};

export default Home;
