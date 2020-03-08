import axios from 'axios'
import {topics, addTopic} from './data'
const instance = axios.create({
    baseURL: 'http://localhost:8082/api'
});

instance.defaults.headers.post['Content-Type'] = 'application/json';


function fetchUsers() {
    let res = instance.get('/users');
    return res
}

function createUser(user) {
    return instance.post('/users', user)
}

function loginUser(user) {
    const {username, password} = user
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (username === 'qwe' && password === '123') {
                resolve({token: 'access_token:123123'})
            } else {
                reject({
                    error: 'Wrong username or password.'
                })
            }
        }, 1000)
    })
}

const fetchAllTopics = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({data: topics})
        }, 1000)
    })
}

const fetchTopicData = (topicId) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const id = parseInt(topicId)
            const topic = topics.filter(t => t.id === id)[0]
            resolve({data: topic})
        }, 1000)
    })
}

const createTopic = (topic) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const topicId = addTopic(topic)
            resolve({data: {topicId}})
        }, 1000)
    })
}

export {
    fetchUsers,
    createUser,
    loginUser,
    fetchAllTopics,
    fetchTopicData,
    createTopic
}