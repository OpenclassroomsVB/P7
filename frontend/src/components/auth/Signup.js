                                                        //Import:
import '../../styles/Auth.css'                          //css
import AuthService from '../../services/auth-serv'      //AuthService service
import Form from 'react-validation/build/form'          //Form (react validation)
import Input from 'react-validation/build/input'        //Input (react validation)
import CheckButton from 'react-validation/build/button' //Form validation CheckButton
import React, { useState, useRef } from 'react'         //React (useState, useRef)
import { useNavigate } from 'react-router-dom'          //React router dom (useNavigate)
import { isEmail } from 'validator'                     //Validator (isEmail)

const required = value => {                             //To make input fields required
    if (!value) {
        return (
            <div className="error-msg" role="alert">
                Champ obligatoire
            </div>
        )
    }
}

const pseudoValue = value => {                          //Checking the validity of the pseudo value
    if (value.length < 4 || value.length > 20) {
        return (
            <div className="error-msg" role="alert">
                Le pseudo doit comprendre entre 4 et 20 caractères
            </div>
        )
    }
}

const validEmail = value => {                           //Checking the validity of the email value
    if (!isEmail(value)) {
        return (
            <div className="error-msg" role="alert">
                Adresse e-mail non valide
            </div>
        )
    }
}

const passwordValue = value => {                        //Checking the validity of the password value
    const passwordRegex = /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/
    if (!passwordRegex.test(value)) {
        return (
            <div className="error-msg" role="alert">
                Le mot de passe doit comprendre au moins, 8 caractères, une minuscule, une majuscule et un caractère spécial (@#$%^&+=)
            </div>
        )
    }
}

const Signup = () => {                                  //Signup component creation
    const navigate = useNavigate()                      //For navigation
    const form = useRef()                               //
    const checkBtn = useRef()                           //
    const [pseudo, setPseudo] = useState('')            //      Definition of states
    const [email, setEmail] = useState('')              //
    const [password, setPassword] = useState('')        //
    const [message, setMessage] = useState('')          //

    function onChangePseudo(e) {                        //Definition of states when changing pseudo
        const pseudo = e.target.value
        setPseudo(pseudo)
    }
    function onChangeEmail(e) {                         //Definition of states when changing email
        const email = e.target.value
        setEmail(email)
    }
    function onChangePassword(e) {                      //Definition of states when changing password
        const password = e.target.value
        setPassword(password)
    }
    function handleSignup(e) {                          //Signup managment
        e.preventDefault()
        setMessage('')
        form.current.validateAll()
        if (checkBtn.current.context._errors.length === 0) {
            AuthService.signup(pseudo, email, password)
                .then(response => {
                    setMessage(response)
                    navigate('/signin')
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
    }

    return (                                            //Signup component render (display)
        <main className="block-form">
            <h1 className="inscription-h1">Inscription</h1>
            <Form className="form-signup" onSubmit={handleSignup} ref={form}>
                <div className="block-signup">
                    <label className="label-signup" htmlFor="pseudo">
                        Pseudo
                        <Input
                            type="text"
                            className="input-signup"
                            name="pseudo"
                            alt="Input pseudo"
                            value={pseudo}
                            onChange={onChangePseudo}
                            validations={[required, pseudoValue]}
                        />
                    </label>
                    <label className="label-signup" htmlFor="email">
                        E-mail
                        <Input
                            type="text"
                            className="input-signup"
                            name="email"
                            alt="Input email"
                            value={email}
                            onChange={onChangeEmail}
                            validations={[required, validEmail]}
                        />
                    </label>
                    <label className="label-signup" htmlFor="password">
                        Mot de passe
                        <Input
                            type="password"
                            className="input-signup"
                            name="password"
                            alt="Input mot de passe"
                            value={password}
                            onChange={onChangePassword}
                            validations={[required, passwordValue]}
                        />
                    </label>
                    <button className="btn-signup" alt="Bouton d'inscription">S'inscrire</button>
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

export default Signup               //Signup export