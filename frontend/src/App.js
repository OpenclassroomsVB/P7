                                                    //Import :
import './App.css'                                  //css
import Navbar from './components/Navbar'            //Navbar component
import Home from './components/Home'                //Home component
import Signin from './components/auth/Signin'       //Signin component
import Signup from './components/auth/Signup'       //Signup component
import Profile from './components/Profile'          //Profile component
import PostList from './components/post/PostList'   //PostList component
import AddPost from './components/post/AddPost'     //AddPost component
import Post from './components/post/Post'           //Post component
import Like from './components/post/Like'           //Like component
import React from 'react'                           //React
import { Routes, Route } from 'react-router-dom'    //React router dom (Routes, Route)

function App() {                                    //App function creation (display starting point for the application)
    
    return (
        <div className="block-app">
            <Navbar />                                              {/*Navigation bar*/}
            <Routes>                                                {/*Different routes*/}
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/register" element={<Signup />} />
                <Route path="/user/:id" element={<Profile />} />
                <Route path="/posts" element={<PostList />} />
                <Route path="/add" element={<AddPost />} />
                <Route path="/posts/:id" element={<Post />} />
                <Route path="/likes/:id" element={<Like />} />
            </Routes>
        </div>
    )
}

export default App                                  //App function export