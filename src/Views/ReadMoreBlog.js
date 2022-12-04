import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { Header } from '../components/Header';



const ReadMoreBlog = (data) => {
    //Content på sidan kommer att visas från toppen.
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [currentPost, setCurrenPost] = useState();
    const [postAuthor, setPostAuthor] = useState();

    let currentUser = JSON.parse(localStorage.getItem("user"))

    console.log(currentPost, " we have uid here?")




    const navigate = useNavigate();

    let location = useLocation();

    async function handleUpdate() {

    }



    async function handelDelete() {


        if (currentUser.user_id === currentPost.user_id) {

            await fetch("http://localhost:8080/api/blog/" + currentPost.blog_id, {
                method: 'DELETE',
            }).then(res => res.json())
                .then(res => console.log(res)).finally(navigate("/"))
        }
    }



    return (

        <>
            <Header />
            {currentPost && postAuthor ?
                <div className='container'>
                    <div className="example-blog-post">
                        <h2 id="title">{currentPost.title}</h2>
                        <h3>{currentPost.ingress}</h3>

                        <div className="blog-post-text">
                            <p className='blog-test'>{currentPost.content}</p>
                            <br />
                            <br />
                            <p id="author-name">Author: {postAuthor.username}</p>
                        </div>
                        {currentUser && postAuthor ? currentUser.user_id === postAuthor.user_id ? <div><button onClick={handelDelete}>Delete</button> <button onClick={() => navigate("/")}>Home</button></div>
                            : <button onClick={() => navigate("/")}>Home</button> : <button onClick={() => navigate("/")}>Home</button>}

                    </div>

                </div>
                : <div>loding</div>}
        </>
    );
}

export default ReadMoreBlog;
