import {SET_ALERT} from "./action-constants";
import cuid from 'cuid';

export const setAlert = (msg, alertType) =>  {
    const id = cuid();
    return {
        type: SET_ALERT,
        payload: {msg, alertType, id}
    }
};
