import React from 'react'
import {Jumbotron} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export default (props) => (
    <Jumbotron>
        <h1><Link to='/'>Readable</Link></h1>
    </Jumbotron>
)