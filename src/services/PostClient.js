import axios from 'axios';

const http = axios.create({
    baseURL: /* process.env.REACT_APP_API_URL || */ 'http://localhost:3000',
    withCredentials: true
});

http.interceptors.response.use(function(response) {
    return response.data;
}, function (error) {
    if (error.response?.status === 401) {
        localStorage.clear()
        window.location.assign('/login')
    }

    return Promise.reject(error);
});

export const getPosts = () => http.get('/');

export const createPosts = ( body, image ) => http.post('/post', { body, image });

export const handleLikes = ( id ) => http.get(`/post/${id}/like`);

