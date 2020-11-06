import axios from 'axios';

const http = axios.create({
    //baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
    baseURL: 'https://latin-dance-app-backend.herokuapp.com',
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


export const cancelMessage = (id) => http.delete(`/chat/message/${id}/delete`);

export const updateMessage = (id, message) => http.patch(`/chat/message/${id}/edit`, { message });

export const createMessage = (id, message) => http.post(`/chat/${id}/messages`, { message })

export const getChat = (id) => http.get(`/chat/${id}`);

export const getChatList = (limit) => http.get('/chats', {params: {limit}});

export const createChat = (members) => http.post('/chat', { members });

