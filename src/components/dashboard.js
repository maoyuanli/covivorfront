import React, {useEffect} from 'react';
import {getProfileAction} from "../redux/action/profile-action";
import {connect} from "react-redux";
import PropTypes from 'prop-types'

const Dashboard = props => {
    useEffect(() => {
        props.getProfileAction();
    }, [])

    return (
        <div>
            dashboard
        </div>
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
