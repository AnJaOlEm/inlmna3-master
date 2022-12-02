import React, { useEffect, useState } from 'react'

const Blog = () => {

    const [posts, setPosts] = useState();

    async function getAllPosts() {

        const url = "http://localhost:8080/post/all";
        const response = await fetch(url)
        return response.json();
    }

    useEffect(() => {
        getAllPosts().then((res) => setPosts(res))

    }, [])


    return (

        posts ? <div>
            <h1>{posts[0].title}</h1>
        </div> : <div>Loading</div>
    )
}

export default Blog;