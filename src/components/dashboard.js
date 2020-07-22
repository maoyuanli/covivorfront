import React, {Fragment, useEffect} from 'react';
import {getProfileAction} from "../redux/action/profile-action";
import {connect} from "react-redux";
import PropTypes from 'prop-types'
import WaitLoader from "../utils/wait-loader";

const Dashboard = props => {
    useEffect(() => {
        props.getProfileAction();
    }, [])

    return (
        props.profile === null || props.profile.loading ? <WaitLoader/> : <Fragment>Dashboard</Fragment>
    );
};

Dashboard.propTypes = {
    getProfileAction: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profileReducer,
    auth: state.authReducer
});

const mapActionToProps = {
    getProfileAction
}

export default connect(mapStateToProps, mapActionToProps)(Dashboard);
