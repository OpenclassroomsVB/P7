import http from '../http-common'                       //Http-common import
import authHeader from './authHeader'                   //AuthHeader import

async function getAll(id) {                             //Retrieving the authentication header and the access token
    const response = await http.get(`/Likes/${id}`, { headers: authHeader() })
    return response.data
}
function like(id, data) {                               //Retrieving the authentication header and the access token 
    return http.post(`/Likes/${id}`, data, { headers: authHeader() })
}
const LikeService = {
    getAll,
    like,
}

export default LikeService                              //LikeService service export