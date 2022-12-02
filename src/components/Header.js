import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../Views/css/Header.css";
import { AuthContext } from "../context";

export const Header = () => {
  const { login, setCurrentUser, currentUser } = useContext(AuthContext);
  let user = "";
  if (currentUser) {
    user = currentUser;
  }

  async function logoutUser() {
    localStorage.clear();
    setCurrentUser(null);
  }

  return (
    <div className="header">
      <Link className="blogname" to={"/"}>
        BLOGG
      </Link>

      <div className="container">
        <div className="kategorieBlock"></div>
        <div className="searchLoginBlock">
          {currentUser ? (
            <div>
              <Link className="loginButton" onClick={logoutUser}>
                logout {user.username}
              </Link>
              <Link className="loginButton" to={"/addpost"}>
                Add post a post {user.username}
              </Link>
            </div>
          ) : (
            <Link className="loginButton" to={"/login"}>
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
