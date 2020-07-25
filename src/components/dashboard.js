import React, {Fragment, useEffect} from 'react';
import {getProfileAction} from "../redux/action/profile-action";
import {connect} from "react-redux";
import PropTypes from 'prop-types'
import {Button, Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";

const Dashboard = props => {
    useEffect(() => {
        props.getProfileAction();
    }, [])

    return (
        props.profile === null || props.profile.loading ?
            <Fragment>
                <div className="ui active centered inline loader">loading</div>
            </Fragment> :
            <Fragment>
                <h1 className="large text-primary">
                    Dashboard
                </h1>
                <p className="lead"><Icon name='user'/> Welcome {props.auth.user && props.auth.user.fullname}</p>
                <Fragment>
                    <Button as={Link} to='/upsert-profile' className='ui primary button' content='Edit Profile'
                            icon='edit'/>
                </Fragment>
            </Fragment>
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
