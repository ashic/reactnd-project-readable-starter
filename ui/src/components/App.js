import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap-material-design/dist/css/bootstrap-material-design.min.css'
import 'bootstrap-material-design/dist/js/material.min.js'
import '../App.css';
import Header from './header'
import Posts from './posts'
import Post from './post'
import Form from './form'
import { Switch, Route } from 'react-router-dom'

const NotFound = () =>
  <div>
    <h3>Not Found</h3>
    <div>
      The page could not be found.
    </div>
  </div>

class App extends Component {

  render() {
    return (
      <div>
        <Header />
        <div className='main-content'>
          <Switch>
            <Route exact path='/not-found' component={NotFound} />
            <Route exact path='/' component={Posts} />
            <Route exact path='/:category' component={Posts} />
            <Route exact path='/:category/:post_id' component={Post} />
            <Route component={NotFound} />
          </Switch>
          <Form />
        </div>
      </div>
    );
  }
}

export default App;
