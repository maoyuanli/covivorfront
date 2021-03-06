import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Redirect, Route} from "react-router-dom";

// @ts-ignore
const PrivateRoute = ({component: Component, auth, ...rest}) => (
    <Route
        {...rest}
        render={
            props => !auth.isAuthenticated && !auth.loading ?
                (<Redirect to='/'/>) : (<Component {...props} />)
        }
    />
);

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
};
// @ts-ignore
const mapStateToProps = (state) => {
    return {
        auth: state.authReducer
    }
};

export default connect(mapStateToProps)(PrivateRoute);
