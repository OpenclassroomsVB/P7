export default function authHeader() {                          //AuthHeader function export
    const user = JSON.parse(sessionStorage.getItem('user'))     //User recovery via sessionStorage
    if (user && user.accessToken) {
        return { 'x-access-token': user.accessToken }
    } else {
        return {}
    }
}