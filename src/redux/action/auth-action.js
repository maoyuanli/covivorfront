import axios from "axios";
import {
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADED
} from "./action-constants";
import {removeAlert, setAlert} from "./alert-action";
import setAuthToken from "../../utils/set-auth-token";
import {setRequestConfig} from "../../utils/set-request-config";

export const registerAction = ({name, email, password}) => async dispatch => {
    try {
        const newUser = {
            username: email,
            fullname: name,
            password: password
        }
        const body = JSON.stringify(newUser);
        const res = await axios.post('http://localhost:3000/api/user/register', body, setRequestConfig(false))
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
        dispatch(loadUserAction());
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: REGISTER_FAIL
        });
    }
};

export const loadUserAction = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }

    try {
        const res = await axios.get('http://localhost:3000/api/user/auth', setRequestConfig())
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: AUTH_ERROR
        })
    }
};

export const loginAction = (email, password) => async dispatch => {
    try {
        const user = {
            username: email,
            password: password
        }
        const body = JSON.stringify(user);
        const res = await axios.post('http://localhost:3000/api/user/login', body, setRequestConfig(false))
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        dispatch(loadUserAction());
    } catch (err) {
        dispatch(setAlert('user authentication failed', 'danger'));
        dispatch({
            type: LOGIN_FAIL
        });
        setTimeout(() => dispatch(removeAlert('danger')), 5000)
    }
};

export const logoutAction = () => dispatch => {
    dispatch({
        type: LOGOUT
    })
};
