import React, { useState, useEffect } from 'react'

function ListUsers() {



    const [user, setUser] = useState({
        name: "",
        accessToken: ""
    });

    async function sendPost() {

        let token = user.accessToken;
        //localStorage.getItem("jwt")


        const url = "http://localhost:8080/api/users";



        const response = await fetch(url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'no-cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            //credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
                "Access-Control-Allow-Origin": "*"

                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            // body data type must match "Content-Type" header
        })

        return response

        //const response = await listAllUsers()        
    }

    useEffect(() => {
        sendPost().then(res => console.log(res))

    }, [])



    return (

        user ? <div>
            <ul>
                {user.accessToken}
            </ul>
        </div> : <div>loooading</div>


    )
}

export default ListUsers