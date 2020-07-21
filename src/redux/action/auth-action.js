import axios from "axios";
import {AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS, USER_LOADED} from "./action-constants";
import {setAlert} from "./alert-action";
import setAuthToken from "../../utils/set-auth-token";

export const registerAction = ({name, email, password}) => async dispatch => {
    try {
        const newUser = {
            username: email,
            fullname: name,
            password: password
        }
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify(newUser);
        const res = await axios.post('http://localhost:3000/api/user/register', body, config)
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
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': token
        }
        const res = await axios.get('http://localhost:3000/api/user/auth', {headers})
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
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify(user);
        const res = await axios.post('http://localhost:3000/api/user/login', body, config)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        dispatch(loadUserAction());
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: LOGIN_FAIL
        });
    }
};
