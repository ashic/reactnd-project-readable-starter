import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import _ from 'lodash'
import * as actions from '../../actions'
import Tools from './tools'
import PostView from './postView'
import Comments from '../comments'
import {Redirect} from 'react-router-dom'

class Post extends Component {

    constructor(...args) {
        super(...args)
        this.state = { post_id: null }
    }


    __fetchPost(props) {
        if (this.state.post_id !== props.match.params.post_id) {
            this.setState({ post_id: props.match.params.post_id },
                () => {
                    props.dispatch(actions.fetchPost(props.match.params.post_id))
                })
        }
    }

    componentDidMount() {
        this.__fetchPost(this.props)
    }


    componentWillReceiveProps(props) {
        this.__fetchPost(props)
    }

    showEdit() {
        this.props.dispatch(actions.showPostEditForm(this.props.post))
    }

    showCreate() {
        this.props.dispatch(actions.showNewPostForm(this.props.categories))
    }

    deletePost() {
        this.props.dispatch(actions.deletePost(this.props.post.id))
            .then(()=> this.props.history.push('/'))
    }

    render() {
        return this.props.post ? (
            <div>
                <Tools onEdit={ () => this.showEdit() } onCreate={ () => this.showCreate() } onDelete={ () => this.deletePost() } />
                <PostView dispatch={this.props.dispatch} {...this.props.post} />
                <Comments comments={this.props.comments} postId={this.props.match.params.post_id} />
            </div>
        ) : <Redirect to='/not-found' />
    }

}

const mapStateToProps = (state, props) => {
    const postId = props.match.params.post_id
    const post = _.find(state.posts.posts, x => x.id === postId)
    return {
        post: _.clone(post),
        comments: _.get(state.posts, `comments.${postId}`),
        categories: state.categories.categories
    }
}

export default connect(mapStateToProps)(withRouter(Post))

