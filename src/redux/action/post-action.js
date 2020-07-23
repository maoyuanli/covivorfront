import axios from "axios";
import {GET_ALL_POSTS} from "./action-constants";
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



