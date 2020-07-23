import axios from 'axios'
import {GET_ALL_PROFILES, GET_PROFILE} from "./action-constants";
import {removeAlert, setAlert} from "./alert-action";

export const getProfileAction = () => async dispatch => {
    try {
        const res = await axios.get('http://localhost:3000/api/profile/get');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (e) {
        dispatch(setAlert('profile loading failed', 'danger'));
        setTimeout(() => dispatch(removeAlert('danger')), 5000)
    }
};

export const getAllProfilesAction = () => async dispatch => {
    try {
        const res = await axios.get('http://localhost:3000/api/profile/getall');
        dispatch({
            type: GET_ALL_PROFILES,
            payload: res.data.profiles
        })
    } catch (e) {
        dispatch(setAlert('profiles loading failed', 'danger'));
        setTimeout(() => dispatch(removeAlert('danger')), 5000)
    }
};

export const upsertProfileAction = (formData, history) => async dispatch => {
    try {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        }
        const body = JSON.stringify({profile: formData});
        const res = await axios.post('http://localhost:3000/api/profile/upsert', body, config)
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('profile updated', 'success'));
        history.push('/dashboard')
        setTimeout(() => dispatch(removeAlert('success')), 5000)

    } catch (e) {
        console.log(e)
        dispatch(setAlert('profile update failed', 'danger'));
        setTimeout(() => dispatch(removeAlert('danger')), 5000)
    }
};
