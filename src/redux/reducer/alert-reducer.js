import {REMOVE_ALERT, SET_ALERT} from "../action/action-constants";

const initState = [];

const alertReducer = (state = initState, action) => {
    const {type, payload} = action;

    switch (type) {
        case SET_ALERT:
            return [...state, payload]
        case REMOVE_ALERT:
            return state.filter(alert=>alert.id !== payload)
        default:
            return state;
    }
};

export default alertReducer;
