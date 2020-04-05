import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import {createTopic} from '../Services/API'
import {useHistory} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: 200,
            display: 'block'
        },
    },
}));

export default (props) => {
    const classes = useStyles();
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [reply, setReply] = useState('')

    const history = useHistory()
    const handleSubmit = (e) => {
        e.preventDefault()
        const topic = {
            title,
            description,
            replyText: reply
        }
        createTopic(topic)
            .then((res) => history.push(`/topics/${res.data.id}`))
            .catch((error) => console.log('Error: ', error))
    }
    return (
        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField id="title" label="Title"
                variant="outlined" value={title} onChange={(e)=>setTitle(e.target.value)}/>
            <TextareaAutosize id="description" placeholder="Description" variant="outlined"
                rows={4} value={description} onChange={(e)=>setDescription(e.target.value)}/>
            <TextareaAutosize id="reply" placeholder="Reply" variant="outlined"
                rows={4} value={reply} onChange={(e)=>setReply(e.target.value)}/>
            <Button variant="contained" color="primary" type="submit">Submit</Button>
        </form>
    );
}