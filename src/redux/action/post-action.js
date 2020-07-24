import axios from "axios";
import {GET_ALL_POSTS, GET_PROFILE} from "./action-constants";
import {removeAlert, setAlert} from "./alert-action";

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
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        }
        const body = JSON.stringify({postId: postId});
        await axios.put('http://localhost:3000/api/post/like', body, config)
    } catch (e) {
        console.log(e)
    }
};

