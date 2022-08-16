                                                            //Import:
import '../../styles/Auth.css'                              //css
import AuthService from '../../services/auth-serv'          //AuthService service
import CheckButton from 'react-validation/build/button'     //Form validation CheckButton
import Form from 'react-validation/build/form'              //Form (react validation)
import Input from 'react-validation/build/input'            //Input (react validation)
import React, { useState, useRef } from 'react'             //React (suseState, useRef)
import { useNavigate } from 'react-router-dom'              //React router dom (useNavigate)

const required = value => {                                 //To make input fields required
    if (!value) {
        return (
            <div className="error-msg" role="alert">
                Champs obligatoires
            </div>
        )
    }
}

const Signin = () => {                                      //Signin component creation
    const navigate = useNavigate()                          //For navigation
    const form = useRef()                                   //
    const checkBtn = useRef()                               //
    const [email, setEmail] = useState('')                  //      Definition of states
    const [password, setPassword] = useState('')            //
    const [message, setMessage] = useState('')              //

    function onChangeEmail(e) {                             //Definition of states when changing email
        const email = e.target.value
        setEmail(email)
    }
    function onChangePassword(e) {                          //Definition of states when changing password
        const password = e.target.value
        setPassword(password)
    }
    function handleSignin(e) {                              //Signin managment
        e.preventDefault()
        setMessage('')
        form.current.validateAll()
        if (checkBtn.current.context._errors.length === 0) {
            AuthService.signin(email, password).then(
                () => {
                    navigate('/posts')
                    window.location.reload()
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                    setMessage(resMessage)
                }
            )
        }
    }
    
    return (                                                //Signin component render (display)
        <main className="block-form">
            <h1 className="connection-h1">Connexion</h1>
            <Form className="form-signin" onSubmit={handleSignin} ref={form}>
                <div className="block-signin">
                    <label className="label-signin" htmlFor="email">
                        E-mail
                        <Input
                            type="text"
                            className="input-signin"
                            name="email"
                            alt="Input email"
                            value={email}
                            onChange={onChangeEmail}
                            validations={[required]}
                        />
                    </label>
                    <label className="label-signin" htmlFor="password">
                        Mot de passe
                        <Input
                            type="password"
                            className="input-signin"
                            name="password"
                            alt="Input mot de passe"
                            value={password}
                            onChange={onChangePassword}
                            validations={[required]}
                        />
                    </label>
                    <button className="btn-signin" alt="Bouton de connexion">
                        <span>Se connecter</span>
                    </button>
                </div>
                {message && (
                    <div className="error-msg" role="alert">
                        {message}
                    </div>
                )}
                <CheckButton style={{ display: 'none' }} ref={checkBtn} />
            </Form>
        </main>
    )
}

export default Signin           //Signin export