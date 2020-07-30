import axios from "axios";
import {GET_ALL_POSTS, UPDATE_COMMENTS, UPDATE_LIKES} from "./action-constants";
import {removeAlert, setAlert} from "./alert-action";
import {setRequestConfig} from "../../utils/set-request-config";
import {config} from "../../utils/config";
// @ts-ignore
export const getAllPostsAction = () => async dispatch => {
    try {
        const res = await axios.get(config.URL_PREFIX + 'post/getall');
        dispatch({
            type: GET_ALL_POSTS,
            payload: res.data.posts
        })
    } catch (e) {
        dispatch(setAlert('posts loading failed', 'danger'));
        setTimeout(() => dispatch(removeAlert('danger')), 5000)
    }
};
// @ts-ignore
export const likePostAction = (postId) => async dispatch => {
    try {
        const body = JSON.stringify({postId: postId});
        const res = await axios.put(config.URL_PREFIX + 'post/like', body, setRequestConfig())
        dispatch({
            type: UPDATE_LIKES,
            payload: {postId, likes: res.data.likes}
        })
    } catch (e) {
        console.log(e)
    }
};
// @ts-ignore
export const unLikePostAction = (postId) => async dispatch => {
    try {
        const body = JSON.stringify({postId: postId});
        const res = await axios.put(config.URL_PREFIX + 'post/unlike', body, setRequestConfig())
        dispatch({
            type: UPDATE_LIKES,
            payload: {postId, likes: res.data.likes}
        })
    } catch (e) {
        console.log(e)
    }
};
// @ts-ignore
export const createPostAction = (postText) => async dispatch => {
    try {
        const body = JSON.stringify({
            post: {
                text: postText
            }
        })
        const res = await axios.post(config.URL_PREFIX + 'post/create', body, setRequestConfig())
        dispatch({
            type: GET_ALL_POSTS,
            payload: res.data.posts
        })
    } catch (e) {
        console.log(e)
    }
};
// @ts-ignore
export const deletePostAction = (postId) => async dispatch => {
    try {
        const res = await axios.delete(config.URL_PREFIX + `post/delete/${postId}`, setRequestConfig())
        dispatch({
            type: GET_ALL_POSTS,
            payload: res.data.posts
        })
    } catch (e) {
        console.log(e)
    }
};
// @ts-ignore
export const commentPostAction = (postId, text) => async dispatch => {
    try {
        const body = JSON.stringify({postId, text});
        const res = await axios.put(config.URL_PREFIX + 'post/comment', body, setRequestConfig())
        dispatch({
            type: UPDATE_COMMENTS,
            payload: {postId, comments: res.data.comments}
        })
    } catch (e) {
        console.log(e)
    }
};
// @ts-ignore
export const unCommentPostAction = (postId, commentId) => async dispatch => {
    try {
        const body = JSON.stringify({postId, commentId});
        const res = await axios.put(config.URL_PREFIX + 'post/uncomment', body, setRequestConfig())
        dispatch({
            type: UPDATE_COMMENTS,
            payload: {postId, comments: res.data.comments}
        })
    } catch (e) {
        console.log(e)
    }
};
