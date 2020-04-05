import React from 'react'
import AllTopics from './AllTopicsComponent'

const HomeComponent = (props) => {
    const username = localStorage.getItem('user')
    return <>
            <h1>{process.env.REACT_APP_TEST}, {username}</h1>
            <AllTopics />
        </>
}

export default HomeComponent