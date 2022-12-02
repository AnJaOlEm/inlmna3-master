import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context';
import { Header } from "../components/Header";
import styles from "./css/Home.css";
import Post from "../components/Post";
import { Token } from "@mui/icons-material";
import { getPosts, deletePost } from "../apiCalls";

const Home = () => {
  const [blogPosts, setBlogPosts] = useState();


  const { login, setCurrentUser, currentUser, setCurrentPost } = useContext(AuthContext);

  useEffect(() => {
    getPosts().then(res => setBlogPosts(res.data))
    const getLocalUser = JSON.parse(localStorage.getItem("user"))
    setCurrentUser(getLocalUser)
  }, []);

  const handleDelete = (post) => {
    deletePost(post.creator.name, post.title, token).then(getPosts().then(res => setBlogPosts(res.data)))

  }

  const handleEdit = (post) => {
    setCurrentPost(post)
    navigate("/addpost")
  }

  // const getAllBlogPosts = async () => {
  //   let token = localStorage.getItem("jwt");

  //   let response = await fetch("http://localhost:8080/post/all", {
  //     method: "GET",
  //     mode: 'no-cors',
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Authorization": `Bearer ${token}`
  //     },
  //   }).then((res) => res.json()asd);

  //   // update the state
  //   setBlogPosts(await response);

  // }
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt")


  //

  return (
    <>
      <Header />
      {blogPosts?.map((post, i) => (
        <div key={i} className="border border-striped m-3">
          <div>{post.title}</div>
          <div>{post.content} <br />name: {post.creator.name}</div>
          {currentUser?.name === post?.creator?.name ? <div><button onClick={() => handleDelete(post)}>delete</button> <button onClick={() => handleEdit(post)}>Edit</button></div> : null}
        </div>
      ))
      }

    </>
  );
};

export default Home;
