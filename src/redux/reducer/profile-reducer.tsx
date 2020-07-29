import {GET_ALL_PROFILES, GET_PROFILE} from "../action/action-constants";

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
        case GET_ALL_PROFILES:
            return {...state, profiles: payload, loading: false}
        default:
            return state
    }
};

export default profileReducer;
