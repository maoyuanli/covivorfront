import axios from "axios";
import {GET_ALL_POSTS, UPDATE_LIKES} from "./action-constants";
import {removeAlert, setAlert} from "./alert-action";
import {setRequestConfig} from "../../utils/set-request-config";

export const getAllPostsAction = () => async dispatch => {
    try {
        const res = await axios.get('http://localhost:3000/api/post/getall');
        dispatch({
            type: GET_ALL_POSTS,
            payload: res.data.posts
        })
    } catch (e) {
        dispatch(setAlert('posts loading failed', 'danger'));
        setTimeout(() => dispatch(removeAlert('danger')), 5000)
    }
};

export const likePostAction = (postId) => async dispatch => {
    try {
        const body = JSON.stringify({postId: postId});
        const res = await axios.put('http://localhost:3000/api/post/like', body, setRequestConfig())
        dispatch({
            type: UPDATE_LIKES,
            payload: {postId, likes: res.data.likes}
        })
    } catch (e) {
        console.log(e)
    }
};

export const unLikePostAction = (postId) => async dispatch => {
    try {
        const body = JSON.stringify({postId: postId});
        const res = await axios.put('http://localhost:3000/api/post/unlike', body, setRequestConfig())
        dispatch({
            type: UPDATE_LIKES,
            payload: {postId, likes: res.data.likes}
        })
    } catch (e) {
        console.log(e)
    }
};
