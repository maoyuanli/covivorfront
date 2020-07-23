import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {getAllProfilesAction} from "../redux/action/profile-action";
import {Icon} from "semantic-ui-react";
import ProfileItem from "./profile-item";

const AllProfiles = props => {

    useEffect(() => {
        props.getAllProfilesAction();
    }, []);


    return (
        <Fragment>
            {props.profile.loading ?
                <div className="ui active centered inline loader">loading</div> :
                <Fragment>
                    <h1 className="large text-primary">Survivors</h1>
                    <p className="lead">
                        <Icon className="handshake outline"/> Browse and connect with survivors
                    </p>
                    <div>
                        {props.profile.profiles.length > 0 ?
                            (
                                props.profile.profiles.map(p => {
                                    console.log(p);
                                    return <ProfileItem key={p._id}/>
                                }
                        )
                        ) :
                        <h3>No Profiles Found</h3>}
                    </div>
                </Fragment>}
        </Fragment>
    );
};

AllProfiles.propTypes = {
    getAllProfilesAction: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

AllProfiles.propTypes = {}

const mapStateToProps = (state) => ({
    profile: state.profileReducer
});

const mapActionToProps = {
    getAllProfilesAction
}

export default connect(mapStateToProps, mapActionToProps)(AllProfiles);
