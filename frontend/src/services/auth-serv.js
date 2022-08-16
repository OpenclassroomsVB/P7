import axios from 'axios'                                       //Axios import
import { Navigate } from 'react-router-dom'                     //React router dom import (Navigate)
const API_URL = 'http://localhost:8080/api/auth/'               //API url settings

async function signup(pseudo, email, password) {                //Fetching signup data via axios
    const response = await axios.post(API_URL + 'signup', {
        pseudo,
        email,
        password,
    })
    return response.data
}

async function signin(email, password) {                        //Fetching signup data via axios
    const response = await axios.post(API_URL + 'signin', {
        email,
        password,
    })
    if (response.data.accessToken) {
        sessionStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

function logout() {                                             //Logout function creation
    sessionStorage.removeItem('user')
    Navigate('/')
}

function getCurrentUser() {                                     //Get current user function creation
    return JSON.parse(sessionStorage.getItem('user'))
}

const AuthService = {
    signup,
    signin,
    logout,
    getCurrentUser,
}

export default AuthService                                      //AuthService service export