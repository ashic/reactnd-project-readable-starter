import React, { Component } from 'react'

import Posts from './list'
import Tools from './tools'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import { withRouter } from 'react-router'
import _ from 'lodash'

/*Listed posts are displayed with 
title, 
author, 
number of comments, 
current score, 
and a voting mechanism to upvote or downvote the post. 
Posts should have buttons or links for editing or deleting that post.


All posts for a category are listed at /:category

List pages (root or category) include a mechanism for sorting by date or by score (at a minimum) and the sort works properly

*/
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

    render() {
        return (
            <div>
                <Tools categories={this.props.categories} selected={this.props.match.params.category}/>
                <Posts postSummaries={this.props.postSummaries} onEdit={id => this.showPostEdit(id)} />
            </div>
        ) 
    }
}

const mapStateToProps = (state) => ({
    postSummaries: state.posts.posts,
    categories: state.categories.categories
})

export default connect(mapStateToProps)(withRouter(me))