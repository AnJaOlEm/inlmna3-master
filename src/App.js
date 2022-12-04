import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';
import Register from './components/Register';
import Home from "./Views/Home";
import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { render } from "@testing-library/react";
import Login from './Views/Login.js'
import Addpost from './Views/Addpost.js'
import Blog from "./Views/Blog.js";
import ListUsers from "./Views/ListUsers.js";
import ReadMoreBlog from "./Views/ReadMoreBlog";



function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },

    {
      path: "/login",
      element: <Login />,
    },

    {
      path: "/addpost",
      element: <Addpost />,
    },

    {
      path: "/blog",
      element: <Blog />
    },

    {
      path: "/users",
      element: <ListUsers />
    },



  ]);




  return (
    <div className='App'>

      <RouterProvider router={router} />
      <Register />
      
    </div>
  );


}

export default App;