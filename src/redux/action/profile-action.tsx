import axios from 'axios'
import {GET_ALL_PROFILES, GET_PROFILE} from "./action-constants";
import {removeAlert, setAlert} from "./alert-action";
import {setRequestConfig} from "../../utils/set-request-config";
import {config} from "../../utils/config";
// @ts-ignore
export const getProfileAction = () => async dispatch => {
    try {
        const res = await axios.get(config.URL_PREFIX + 'profile/get');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (e) {
        console.log(e);
    }
};
// @ts-ignore
export const getAllProfilesAction = () => async dispatch => {
    try {
        const res = await axios.get(config.URL_PREFIX + 'profile/getall');
        dispatch({
            type: GET_ALL_PROFILES,
            payload: res.data.profiles
        })
    } catch (e) {
        console.log(e);
    }
};
// @ts-ignore
export const upsertProfileAction = (formData, history) => async dispatch => {
    try {
        const body = JSON.stringify({profile: formData});
        const res = await axios.post(config.URL_PREFIX + 'profile/upsert', body, setRequestConfig())
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
