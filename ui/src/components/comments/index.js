import React, { Component } from 'react'
import _ from 'lodash-uuid'
import { Button } from 'react-bootstrap'
import CommentList from './list'
import { connect } from 'react-redux'
import * as actions from '../../actions'

class Comments extends Component {


    showCommentForm(id = _.uuid()) {
        this.props.dispatch(actions.showCommentForm({
            id,
            timestamp: Date.now(),
            parentId: this.props.postId
        }))
    }

    onEdit({ id, body }) {
        this.props.dispatch(actions.showEditCommentForm({
            id,
            timestamp: Date.now(),
            body
        }, this.props.postId))
    }

    onDelete(id) {
        this.props.dispatch(actions.deleteComment(id))
    }

    render() {
        return (
            <div>
                <h3>Comments</h3>
                <Button bsSize='large' className='btn-raised'
                    onClick={() => this.showCommentForm()}>
                    <span className='glyphicon glyphicon-plus-sign'></span>
                </Button>
                <CommentList comments={this.props.comments}
                    onEdit={data => this.onEdit(data)}
                    onDelete={id => this.onDelete(id)}
                />
            </div>
        )
    }

}

export default connect(null)(Comments)