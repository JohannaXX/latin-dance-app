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

export const createPosts = ( body ) => http.post('/post', body , {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
});

export const updatePost = ( id, body ) => http.patch(`/post/${id}/update`, body);

export const handleLikes = ( id ) => http.get(`/post/${id}/like`);

