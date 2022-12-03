import axios from 'axios'
import { useContext } from 'react'
import { AuthContext } from "./context";



export async function getPosts(token) {
    const res = await instance.get('/post/all', {
        headers: {
            "Access-Control-Allow-Origin": "*",
            'Authorization': bearerAuth(token)
        }
    })
    return res
}

export async function updatePost(oldTitle, title, value, token) {

    const user = localStorage.getItem("user")

    const getUserName = JSON.parse(user)


    const data = {
        title: title,
        content: value,
        oldTitle: oldTitle,
        name: getUserName.name
    }

    console.log(data)


    const customCfg = {
        headers: {
            "Access-Control-Allow-Origin": "*",
            'Authorization': bearerAuth(token)
        },


    }
    const res = await instance.put('/post/update', { "username": data.name, "title": data.title, "content": data.content, "oldTitle": data.oldTitle }, customCfg)

    return res

}


export async function createPost(title, value, token) {

    const user = localStorage.getItem("user")

    const getUserName = JSON.parse(user)

    const data = {
        title: title,
        content: value,
        name: getUserName.name
    }

    const customCfg = {
        headers: {
            "Access-Control-Allow-Origin": "*",
            'Authorization': bearerAuth(token)
        },

    }
    const res = await instance.post('/post/create', { "username": data.name, "title": data.title, "content": data.content }, customCfg)




    return res
}

export async function deletePost(username, title, token) {

    const customCfg = {
        headers: {
            "Access-Control-Allow-Origin": "*",
            'Authorization': bearerAuth(token)
        },


    }

    const res = await instance.post('/post/delete', { "username": username, "title": title }, customCfg)



    // console.log(title, username, token, " this is title")
    // // const customCfg = {
    // //     headers: {
    // //         "Access-Control-Allow-Origin": "*",
    // //         'Authorization': bearerAuth(token)
    // //     },


    // // }

    // const source = { username: username, title: title }

    // const res = instance.delete("/post/delete", { data: { username: username, title: title }, headers: { 'Authorization': bearerAuth(token) } })
}

// -- Axios

const instance = axios.create({
    baseURL: 'http://localhost:8080'
})

function bearerAuth(token) {

    return `Bearer ${token}`
}