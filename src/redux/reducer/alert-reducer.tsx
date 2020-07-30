import {REMOVE_ALERT, SET_ALERT} from "../action/action-constants";
// @ts-ignore
const initState = [];
// @ts-ignore
const alertReducer = (state = initState, action) => {
    const {type, payload} = action;

    switch (type) {
        case SET_ALERT:
            return [...state, payload]
        case REMOVE_ALERT:
            return state.filter(alert => alert.alertType !== payload)
        default:
            return state;
    }
};

export default alertReducer;
