import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import useFetchData from '../Services/useFetchData'
import {fetchTopicData} from '../Services/API'

export default (props) => {
    const {loading, data} = useFetchData(fetchTopicData, props.match.params.topicId)
    return <>
        {loading && <CircularProgress/>}
        {!loading && data.data &&
            <>
                <h1>{data.data.title}</h1>
                <p>{data.data.description}</p>
                {/* <ListReplies replies={data.data.replies} /> */}
            </>
        }
        </>
}