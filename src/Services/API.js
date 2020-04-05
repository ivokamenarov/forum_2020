import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import {topics, addTopic} from './data'
const instance = axios.create({
    baseURL: 'http://localhost:8082/api'
});

function getAccessToken() {
    return localStorage.getItem('access_token')
}

instance.defaults.headers.post['Content-Type'] = 'application/json';
instance.interceptors.request.use(request => {
    request.headers['Authorization'] = `bearer ${getAccessToken()}`;
    return request;
});

// Function that will be called to refresh authorization
const refreshAuthLogic = failedRequest => {
    const inst = axios.create({
        baseURL: 'http://localhost:8082/',
        auth: {
            username: 'trusted',
            password: 'secret'
        },
    });
    return inst.post('/oauth/token?grant_type=refresh_token&refresh_token='+localStorage.getItem('refresh_token'))
    .then(tokenRefreshResponse => {
        localStorage.setItem('access_token', tokenRefreshResponse.data.access_token)
        localStorage.setItem('refresh_token', tokenRefreshResponse.data.refresh_token)
        failedRequest.response.config.headers['Authorization'] = 'bearer ' + tokenRefreshResponse.data.access_token;
        return Promise.resolve();
    })
    .catch(() => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
    })
}

// Instantiate the interceptor (you can chain it as it returns the axios instance)
createAuthRefreshInterceptor(instance, refreshAuthLogic);


function fetchUsers() {
    let res = instance.get('/users');
    return res
}

function createUser(user) {
    return instance.post('/users', user)
}

function loginUser(user) {
    const {username, password} = user
    const inst = axios.create({
        baseURL: 'http://localhost:8082/',
        auth: {
            username: 'trusted',
            password: 'secret'
        },
    });
    return inst.post(`/oauth/token?grant_type=password&password=${password}&username=${username}`)
}

const fetchAllTopics = () => {
    return instance.get('topics')
}

const fetchTopicData = (topicId) => {
    return instance.get(`topics/${topicId}`)
}

const createTopic = (topic) => {
    topic.userId = 1; // should be in backend!!!
    return instance.post('topics', topic)
}

export {
    fetchUsers,
    createUser,
    loginUser,
    fetchAllTopics,
    fetchTopicData,
    createTopic
}