import {combineReducers} from 'redux';
import alertReducer from "./alert-reducer";
import authReducer from "./auth-reducer";
import profileReducer from "./profile-reducer";


const rootReducer = combineReducers(
    {
        alertReducer, authReducer, profileReducer
    }
);

export default rootReducer;
