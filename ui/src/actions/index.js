import * as api from '../api'
import * as schema from './schemas'
import _ from 'lodash-uuid'
import { toastr } from 'react-redux-toastr'

export const POSTS_FETCHED = 'POSTS_FETCHED'
export const POST_FETCHED = 'POST_FETCHED'
export const POST_DELETED = 'POST_DELETED'
export const COMMENTS_FETCHED = 'COMMENTS_FETCHED'
export const COMMENT_DELETED = 'COMMENT_DELETED'
export const CATEGORIES_FETCHED = 'CATEGORIES_FETCHED'
export const SORT_POSTS = 'SORT_POSTS'
export const CLOSE_FORM = 'CLOSE_FORM'
export const SHOW_FORM = 'SHOW_FORM'

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

export const postDeleted = id => ({
    type: POST_DELETED,
    id
})

export const commentDeleted = id => ({
    type: COMMENT_DELETED,
    id
})

export const categoriesFetched = (categories) => ({
    type: CATEGORIES_FETCHED,
    categories
})

const dispatchPostsFetched = (json, dispatch) => {
    dispatch(postsFetched(json))
    _.map(json, x =>
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
        .then(json =>
            api.fetchComments(postId).then(cjs => {
                if (json.error) {
                    throw new Error(json.error)
                }
                var postDispatch = dispatch(postFetched(json))
                dispatch(commentsFetched(postId, cjs))
                return postDispatch
            }
            )
        )

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


export const showCommentForm = (formData) => dispatch => {
    dispatch({
        type: SHOW_FORM,
        ...schema.commentsForm(),
        data: formData,
        onSubmit:
            data =>
                api.postComment(data).then(x => {
                    dispatch(fetchPost(formData.parentId));
                    dispatch(closeForm())
                    toastr.success("Comment posted.", "Your comment was posted successfully.")
                })
    })
}

export const showEditCommentForm = (formData, parentId) => dispatch => {
    dispatch({
        type: SHOW_FORM,
        ...schema.commentEditForm(),
        data: formData,
        onSubmit:
            data =>
                api.editComment(data).then(x => {
                    dispatch(fetchPost(parentId));
                    dispatch(closeForm())
                    toastr.success("Post updated.", "Your post was updated successfully.")
                })
    })
}

export const deleteComment = id => dispatch => {
    api.deleteComment(id).then(() => {
        toastr.success("Comment deleted.", "The commend was successfully deleted.")
        dispatch(commentDeleted(id))
    })
}

export const showPostEditForm = (formData) => dispatch => {
    dispatch({
        type: SHOW_FORM,
        ...schema.postEditForm(),
        data: formData,
        onSubmit:
            data =>
                api.editPost(data).then(x => {
                    dispatch(fetchPost(formData.id));
                    dispatch(closeForm())
                    toastr.success("Post updated.", "Your post was updated successfully.")
                })

    })
}

export const showNewPostForm = (categories) => dispatch => {
    dispatch({
        type: SHOW_FORM,
        ...schema.newPostForm(categories),
        data: {
            id: _.uuid(),
            timestamp: Date.now()
        },
        onSubmit:
            data =>
                api.newPost(data).then(() => {
                    dispatch(fetchPost(data.id));
                    dispatch(closeForm())
                    toastr.success("Post created.", "Your post was created successfully.")
                })

    })
}

export const deletePost = id => dispatch =>
    api.deletePost(id)
        .then(x => {
            dispatch(postDeleted(id))
            toastr.success("Post deleted.", "The post was deleted successfully.")
            return x
        })


export const showForm = ({ title, schema, uiSchema, data }) => ({
    type: SHOW_FORM,
    title,
    schema,
    uiSchema,
    data
})

export const closeForm = () => ({
    type: CLOSE_FORM
})
