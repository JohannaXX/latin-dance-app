import axios from 'axios'

const http = axios.create({
    //baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
    baseURL: 'https://latin-dance-app-backend.herokuapp.com',
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


export const createUser = (body) => http.post('/user', body, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});

export const activateUser = (token) => http.get(`/activation/${token}`);

export const login = ({ email, password }) => http.post('/login', { email, password });

export const socialLogin = ( code ) => http.get('/auth/slack', { params: { code }});

//export const loginWithGoogle = ( code ) => http.get('/auth/google', { params: code });
export const loginWithGoogle = ( ) => http.get('/auth/google');

export const logout = () => http.post('/logout');

export const getUser = (id) => http.get(`/user/${id}`);

export const updateUser = (body) => http.patch(`/user/update`, body, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
});

export const deleteUser = (id) => http.delete(`/user/${id}/delete`);

export const getContacts = () => http.get('/contacts');

export const getNetwork = () => http.get('/network');

export const updateMatch = (id, status) => http.patch(`/match/${id}/update`, { status });

export const requestCreateMatch = (id) => http.post('/match', { id });

