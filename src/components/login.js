import React, {Fragment, useState} from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import {loginAction} from "../redux/action/auth-action";
import PropTypes from "prop-types";

const Login = (props) => {

    const [formData, setFormData] = useState({
        email: 'user@abc.com',
        pass: 'password',
    });

    const {email, pass} = formData;

    const handleOnChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        props.loginAction(email, pass);
        // try {
        //     const config = {
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     }
        //     const body = JSON.stringify({username: email, password: pass});
        //     const res = await axios.post('http://localhost:3000/api/user/login', body, config)
        //     console.log(res.data)
        // } catch (e) {
        //     console.log(e)
        // }

    };

    return (
        <Fragment>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Log into your account</p>
            <form className="form" onSubmit={handleOnSubmit}>
                <div className="form-group">
                    <input type="email" placeholder="Email Address" name="email"
                           value={email} onChange={e => handleOnChange(e)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="pass"
                        minLength="6"
                        required
                        value={pass} onChange={e => handleOnChange(e)}
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Login"/>
            </form>
            <p className="my-1">
                Don't have an account? <Link to='/register'>Register</Link>
            </p>
        </Fragment>
    );
};

const mapActionToProps = {
    loginAction
}

Login.propTypes = {
    loginAction: PropTypes.func.isRequired
}

export default connect(null, mapActionToProps)(Login);
