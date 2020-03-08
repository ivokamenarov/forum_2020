import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import {loginUser} from '../Services/API'
import {useHistory} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: 300,
            display: 'block'
        },
    },
}));
const FormLogin = (props) => {
    const classes = useStyles();
    const history = useHistory();

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        const user = {
            username,
            password
        }
        setLoading(true)
        loginUser(user)
            .then(res => {
                localStorage.setItem('access_token', res.token)
                localStorage.setItem('user', username)
                setLoading(false)
                history.push('/')
            })
            .catch(res => {
                setError(res.error)
                setLoading(false)
            })
    }

    return <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField id="username" label="Username" required error={error!==''}
            helperText={error}
            variant="outlined" value={username} onChange={(e)=>setUsername(e.target.value)}/>
        <TextField id="password" label="Password" variant="outlined" type="password" required
            value={password} onChange={(e)=>setPassword(e.target.value)}/>
        {loading ? <CircularProgress /> :
            <Button variant="contained" color="primary" type="submit">Submit</Button>}
    </form>
}

export default FormLogin;
