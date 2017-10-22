import React, { Component } from 'react'
import _ from 'lodash'
import { Panel } from 'react-bootstrap'
import CommentList from './list'

class Comments extends Component {


    render() {
        return (
            <div>
                <h3>Comments</h3>
                <CommentList comments={this.props.comments} />
            </div>
        )
    }

}

export default Comments