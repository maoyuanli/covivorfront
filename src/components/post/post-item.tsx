import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Button, Icon, Item, ItemGroup, Label} from "semantic-ui-react";
import {connect} from "react-redux";
import {deletePostAction, getAllPostsAction, likePostAction, unLikePostAction} from "../../redux/action/post-action";
import {Link} from "react-router-dom";
import {getAllProfilesAction} from "../../redux/action/profile-action";

const PostItem = ({// @ts-ignore
                      auth, profile, postPassed, getAllPostsAction, likePostAction, unLikePostAction, getAllProfilesAction, deletePostAction,
                  }) => {
    useEffect(() => {
        getAllProfilesAction();
    }, [getAllProfilesAction, deletePostAction, likePostAction, unLikePostAction, getAllPostsAction]);

    const curPost = postPassed;
    const curPostId = postPassed._id;
    const curUserId = auth.user ? auth.user._id : 0
    // @ts-ignore
    const postUserProfile = profile.profiles.filter(p => p.user._id === curPost.user._id)[0];

    const handleLikePost = () => {
        // @ts-ignore
        if (!curPost.likes.map(like => like.user).includes(curUserId)) {
            likePostAction(curPostId);
        } else {
            unLikePostAction(curPostId);
        }
    };
// @ts-ignore
    const handleDeletePost = (e) => {
        e.preventDefault();
        deletePostAction(curPostId);
    };

    return (
        <Fragment>
            <div className="post bg-white p-1 my-1">
                <ItemGroup>
                    {!profile.loading && (<Item.Image src={postUserProfile.photoUrl}/>)}
                    <Item.Header>{curPost.user.fullname}</Item.Header>
                </ItemGroup>
                <div>
                    <p className="ui positive message" style={{fontSize: 'large', fontFamily: 'Mulish'}}>
                        {curPost.text}
                    </p>
                    <p className="post-date">
                        {curPost.date}
                    </p>
                    <Button as='div' labelPosition='right'>
                        <Button basic={!curPost.likes
                            // @ts-ignore
                            .map(like => like.user).includes(curUserId)} color='red'
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
    profile: PropTypes.object.isRequired,
    getAllPostsAction: PropTypes.func.isRequired,
    likePostAction: PropTypes.func.isRequired,
    unLikePostAction: PropTypes.func.isRequired,
    getAllProfilesAction: PropTypes.func.isRequired,
    deletePostAction: PropTypes.func.isRequired,
};
// @ts-ignore
const mapStateToProps = (state) => ({
    auth: state.authReducer,
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
