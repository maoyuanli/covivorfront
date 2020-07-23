import {GET_ALL_POSTS} from "../action/action-constants";

const initState = {
    post: null,
    posts: [],
    loading: true,
    error: {}
}

const postReducer = (state = initState, action) => {
    const {type, payload} = action;
    switch (type) {
        case GET_ALL_POSTS:
            return {...state, posts: payload, loading: false};
        default:
            return state
    }
};

export default postReducer;
