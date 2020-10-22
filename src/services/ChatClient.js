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

export const getChatList = (limit) => http.get('/chats', {params: {limit}});

export const getChat = (id) => http.get(`/chat/${id}`);