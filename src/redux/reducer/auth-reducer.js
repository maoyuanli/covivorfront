import {REGISTER_SUCCESS} from "../action/action-constants";

const initState = {
}

const authReducer = (state= initState, action) => {
    const{type, payload} = action
    switch (type) {
        case REGISTER_SUCCESS:

    }
};

export default authReducer;
