import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import _ from 'lodash'
import * as actions from '../../actions'
import PostView from './postView'
import Comments from '../comments'

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

    render() {
        return (
            <div>
                <PostView dispatch={this.props.dispatch} {...this.props.post} />
                <Comments comments={this.props.comments} />
            </div>
        )
    }

}

const mapStateToProps = (state, props) => {
    const postId = props.match.params.post_id
    const post = _.find(state.posts.posts, x => x.id === postId)
    return {
        post: _.clone(post),
        comments: _.get(state.posts, `comments.${postId}`)
    }
}

export default connect(mapStateToProps)(withRouter(Post))

