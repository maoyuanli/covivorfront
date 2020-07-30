import React, {Fragment, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {getProfileAction} from "../../redux/action/profile-action";
import {Link, withRouter} from "react-router-dom";
import {Button, Divider, Form, Grid, Header, Icon, Image, Message} from "semantic-ui-react";
import {geocodeByAddress, getLatLng} from "react-places-autocomplete";
import GoogleMapComponent from "./google-map-component";
// @ts-ignore
const Profile = ({history, location, getProfileAction, profile, auth}) => {

    useEffect(() => {
        getProfileAction();
    }, [getProfileAction])

    let curProfile = null;
    let profileBelongsCurUser = false

    const propsPassed = location.profileProps;
    if (!propsPassed) {
        history.push('/allprofiles')
    }
    // @ts-ignore
    const profilePassed = profile.profiles.filter(p => p._id === location.profileProps.id)[0];
    curProfile = profilePassed;
    if (auth.user) {
        profileBelongsCurUser = profilePassed.user._id === auth.user._id
    }
    const [locLatLng, setLocLatLng] = useState({lat: 0, lng: 0, locLatLngLoading: true})
    geocodeByAddress(propsPassed.profileLocation)
        .then(results => getLatLng(results[0]))
        .then(latLng => {
            setLocLatLng({lat: latLng.lat, lng: latLng.lng, locLatLngLoading: false});
        })
        .catch(error => console.error('Error', error));

    const {lat, lng, locLatLngLoading} = locLatLng;
    return (
        <Fragment>
            <Grid>
                <Grid.Column width={5}>
                    <Image src={curProfile.photoUrl}/>
                    <Divider/>
                    <Button floated='right' icon labelPosition='left' as={Link} to='/allprofiles' color='grey'>
                        Back To Profile List
                        <Icon className='left arrow'/>
                    </Button>
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
                    <div>
                        {/*<Header as='h3' content='Reported Location of Exposure' />*/}
                        <Divider horizontal>
                            <Header as='h4'>
                                Reported Location of Exposure
                            </Header>
                        </Divider>
                        <Form>{!locLatLngLoading && (<GoogleMapComponent lat={lat} lng={lng}/>)}</Form>
                        <Message attached='bottom' warning>
                            <Icon name='map marker alternate'/>
                            {curProfile.location}
                        </Message>
                    </div>


                </Grid.Column>
            </Grid>

        </Fragment>
    );
};

Profile.propTypes = {
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    getProfileAction: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
};
// @ts-ignore
const mapStateToProps = (state) => ({
    profile: state.profileReducer,
    auth: state.authReducer
});

const mapActionToProps = {
    getProfileAction
}
// @ts-ignore
export default connect(mapStateToProps, mapActionToProps)(withRouter(Profile));
