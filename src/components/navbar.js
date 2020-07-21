import React, {Fragment} from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import {logoutAction} from "../redux/action/auth-action";


const Navbar = (props) => {
    const authLinks = (
        <ul>
            <li>
                <a onClick={props.logoutAction} href='/'>
                    <i className='fas fa-sign-out-alt'/>{' '}
                    <span className='hide-sm'>Logout</span>
                </a>
            </li>
        </ul>
    )

    const guestLinks = (
        <ul>
            <li>
                <Link to='/profiles'>Developers</Link>
            </li>
            <li>
                <Link to='/register'>Register</Link>
            </li>
            <li>
                <Link to='/login'>Login</Link>
            </li>
        </ul>
    )
    console.log(props)

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
