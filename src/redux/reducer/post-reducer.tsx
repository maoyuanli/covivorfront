import {GET_ALL_POSTS, UPDATE_COMMENTS, UPDATE_LIKES} from "../action/action-constants";

const initState = {
    post: null,
    posts: [],
    loading: true,
    error: {}
}
// @ts-ignore
const postReducer = (state = initState, action) => {
    const {type, payload} = action;
    switch (type) {
        case GET_ALL_POSTS:
            return {...state, posts: payload, loading: false};
        case UPDATE_LIKES:
            return {
                ...state,
                // @ts-ignore
                posts: state.posts.map(p => p._id === payload.postId ?
                    // @ts-ignore
                    {...p, likes: payload.likes} : p),
                loading: false
            };
        case UPDATE_COMMENTS:
            return {
                ...state,
                // @ts-ignore
                posts: state.posts.map(p => p._id === payload.postId ?
                    // @ts-ignore
                    {...p, comments: payload.comments} : p),
                loading: false
            };
        default:
            return state
    }
};

export default postReducer;
