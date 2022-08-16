import '../../styles/PostList.css'                                              //css import
import groupoRed from '../../logos-icons/icon-left-font-groupo-red.png'         //GroupoRed logo import
import logo from '../../logos-icons/icon-left-font-logo-red.png'                //Logo import
import logoWhite from '../../logos-icons/icon-left-font-monochrome-white.png'   //LogoWhite import
import PostDataService from '../../services/post-serv'                          //PostDataService service import
import React, { useState, useEffect } from 'react'                              //React import (useState, useEffect)
import { Link } from 'react-router-dom'                                         //React router dom import (Link)

const PostList = () => {                                    //PostList component creation
    const [posts, setPosts] = useState([])
    useEffect(() => {                                       //All post recovery
        async function retrievePosts() {
            const response = await PostDataService.getAll()
            setPosts(response)
        }
        retrievePosts()
    }, [])

    return (                                                //PostList component render (display)
        <main className="block-postList">
            <img className="groupo-red" src={groupoRed} alt="Groupomania" />
            <h1>Liste des Posts</h1>
            {posts &&
                posts.map(post => (
                    <Link
                        key={post.id}
                        to={"/posts/" + post.id}
                        className="link"
                        alt="Cliquer pour accéder au post"
                    >
                        <section className="block-postList-item">
                            <img className="logo-red" src={logo} alt="Logo Groupomania" />
                            <div className="postList-item ">
                                <img
                                    className="postList-img"
                                    src={post.imageUrl || logoWhite}
                                    alt="téléchargé par un utilisateur"
                                />
                                <div className="block-infos">
                                    <h2 className="post-title">Titre: {post.title}</h2>
                                    <p>Auteur: {post.author}</p>
                                    <p>Créé le: {post.createdAt}</p>
                                </div>
                                <div className="desc-postList">
                                    <p>Description: </p>
                                    <p>{post.description.substring(0, 60)}...</p>
                                </div>
                            </div>
                        </section>
                    </Link>
                )).reverse()}                               {/*For display in reverse chronological order*/}
        </main>
    )
}

export default PostList                                     //PostList component export