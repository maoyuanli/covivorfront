import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {getAllProfilesAction} from "../../redux/action/profile-action";
import {Header, ItemGroup, Message} from "semantic-ui-react";
import ProfileItem from "./profile-item";

const AllProfiles = ({getAllProfilesAction, profile}) => {

    useEffect(() => {
        getAllProfilesAction();
    }, [getAllProfilesAction]);


    return (
        <Fragment>
            {profile.loading ?
                <div className="ui active centered inline loader">loading</div> :
                <Fragment>
                    <Header as='h1' color='blue' className="large text-primary"
                            style={{fontFamily: 'Special Elite'}}>Survivors</Header>
                    <Message info>
                        <Message.Header>Connect with each other</Message.Header>
                    </Message>
                    <ItemGroup>
                        {profile.profiles.length > 0 ?
                            (
                                profile.profiles.map(p => {
                                        return <ProfileItem key={p._id} profile={p}/>
                                    }
                                )
                            ) :
                            <h3>No Profiles Found</h3>}
                    </ItemGroup>
                </Fragment>}
        </Fragment>
    );
};

AllProfiles.propTypes = {
    getAllProfilesAction: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    profile: state.profileReducer
});

const mapActionToProps = {
    getAllProfilesAction
}

export default connect(mapStateToProps, mapActionToProps)(AllProfiles);
