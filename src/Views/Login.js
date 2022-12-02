import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context';
import { Link } from "react-router-dom";
import styles from "./css/Login.css";

const Login = () => {



    const [userCredentials, setUserCredentials] = useState(
        {
            username: "",
            password: ""
        }
    )

    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);


    const navigate = useNavigate();

    const { login, setCurrentUser, currentUser } = useContext(AuthContext);

    console.log(currentUser, " current user in login.js")

    const handleUserInputs = (e) => {
        setUserCredentials(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = {
            username: userCredentials.username,
            password: userCredentials.password
        }


        login(data)
            .then((res) => {
                if ((typeof res) === "object") {
                    localStorage.setItem("jwt", res.token);
                    //setCurrentUser(res.user);
                    localStorage.setItem("user", JSON.stringify(res.user))
                    navigate("/")
                } else {
                    navigate("/")
                }
            })
    };

    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );



    const renderForm = (
        <div className="render-form">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Användarnamn</label>
                    <input type="text" name="username" onChange={handleUserInputs} />
                    {renderErrorMessage("uname")}
                </div>
                <div className="input-container">
                    <label>Lösenord</label>
                    <input type="password" name="password" required onChange={handleUserInputs} />
                    {renderErrorMessage("pass")}
                </div>
                <div className="button-container">
                    <input type="submit" />
                </div>
            </form>
        </div>
    );

    return (

        <div className="form">
            <div className="login-form">
                <div className="title">Logga in som member</div>
                {isSubmitted ? <div >
                    <div >Användaren är inloggad</div>
                    <Link className="entry-message" to={'/addpostform'}>OK</Link>
                </div> : renderForm}
            </div>
        </div>
    );
};


export default Login