import { CropLandscapeOutlined } from "@mui/icons-material";
import { createContext, useState } from "react";

export const AuthContext = createContext();



export const AuthContexProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [currentPost, setCurrentPost] = useState()

  const login = async (user) => {
    const url = "http://localhost:8080/auth/login";

    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user.username,
        password: user.password,
      }),
    });

    localStorage.setItem("jwt", await response.text())
    console.log(user, " this is the user un conternertxt")
    setCurrentUser(user)
    localStorage.setItem("user", JSON.stringify({ name: user.username, username: user.username }))

    console.log(currentUser, " this is currentuser in context.js")

  };

  const logout = async () => {
    localStorage.clear();
    setCurrentUser({ username: "", token: "" })
  };



  return (
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser, login, logout, currentPost, setCurrentPost }}
    >
      {children}
    </AuthContext.Provider>
  );
};
