import axios from "axios";
import {REGISTER_FAIL, REGISTER_SUCCESS} from "./action-constants";
import {setAlert} from "./alert-action";

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
        })
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
