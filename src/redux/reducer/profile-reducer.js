import React from 'react';
import {GET_PROFILE} from "../action/action-constants";

const initState = {
    profile: null,
    profiles: [],
    loading: true,
    error: {}
}

const profileReducer = (state = initState, action) => {
    const {type, payload} = action;
    switch (type) {
        case GET_PROFILE:
            return {...state, profile: payload, loading: false}
        default:
            return state
    }
};

export default profileReducer;
