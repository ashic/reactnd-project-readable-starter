import * as api from '../api'
import _ from 'lodash'
import { toastr } from 'react-redux-toastr'

export const POSTS_FETCHED = 'POSTS_FETCHED'
export const POST_FETCHED = 'POST_FETCHED'
export const COMMENTS_FETCHED = 'COMMENTS_FETCHED'
export const CATEGORIES_FETCHED = 'CATEGORIES_FETCHED'
export const SORT_POSTS = 'SORT_POSTS'

export const postsFetched = (posts) => ({
    type: POSTS_FETCHED,
    posts
})


export const postFetched = (post) => ({
    type: POST_FETCHED,
    post
})

export const commentsFetched = (postId, comments) => ({
    type: COMMENTS_FETCHED,
    postId,
    comments
})

export const categoriesFetched = (categories) => ({
    type: CATEGORIES_FETCHED,
    categories
})

const dispatchPostsFetched = (json, dispatch) => {
    dispatch(postsFetched(json))
    const cs = _.map(json, x =>
        api.fetchComments(x.id)
            .then(js => dispatch(commentsFetched(x.id, js))
            )
    )
}

export const fetchPosts = () => dispatch =>
    api.fetchPosts()
        .then(json => dispatchPostsFetched(json, dispatch))

export const fetchPost = (postId) => dispatch => 
    api.fetchPost(postId)
        .then(json => dispatch(postFetched(json)))
        .then(() => api.fetchComments(postId).then(js => dispatch(commentsFetched(postId, js))))

export const fetchPostsForCategory = (category) => dispatch =>
    api.fetchPostsForCategory(category).then(json => dispatchPostsFetched(json, dispatch))

export const votePost = (postId, option) => disptach =>
    api.votePost(postId, option)
        .then(post => disptach(postFetched(post)))
        .then(() => toastr.success("Vote posted.", "Your vote was registered successfully."))


export const voteComment = (commentId, option) => dispatch => 
    api.voteComment(commentId, option)
        .then(comment => dispatch(commentsFetched(comment.parentId, [comment])))
        .then(() => toastr.success("Vote posted.", "Your vote was registered successfully."))

export const fetchCategories = () => dispatch =>
    api.fetchCategories()
        .then(categories => dispatch(categoriesFetched(categories)))

export const sortPosts = (field) => ({
    type: SORT_POSTS,
    field
})
