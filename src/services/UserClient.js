import axios from 'axios'

const http = axios.create({
    baseURL: /* process.env.REACT_APP_API_URL || */ 'http://localhost:3000',
    withCredentials: true
})

http.interceptors.response.use(function(response) {
    return response.data;
}, function (error) {
    if (error.response?.status === 401) {
        localStorage.clear()
        window.location.assign('/login')
    }

    return Promise.reject(error);
});

export const login = ({ email, password }) => http.post('/login', { email, password })

export const getUser = (id) => http.get(`/user/${id}`);

export const getContacts = () => http.get('/contacts')

export const getNetwork = () => http.get('/network')