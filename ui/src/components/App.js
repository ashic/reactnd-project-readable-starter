import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap-material-design/dist/css/bootstrap-material-design.min.css'
import 'bootstrap-material-design/dist/js/material.min.js'
import '../App.css';
import Header from './header'
import Posts from './posts'
import Post from './post'
import { Switch, Route, Redirect } from 'react-router-dom'


class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className='main-content'>
          <Switch>
          <Route exact path='/' component={Posts}/>
          <Route exact path='/:category' component={Posts} />
          <Route exact path='/:category/:post_id' component={Post} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
