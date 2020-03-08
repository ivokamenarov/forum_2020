import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import useFetchData from '../Services/useFetchData'
import {fetchTopicData} from '../Services/API'

export default (props) => {
    const {loading, data} = useFetchData(fetchTopicData(props.match.params.topicId))
    let title =''
    if (data && data.data) title= data.data.title
    return <>
        {loading ? <CircularProgress/> :
            <h1>{title}</h1>
        }
        </>
}