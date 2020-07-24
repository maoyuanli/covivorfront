import {GET_ALL_POSTS, UPDATE_LIKES} from "../action/action-constants";

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
        case UPDATE_LIKES:
            return {
                ...state,
                posts: state.posts.map(p => p._id === payload.postId ?
                    {...p, likes: payload.likes} : p),
                loading: false
            };
        // case CREATE_POST:
        //     return {
        //         ...state,
        //
        //     }
        default:
            return state
    }
};

export default postReducer;
