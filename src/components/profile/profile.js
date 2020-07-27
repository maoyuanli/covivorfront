import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {getProfileAction} from "../../redux/action/profile-action";
import {Link, withRouter} from "react-router-dom";
import {Button, Grid, Header, Icon, Image, Message} from "semantic-ui-react";

const Profile = ({history, location, getProfileAction, profile, auth}) => {

    useEffect(() => {
        getProfileAction();
    }, [getProfileAction])

    let curProfile = null;
    let profileBelongsCurUser = false

    const propsPassed = location.profileProps;
    if (!propsPassed) {
        history.push('/allprofiles')
    } else {
        const profilePassed = profile.profiles.filter(p => p._id === location.profileProps.id)[0];
        curProfile = profilePassed;
        if (auth.user) {
            profileBelongsCurUser = profilePassed.user._id === auth.user._id
        }

        return (
            <Fragment>
                <Grid>
                    <Grid.Column width={5}>
                        <Image src={propsPassed.photoUrl}/>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Header as='h1'>{curProfile.user.fullname}</Header>
                        {profileBelongsCurUser && (
                            <Button as={Link} to='/upsert-profile' className='ui primary button' content='Edit Profile'
                                    icon='edit'/>
                        )}
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
    getProfileAction: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    profile: state.profileReducer,
    auth: state.authReducer
});

const mapActionToProps = {
    getProfileAction
}

export default connect(mapStateToProps, mapActionToProps)(withRouter(Profile));
