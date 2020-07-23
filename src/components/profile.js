import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {getProfileAction} from "../redux/action/profile-action";
import {withRouter} from "react-router-dom";

const Profile = props => {
    useEffect(() => {
        getProfileAction();
    }, [getProfileAction])

    const profilePassed = props.location.profileProps;
    if (!profilePassed) props.history.push('/allprofiles')
    else {
        const profileParsed = props.profile.profiles.filter(p => p._id === props.location.profileProps.id)
        console.log(profileParsed[0])
        console.log(props.auth.user._id)
        console.log(profileParsed[0].user._id === props.auth.user._id)
    }

    return (
        <div>
            profile
        </div>
    );
};

Profile.propTypes = {
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    getProfileAction: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    profile: state.profileReducer,
    auth: state.authReducer
});

const mapActionToProps = {
    getProfileAction
}

export default connect(mapStateToProps, mapActionToProps)(withRouter(Profile));
