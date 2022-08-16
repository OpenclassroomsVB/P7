import logoWhite from '../logos-icons/icon-left-font-monochrome-white-logo.png' //LogoWhite import
import AuthService from '../services/auth-serv'                                 //AuthService service import
import React from 'react'                                                       //React import
import { Link } from 'react-router-dom'                                         //React router dom import (Link)
const currentUser = AuthService.getCurrentUser()                                //Current user recovery

const Navbar = () => {                                      //Navbar component creation
    return currentUser ? (               //if current user: //Navbar component render (display)
        <nav className="connected-nav-bar">
            <Link to="/" className="nav-link" onClick={AuthService.logout} alt="Se déconnecter">
                Se déconnecter
            </Link>
            <Link to={"/user/" + currentUser.id} className="nav-link" alt="Profile">
                Profile
            </Link>
            <div>
                <img className="logo-white" src={logoWhite} alt="Logo Groupomania" />
            </div>
            <Link to="/posts" className="nav-link" alt="Accueil">
                Accueil
            </Link>
            <Link to={"/add"} className="nav-link" alt="Ajouter un post">
                Ajouter un Post
            </Link>
        </nav>
    ) : (                               //if not current user: //Navbar component render (display)
        <nav className="not-connected-nav-bar">
            <Link to={"/signin"} className="nav-link" alt="Connexion">
                CONNEXION
            </Link>
            <div>
                <img className="logo-white" src={logoWhite} alt="Logo Groupomania" />
            </div>
            <Link to={"/register"} className="nav-link" alt="Inscription">
                INSCRIPTION
            </Link>
        </nav>
    )
}

export default Navbar                                       //Navbar component export