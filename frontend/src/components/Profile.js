import '../styles/Profile.css'                                          //css Import
import groupoRed from '../logos-icons/icon-left-font-groupo-red.png'    //GroupoRed logo import
import AuthService from '../services/auth-serv'                         //AuthService service import
import React from 'react'                                               //React import
import { Link } from 'react-router-dom'                                 //React router dom import (Link)

const Profile = () => {                                      //Profile component creation
    const currentUser = AuthService.getCurrentUser()

    return (                                                //Profil component render (display)
        <main className="block-profile">
            <img className="groupo-red" src={groupoRed} alt="Groupomania" />
            <h1>Profile</h1>
            <div className="border-block">
                <div className="block-item-profile">
                    <p>
                        <strong>Pseudo:</strong> {currentUser.pseudo}
                    </p>
                    <p>
                        <strong>Email:</strong> {currentUser.email}
                    </p>
                </div>
            </div>
            <Link to="/posts" className="back-post-list" alt="Retour à la liste de posts">Retour à la liste des posts</Link>
        </main>
    )
}

export default Profile                                      //Profile component export