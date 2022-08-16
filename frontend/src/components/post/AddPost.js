import '../../styles/AddPost.css'                                       //css import
import groupoRed from '../../logos-icons/icon-left-font-groupo-red.png' //GroupoRed logo import
import AuthService from '../../services/auth-serv'                      //AuthService service import
import PostDataService from '../../services/post-serv'                  //PostDataService service import
import React, { useState } from 'react'                                 //React import (useState)
import { Link } from 'react-router-dom'                                 //React router dom import (Link)

const AddPost = () => {                                                 //AddPost component creation
    const currentUser = AuthService.getCurrentUser()                    //Current user recovery
    const [post, setPost] = useState('')                                //
    const [message, setMessage] = useState('')                          //      Definition of states
    const [selectedFile, SetSelectedFile] = useState('')                //

    function handleInputChange(event) {                                 //Change event managment
        const { name, value } = event.target
        setPost({ ...post, [name]: value })
    }
    function handleFileSelect(e) {                                      //Image loading management
        SetSelectedFile(e.target.files[0])
    }
    function savePost(e) {                                              //Save post
        e.preventDefault()
        setMessage('')
        const data = {
            author: currentUser.pseudo,
            title: post.title,
            description: post.description,
            imageUrl: selectedFile,
        }
        PostDataService.create(data)
            .then(data => {
                setMessage('Post créé avec succès')
                return data
            })
            .catch(error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString()
                setMessage(resMessage)
            })
    }

    return (                                                            //AddPost component render (display)
        <main className="block-addpost">
            <img className="groupo-red" src={groupoRed} alt="Groupomania" />
            <h1>Créer un Post</h1>
            <form
                className="block-item-addpost"
                contentype="multipart/form-data"
            >
                <label className="label-addpost" htmlFor="title">
                    Titre:
                    <textarea
                        type="text"
                        className="textarea-addpost"
                        id="title"
                        alt="Textarea titre"
                        required
                        value={post.title}
                        onChange={handleInputChange}
                        name="title"
                        maxLength={30}
                        placeholder="30 caractères maximum"
                    />
                </label>
                <label className="label-addpost" htmlFor="description">
                    Description:
                    <textarea
                        type="text"
                        className="textarea-addpost"
                        id="description"
                        alt="Textarea description"
                        required
                        value={post.description}
                        onChange={handleInputChange}
                        name="description"
                        maxLength={255}
                        placeholder="255 caractères maximum"
                    />
                </label>
                <label className="label-addpost" htmlFor="imageUrl">
                    Image:
                    <input
                        type="file"
                        name="imageUrl"
                        id="imageUrl"
                        alt="Input image"
                        onChange={handleFileSelect}
                    />
                </label>
                <button onClick={savePost} className="btn-addpost" alt="Bouton d'ajout du post">
                    Ajouter le post
                </button>
            </form>
            {message && (
                <div className="posts-msg" role="alert">
                    {message}
                </div>
            )}
            <Link to="/posts" className="back-post-list" alt="Retour à la liste des posts">Retour à la liste des posts</Link>
        </main>
    )
}

export default AddPost                          //AddPost component export