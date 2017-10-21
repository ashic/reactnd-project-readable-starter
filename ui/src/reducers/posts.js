import * as actions from '../actions'
import _ from 'lodash'

export default (state = {posts: [], sort: {key:null, dir: -1}}, action) => {
    switch(action.type) {
        case actions.POSTS_FETCHED: 
            return {
                ...state,
                posts: action.posts
            }
        case actions.POST_FETCHED:
            const post = _.find(state.posts, x => x.id === action.post.id)
            return  {
                ...state,
                posts: post? _.map(state.posts, p => p.id === action.post.id ? _.assignIn(p, action.post) : p) : [...state.posts, action.post]
            }
        case actions.COMMENTS_FETCHED:
            return {
                ...state,
                posts: _.map(state.posts, p => p.id === action.postId? _.assignIn(p, {comments: _.size(action.comments)}): p)
            }
        case actions.SORT_POSTS:
            const newDir = state.sort.key === action.field ? state.sort.dir * -1 : -1;

            return {
                ...state,
                posts: _.sortBy(state.posts, post => newDir * post[action.field]),
                sort: {
                    key: action.field,
                    dir: newDir
                }
            }
        default:
            return state
    }
}