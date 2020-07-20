import {SET_ALERT} from "../action/action-constants";
import cuid from 'cuid';

export const setAlert = (msg, alertType) => dispatch => {
    const id = cuid();
    dispatch({
        type: SET_ALERT,
        payload: {msg, alertType, id}
    })
};
