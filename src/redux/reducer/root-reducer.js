import {combineReducers} from 'redux';
import alertReducer from "./alert-reducer";
import authReducer from "./auth-reducer";

const rootReducer = combineReducers(
    {
        alertReducer, authReducer
    }
);

export default rootReducer;
