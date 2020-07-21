import axios from 'axios'
import {GET_PROFILE} from "./action-constants";
import {setAlert} from "./alert-action";

export const getProfileAction = () => async dispatch => {
    try {
        const res = await axios.get('http://localhost:3000/api/profile/get');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (e) {
        dispatch(setAlert('profile loading failed', 'danger'));
    }
};
