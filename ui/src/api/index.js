import fetch from 'isomorphic-fetch'
import URI from 'urijs'

const defaultHeaders = {
    headers: {
        Authorization: '42',
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
}
const doFetch = (link, params) => fetch(URI(link, process.env.REACT_APP_API_ROOT).normalize().toString(), { ...params, ...defaultHeaders })


export const fetchPosts = () => doFetch('/posts').then(x => x.json())
export const fetchPostsForCategory = (category) => doFetch(`/${category}/posts`).then(x => x.json())
export const fetchPost = (postId) => doFetch(`/posts/${postId}`).then(x => x.json())

const vote = (type, id, option) => doFetch(`/${type}/${id}`, {
    method: 'POST',
    body: JSON.stringify({ option: option })
}).then(x => x.json())

export const votePost = (id, option) => vote("posts", id, option)
export const voteComment = (id, option) => vote("comments", id, option)

export const postComment = (data) => doFetch('/comments', {
    method: 'POST',
    body: JSON.stringify(data)
    }).then(x=> x.json())

export const newPost = (data) => doFetch('/posts', {
    method: 'POST',
    body: JSON.stringify(data)
}).then(x => x.json)

export const editPost = (data) => doFetch(`/posts/${data.id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
    }).then(x => x.json)

export const fetchComments = (postId) => doFetch(`/posts/${postId}/comments`).then(x => x.json())

export const fetchCategories = () => doFetch("/categories").then(x => x.json())