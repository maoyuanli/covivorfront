import React, {Fragment, useEffect} from 'react';
import {getProfileAction} from "../redux/action/profile-action";
import {connect} from "react-redux";
import PropTypes from 'prop-types'
import {Button, Divider, Header, Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {getAllPostsAction} from "../redux/action/post-action";
import PostItem from "./post/post-item";
// @ts-ignore
const Dashboard = props => {
    const {profile, auth, post, getProfileAction, getAllPostsAction} = props

    useEffect(() => {
        getProfileAction();
        getAllPostsAction();
    }, [getProfileAction, getAllPostsAction])


    return (
        profile === null || profile.loading ?
            <Fragment>
                <div className="ui active centered inline loader">loading</div>
            </Fragment> :
            <Fragment>
                <h1 className="large text-primary">
                    Dashboard
                </h1>
                <p className="lead"><Icon name='user'/> Welcome {auth.user && auth.user.fullname}</p>
                <Fragment>
                    <Button as={Link} to='/upsert-profile' className='ui primary button' content='Edit Profile'
                            icon='edit'/>
                </Fragment>


                <Fragment>
                    {post.posts && auth.user &&
                    (<div>
                        <Divider horizontal>
                            <Header as='h2' style={{fontFamily: 'Baloo Da 2'}}>
                                <Icon name='slack hash'/>
                                My Posts
                            </Header>
                        </Divider>
                        {
                            post.posts
                                // @ts-ignore
                                .filter(post => post.user._id === auth.user._id)
                                // @ts-ignore
                                .map(post => (<PostItem key={post._id} postPassed={post}/>
                                ))}
                    </div>)}
                </Fragment>
            </Fragment>
    );
};

Dashboard.propTypes = {
    getProfileAction: PropTypes.func.isRequired,
    getAllPostsAction: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
};
// @ts-ignore
const mapStateToProps = state => ({
    profile: state.profileReducer,
    auth: state.authReducer,
    post: state.postReducer,
});

const mapActionToProps = {
    getProfileAction,
    getAllPostsAction
}

export default connect(mapStateToProps, mapActionToProps)(Dashboard);
