import React, {Fragment, useState} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import {removeAlert, setAlert} from "../redux/action/alert-action";
import PropTypes from 'prop-types'

const Register = (props) => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        pass1: '',
        pass2: ''
    });

    const {name, email, pass1, pass2} = formData;

    const handleOnChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        let alertType = '';
        if (pass1 !== pass2) {
            alertType = 'danger'
            props.setAlert('passwords not matched', alertType);
        } else {
            const newUser = {
                username: email,
                fullname: name,
                password: pass1
            }
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                const body = JSON.stringify(newUser);
                const res = await axios.post('http://localhost:3000/api/user/register', body, config)
                if (res.status === 200) {
                    alertType = 'success';
                    props.setAlert(`Registration with ${email} succeeded`, alertType)
                    setFormData({
                        name: '',
                        email: '',
                        pass1: '',
                        pass2: ''
                    })
                }
            } catch (e) {
                console.log(e)
            }
        }
        if (alertType.length !== 0) {
            setTimeout(() => props.removeAlert(alertType), 5000)
        }
    };

    return (
        <Fragment>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={handleOnSubmit}>
                <div className="form-group">
                    <input type="text" placeholder="Name" name="name" required
                           value={name} onChange={e => handleOnChange(e)}
                    />
                </div>
                <div className="form-group">
                    <input type="email" placeholder="Email Address" name="email"
                           value={email} onChange={e => handleOnChange(e)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="pass1"
                        minLength="6"
                        required
                        value={pass1} onChange={e => handleOnChange(e)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="pass2"
                        minLength="6"
                        required
                        value={pass2} onChange={e => handleOnChange(e)}
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Register"/>
            </form>
            <p className="my-1">
                Already have an account? <Link to='login'>Sign In</Link>
            </p>
        </Fragment>
    );
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    removeAlert: PropTypes.func.isRequired
}

const mapActionToProps = {
    setAlert, removeAlert
}

export default connect(null, mapActionToProps)(Register);
