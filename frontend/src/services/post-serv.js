import http from '../http-common'                   //Http-common import
import authHeader from './authHeader'               //AuthHeader import

////Retrieving the authentication header and the access token for each function and data storage////
async function getAll() {
    const response = await http.get('/posts', { headers: authHeader() })
    return response.data
}
async function get(id) {
    const response = await http.get(`/posts/${id}`, { headers: authHeader() })
    return response.data
}
function create(data) {
    return http.post('/posts', data, { headers: authHeader() })
}
function update(id, data) {
    return http.put(`/posts/${id}`, data, { headers: authHeader() })
}
function remove(id) {
    return http.delete(`/posts/${id}`, { headers: authHeader() })
}
const PostService = {
    getAll,
    get,
    create,
    update,
    remove,
}

export default PostService                        //PostService service export