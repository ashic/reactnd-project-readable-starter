import React, { Component } from 'react'

import Posts from './list'
import Tools from './tools'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import { withRouter } from 'react-router'
import _ from 'lodash'

class me extends Component {

    constructor(...args) {
        super(...args)

        this.state = { category: null }
    }

    componentDidMount() {
        this.load(this.props, true)
    }

    componentWillReceiveProps(props) {
        this.load(props)
    }

    load(props, force=false) {

        const pCategory = props.match.params.category || null

        if (!_.isEqual(pCategory, this.state.category) || force) {
            this.setState({ category: pCategory }, () => {
                if (!pCategory) {
                    props.dispatch(actions.fetchPosts())
                } else {
                    props.dispatch(actions.fetchPostsForCategory(this.props.match.params.category))
                }

            })
        }

    }

    showPostEdit(id) {
        const post = _.find(this.props.postSummaries, x => x.id === id)
        this.props.dispatch(actions.showPostEditForm(post))
    }    

    deletePost(id) {
        this.props.dispatch(actions.deletePost(id))
    }

    render() {
        return (
            <div>
                <Tools categories={this.props.categories} selected={this.props.match.params.category}/>
                <Posts postSummaries={this.props.postSummaries} onEdit={id => this.showPostEdit(id)} onDelete={id => this.deletePost(id)} />
            </div>
        ) 
    }
}

const mapStateToProps = (state) => ({
    postSummaries: state.posts.posts,
    categories: state.categories.categories
})

export default connect(mapStateToProps)(withRouter(me))