import React, {useState} from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {Form} from "semantic-ui-react";
import {loginAction} from "../redux/action/auth-action";

const Landing = (props) => {
    const [formData, setFormData] = useState({
        email: 'user@abc.com',
        pass: 'password',
    });
    const {email, pass} = formData;

    if (props.isAuthenticated) {
        return (<Redirect to='/allposts'/>);
    }


    const handleOnChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        props.loginAction(email, pass);
    };

    return (
        <section className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1 className="x-large">COVID19 Survivors</h1>
                    <p className="lead">
                        Share Experience, Help Each Other, Move On Together
                    </p>
                    {/*<div className="buttons">*/}
                    {/*    <Link to='/register' className="btn btn-primary">Sign Up</Link>*/}
                    {/*    <Link to='/login' className="btn btn-light">Login</Link>*/}
                    {/*</div>*/}
                    <Form onSubmit={handleOnSubmit}>
                        <Form.Group>
                            <Form.Input
                                placeholder='email'
                                name='email'
                                value={email}
                                onChange={handleOnChange}
                            />
                            <Form.Input
                                placeholder='password'
                                name='pass'
                                value={pass}
                                onChange={handleOnChange}
                            />
                            <Form.Button color='teal' content='Log In'/>
                        </Form.Group>
                    </Form>
                </div>
            </div>
        </section>
    );
};

Landing.propTypes = {
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated: state.authReducer.isAuthenticated
})

const mapActionToProps = {
    loginAction
}

export default connect(mapStateToProps, mapActionToProps)(Landing);
