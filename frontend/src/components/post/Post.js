import '../../styles/Post.css'                                          //css import
import groupoRed from '../../logos-icons/icon-left-font-groupo-red.png' //GroupoRed logo import
import AuthService from '../../services/auth-serv'                      //AuthService service import
import PostService from '../../services/post-serv'                      //PostDataService service import
import Like from './Like'                                               //Like component import
import React, { useState, useEffect } from 'react'                      //React import (useState, useEffect)
import { useParams } from 'react-router-dom'                            //React router dom import (useParams, useNavigate)
import { Link } from 'react-router-dom'                                 //React router dom import (Link)

const Post = () => {                                            //Post component creation
    const currentUser = AuthService.getCurrentUser()            //Current user recovery
    const { id } = useParams()                                  //Id recovery
    const [currentPost, setCurrentPost] = useState('')          //
    const [message, setMessage] = useState('')                  //      Definition of states
    const [selectedFile, SetSelectedFile] = useState('')        //

    function getPost(id) {                                      //GetPost function creation
        PostService.get(id)                                     //PostId recovery
            .then(response => {
                setCurrentPost(response)
            })
            .catch(e => {
                setMessage(e)
            })
    }
    useEffect(() => {                                           //Definition of PostId state
        if (id) getPost(id)
    }, [id])
    function handleInputChange(event) {                         //Change event managment
        const { name, value } = event.target
        setCurrentPost({ ...currentPost, [name]: value })
    }
    function handleFileSelect(e) {                              //Image loading management
        SetSelectedFile(e.target.files[0])
    }
    function updatePost(e) {                                    //Update post
        e.preventDefault()
        var data = {
            title: currentPost.title,
            description: currentPost.description,
            imageUrl: selectedFile,
        }
        PostService.update(id, data)
            .then(() => {
                setMessage('Post modifié avec succès')
                window.location.href = "/posts";
            })
            .catch(e => {
                setMessage(e)
            })
    }
    function deletePost() {
        PostService.remove(id)
            .then(() => {
                setMessage('Post supprimé avec succès')
                window.location.href = "/posts";

            })
            .catch(() => {
                setMessage('Erreur lors la suppression du post')
            })
    }

    return (                                                    //Post component render (display) :
        <main className="block-posts">
            <img className="groupo-red" src={groupoRed} alt="Groupomania" />
            <h1>Posts</h1>
            {currentUser.pseudo === currentPost.author ||       //Render//If current user is the author of the post or admin
            currentUser.role === "admin" ? (
                <main className="block-author-post">
                    <section className="block-update-post">
                        <form className="form-update-post">
                            <label
                                className="label-update-post"
                                htmlFor="title"
                            >
                                Titre:
                                <input
                                    type="text"
                                    className="input-update-post"
                                    id="title"
                                    name="title"
                                    alt="Input titre"
                                    value={currentPost.title}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label
                                className="label-update-post"
                                htmlFor="description"
                            >
                                Description:
                                <input
                                    type="text"
                                    className="input-update-post"
                                    id="description"
                                    name="description"
                                    alt="Input description"
                                    value={currentPost.description}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label
                                className="label-update-post"
                                htmlFor="imageUrl"
                            >
                                Image:
                                <img className="current-image" src={currentPost.imageUrl} alt="Fichier d'origine" />
                                <input
                                    type="file"
                                    name="imageUrl"
                                    id="imageUrl"
                                    alt="Input image"
                                    onChange={handleFileSelect}
                                />
                            </label>
                        </form>
                        <div className="author-like-author">
                            <div className="author">
                                <p className="author-p">Auteur: {currentPost.author}</p>
                            </div>
                            <Like />
                        </div>
                        <div className="block-btn">
                            <button
                                className="btn-delete"
                                alt="Bouton de suppression du post"
                                onClick={deletePost}
                            >
                                Supprimer
                            </button>
                            <button
                                type="submit"
                                className="btn-update"
                                alt="Bouton de modification du post"
                                onClick={updatePost}
                            >
                                Modifier
                            </button>
                        </div>
                    </section>
                </main>
            ) : (                                               //Render//If current user is not the author of the post or admin
                <main className="block-not-author-post">
                    <section className="content-not-author-post">
                        <div className="title-img">
                            <h2 className="title-post">{currentPost.title}</h2>
                            <img
                                className="post-img"
                                src={currentPost.imageUrl}
                                alt="téléchargé par un utilisateur"
                                />
                        </div>
                        <p className="description">{currentPost.description}</p>
                    </section>
                    <section className="author-like-not-author">
                        <div className="author-not">
                            <p className="author-not-p">Auteur: {currentPost.author}</p>
                        </div>
                        <Like />
                    </section>
                </main>
            )}
            {message && (
                <div className="posts-msg" role="alert">
                    {message}
                </div>
            )}
            <Link to="/posts" className="back-post-list" alt="Retour à la liste des posts">Retour à la liste des posts</Link>
        </main>
    )
}

export default Post                             //Post component export