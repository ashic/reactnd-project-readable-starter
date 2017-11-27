import React, { Component } from 'react'
import _ from 'lodash-uuid'
import { Panel, Button } from 'react-bootstrap'
import CommentList from './list'
import { connect } from 'react-redux'
import * as actions from '../../actions'

class Comments extends Component {


    showCommentForm(id=_.uuid()) {
        this.props.dispatch(actions.showCommentForm({
            id,
            timestamp: Date.now(),
            parentId: this.props.postId
        }))
    }

    render() {
        return (
            <div>
                <h3>Comments</h3>
                <Button bsSize='large' className='btn-raised' onClick={() => this.showCommentForm()}><span className='glyphicon glyphicon-plus-sign'></span></Button>
                <CommentList comments={this.props.comments} />
            </div>
        )
    }

}

export default connect(null)(Comments)