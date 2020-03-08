import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, Link} from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import {Home, Users, NavBar, SignUp, Login, Topic} from './Components'

function App() {
  return <BrowserRouter>
    <NavBar />
    {/* <Link to='/'>Home</Link>
    <Link to='/users'>Users</Link> */}
    <Switch>
      <Route path='/' exact component={Home} />
      <Route path='/users' component={Users} />
      <Route path='/signup' component={SignUp} />
      <Route path='/login' component={Login} />
      <Route path='/topics/:topicId' component={Topic} />
    </Switch>
  </BrowserRouter>
}

export default App;
