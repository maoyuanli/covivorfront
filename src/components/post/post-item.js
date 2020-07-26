import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Button, Icon, Image, Item, ItemGroup, Label} from "semantic-ui-react";
import {connect} from "react-redux";
import {deletePostAction, getAllPostsAction, likePostAction, unLikePostAction} from "../../redux/action/post-action";
import {Link} from "react-router-dom";
import {getAllProfilesAction} from "../../redux/action/profile-action";

const PostItem = props => {

    useEffect(() => {
        props.getAllProfilesAction();
    }, [props.getAllProfilesAction]);

    const curPost = props.postPassed;
    const curPostId = props.postPassed._id;
    const curUserId = props.auth.user ? props.auth.user._id : 0
    const postUserProfile = props.profile.profiles.filter(p => p.user._id === curPost.user._id)[0];

    const handleLikePost = () => {
        if (!curPost.likes.map(like => like.user).includes(curUserId)) {
            props.likePostAction(curPostId);
        } else {
            props.unLikePostAction(curPostId);
        }
    };

    const handleDeletePost = (e) => {
        e.preventDefault();
        props.deletePostAction(curPostId);
    };

    return (
        <Fragment>
            <div className="post bg-white p-1 my-1">
                <ItemGroup>
                    {!props.profile.loading && (<Item.Image src={postUserProfile.photoUrl}/>)}
                    <Item.Header>{curPost.user.fullname}</Item.Header>
                </ItemGroup>
                <div>
                    <p className="ui positive message" style={{fontSize:'large'}}>
                        {curPost.text}
                    </p>
                    <p className="post-date">
                        {curPost.date}
                    </p>
                    <Button as='div' labelPosition='right'>
                        <Button basic={!curPost.likes.map(like => like.user).includes(curUserId)} color='red'
                                onClick={handleLikePost}>
                            <Icon name='heart'/>
                            Like
                        </Button>
                        <Label as='a' basic color='red' pointing='left'>
                            {curPost.likes.length}
                        </Label>
                    </Button>
                    <Button
                        as={Link}
                        to={{
                            pathname: '/post',
                            postProps: {
                                id: curPostId
                            }
                        }}
                        labelPosition='right'>
                        <Button basic color='blue'>
                            <Icon name='comments'/>
                            Comments
                        </Button>
                        <Label basic color='blue' pointing='left'> {curPost.comments.length} </Label>
                    </Button>
                    {curUserId === curPost.user._id &&
                    (<Button onClick={handleDeletePost} color='brown'>Delete</Button>)}
                </div>
            </div>
        </Fragment>
    );
};

PostItem.propTypes = {
    auth: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    getAllPostsAction: PropTypes.func.isRequired,
    likePostAction: PropTypes.func.isRequired,
    unLikePostAction: PropTypes.func.isRequired,
    getAllProfilesAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.authReducer,
    post: state.postReducer,
    profile: state.profileReducer
});

const mapActionToProps = {
    likePostAction,
    unLikePostAction,
    getAllPostsAction,
    deletePostAction,
    getAllProfilesAction
}

export default connect(mapStateToProps, mapActionToProps)(PostItem);
