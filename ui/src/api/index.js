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

export const votePost = (postId, option) => doFetch(`/posts/${postId}`, {
    method: 'POST',
    body: JSON.stringify({ option: option })
}).then(x => x.json())

export const fetchComments = (postId) => doFetch(`/posts/${postId}/comments`).then(x => x.json())

export const fetchCategories = () => doFetch("/categories").then(x => x.json())