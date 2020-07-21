import {AUTH_ERROR, REGISTER_FAIL, REGISTER_SUCCESS, USER_LOADED} from "../action/action-constants";

const initState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
}

const authReducer = (state = initState, action) => {
    const {type, payload} = action
    switch (type) {
        case REGISTER_SUCCESS:
            localStorage.setItem('token', payload.token)
            return {...state, ...payload, isAuthenticated: true, loading: false}
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return {...state, token: null, isAuthenticated: false, loading: false}
        case USER_LOADED:
            return {...state, isAuthenticated: true, loading: false, user: payload}
        case AUTH_ERROR:
            localStorage.removeItem('token');
            return {...state, token: null, isAuthenticated: false, loading: false}
        default:
            return state
    }
};

export default authReducer;
