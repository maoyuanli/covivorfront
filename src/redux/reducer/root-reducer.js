import {combineReducers} from 'redux';
import alertReducer from "./alert-reducer";

const rootReducer = combineReducers(
    {
        alertReducer
    }
);

export default rootReducer;
