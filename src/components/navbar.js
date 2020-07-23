import React, {Fragment} from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import {logoutAction} from "../redux/action/auth-action";
import {Icon} from "semantic-ui-react";


const Navbar = (props) => {
    const authLinks = (
        <Fragment>
            <li>
                <Link to='/dashboard'>{' '}Dashboard</Link>
            </li>
            <li>
                <a onClick={props.logoutAction} href='/'>
                    <Icon name='log out'/>Logout
                </a>
            </li>
        </Fragment>
    )

    const guestLinks = (
        <Fragment>
            <li>
                <Link to='/register'>Register</Link>
            </li>
            <li>
                <Link to='/login'>Login</Link>
            </li>
        </Fragment>
    )

    return (
        <nav className="navbar bg-dark" style={{fontSize: "large", display: "flex"}}>
            <h1>
                <Link to='/'><Icon className="users"/> CoVivor</Link>
            </h1>
            <ul style={{fontSize: "large", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <li>
                    <Link to='/allprofiles'>Survivors</Link>
                </li>
                <li>
                    <Link to='/allposts'>Discussions</Link>
                </li>
                {!props.auth.loading && (
                    <Fragment>
                        {props.auth.isAuthenticated ? authLinks : guestLinks}
                    </Fragment>
                )}
            </ul>

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
