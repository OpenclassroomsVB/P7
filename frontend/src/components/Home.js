import logo from '../logos-icons/icon-left-font.svg'        //logo import
import React from 'react'                                   //React import

const Home = () => {                                        //Home component creation
    return (                                                //Home component render (display)
        <main className="block">
            <div className="block-logo-h1">
                <img className="logo-rotate" src={logo} alt="Logo Groupomania" />
                <p>Bienvenue dans</p>
                <h1>Votre réseau social interne</h1>                
            </div>
        </main>
    )
}

export default Home                                         //Home component export