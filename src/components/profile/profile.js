import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {getProfileAction} from "../../redux/action/profile-action";
import {Link, withRouter} from "react-router-dom";
import {Button, Grid, Header, Icon, Image, Message} from "semantic-ui-react";

const Profile = props => {
    useEffect(() => {
        props.getProfileAction();
    }, [props.getProfileAction])

    let curProfile = null;
    let profileBelongsCurUser = false

    const propsPassed = props.location.profileProps;
    if (!propsPassed) {
        props.history.push('/allprofiles')
    } else {
        const profilePassed = props.profile.profiles.filter(p => p._id === props.location.profileProps.id)[0];
        curProfile = profilePassed;
        if (props.auth.user) {
            profileBelongsCurUser = profilePassed.user._id === props.auth.user._id
        }

        return (
            <Fragment>
                {profileBelongsCurUser && (
                    <div className="dash-buttons">
                        <Link to="/upsert-profile" className="ui primary button"
                        ><Icon className="edit"/> Edit Profile</Link
                        >
                    </div>
                )}

                <Grid>
                    <Grid.Column width={5}>
                        <Image src={propsPassed.photoUrl}/>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Header as='h1'>{curProfile.user.fullname}</Header>
                        <Message
                            info
                            header={curProfile.bio}
                            content={curProfile.location}
                        />

                        <div>
                            {curProfile.facebook && (<Button color='facebook'>
                                <Icon name='facebook'/> {curProfile.facebook}
                            </Button>)}
                            {curProfile.twitter && (<Button color='twitter'>
                                <Icon name='twitter'/> {curProfile.twitter}
                            </Button>)}
                            {curProfile.instagram && (<Button color='instagram'>
                                <Icon name='instagram'/> {curProfile.instagram}
                            </Button>)}
                            {curProfile.linkedin && (<Button color='linkedin'>
                                <Icon name='linkedin'/> {curProfile.linkedin}
                            </Button>)}
                            {curProfile.youtube && (<Button color='youtube'>
                                <Icon name='youtube'/> {curProfile.youtube}
                            </Button>)}
                        </div>
                    </Grid.Column>
                </Grid>


            </Fragment>
        );
    }

    return null
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
