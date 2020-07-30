import React, {Fragment, useState} from 'react';
import {Link, Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import {loginAction} from "../../redux/action/auth-action";
import PropTypes from "prop-types";
import {Divider, Form, Icon} from "semantic-ui-react";

// @ts-ignore
const Login = (props) => {

    const [formData, setFormData] = useState({
        email: 'guest@account.com',
        pass: 'abc123',
    });

    const {email, pass} = formData;

    // @ts-ignore
    const handleOnChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    };

    // @ts-ignore
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        props.loginAction(email, pass);
    };

    if (props.isAuthenticated) {
        return <Redirect to='/dashboard'/>
    }


    return (
        <Fragment>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><Icon name='user'/> Log into your account</p>
            <Form onSubmit={handleOnSubmit}>
                <Form.Field>
                    <label>Email Address</label>
                    <input type="email" placeholder="Email Address" name="email"
                           value={email} onChange={e => handleOnChange(e)}
                    />
                </Form.Field>
                <Form.Field className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        name="pass"
                        // @ts-ignore
                        minLength="6"
                        required
                        value={pass} onChange={e => handleOnChange(e)}
                    />
                </Form.Field>
                <input type="submit" className="btn btn-primary" value="Login"/>
            </Form>
            <Divider/>
            <p attached='bottom'>
                Don't have an account? <Link to='/register'>Register</Link>
            </p>
        </Fragment>
    );
};

const mapActionToProps = {
    loginAction
}

// @ts-ignore
const mapStateToProps = state => ({
    isAuthenticated: state.authReducer.isAuthenticated
});

Login.propTypes = {
    loginAction: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

export default connect(mapStateToProps, mapActionToProps)(Login);
