import React, { Component } from 'react'
import { Panel } from 'react-bootstrap'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import _ from 'lodash'
import * as actions from '../../actions'
import Voter from '../voter'

class PostView extends Component {

    render() {
        
        if (!this.props.id) return (
            <div />
        )
        const { id, title, author, body, timestamp, voteScore } = this.props

        return (
            <Panel>
                <h2>{title}</h2>
                <h4>{author}</h4>
                <div>{Date(timestamp).toString()}</div>
                <Voter voteScore={voteScore} postId={id} />
                <hr />
                <p>
                    {body}
                </p>
            </Panel>
        )
    }

}

class Post extends Component {

    constructor(...args) {
        super(...args)
        this.state = { post_id: null }
    }


    __fetchPost(props) {
        if (this.state.post_id !== props.match.params.post_id) {
            this.setState({ post_id: props.match.params.post_id },
                () => props.dispatch(actions.fetchPost(props.match.params.post_id)))
        }
    }

    componentDidMount() {
        this.__fetchPost(this.props)
    }

    componentWillReceiveProps(props) {
        this.__fetchPost(props)
    }

    render() {
        return <PostView dispatch={this.props.dispatch} {...this.props.post} />
    }

}

const mapStateToProps = (state, props) => {
    const post = _.find(state.posts.posts, x => x.id === props.match.params.post_id)
    return {
        post: _.clone(post)
    }
}

export default connect(mapStateToProps)(withRouter(Post))

