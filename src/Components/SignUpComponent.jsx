import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {createUser} from '../Services/API'
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

export default function BasicTextFields() {
    const classes = useStyles();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const history = useHistory()
    const handleSubmit = (e) => {
        e.preventDefault()
        const user = {
            username,
            password,
            firstName,
            lastName,
            role: 'user'
        }
        createUser(user)
            .then(() => history.push('/users'))
            .catch((error) => console.log('Error: ', error))
    }
    return (
        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField id="username" label="Username"
                variant="outlined" value={username} onChange={(e)=>setUsername(e.target.value)}/>
            <TextField id="password" label="Password" variant="outlined" type="password"
                value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <TextField id="firstName" label="First Name" variant="outlined"
                value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
            <TextField id="lastName" label="Last Name" variant="outlined"
                value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
            <Button variant="contained" color="primary" type="submit">Submit</Button>
        </form>
    );
}