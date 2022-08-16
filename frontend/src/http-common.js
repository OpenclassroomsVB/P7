import axios from 'axios'                           //Axios import

export default axios.create({                       //Defining the url and headers for axios requests
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-type': 'multipart/form-data',
    },
})
