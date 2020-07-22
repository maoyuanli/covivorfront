import React, {Fragment} from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import {logoutAction} from "../redux/action/auth-action";
import {Icon} from "semantic-ui-react";


const Navbar = (props) => {
    const authLinks = (
        <ul style={{fontSize: "large", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <li>
                <Link to='/dashboard'>{' '}Dashboard</Link>
            </li>
            <li>
                <a onClick={props.logoutAction} href='/'>
                    <Icon name='log out'/>Logout
                </a>
            </li>
        </ul>
    )

    const guestLinks = (
        <ul style={{fontSize: "large", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <li>
                <Link to='/survivors'>Survivors</Link>
            </li>
            <li>
                <Link to='/register'>Register</Link>
            </li>
            <li>
                <Link to='/login'>Login</Link>
            </li>
        </ul>
    )

    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to='/'><i className="fas fa-code"></i>CoVivor</Link>
            </h1>
            {!props.auth.loading && (
                <Fragment>
                    {props.auth.isAuthenticated ? authLinks : guestLinks}
                </Fragment>
            )}
        </nav>
    );
};

const mapStateToProps = (state) => {
    return {
        auth: state.authReducer
    }
};

const mapActionToProps = {
    logoutAction
}

export default connect(mapStateToProps, mapActionToProps)(Navbar);
