import React, {Fragment, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Icon, Label} from "semantic-ui-react";
import {connect} from "react-redux";
import {getAllPostsAction, likePostAction} from "../../redux/action/post-action";

const PostItem = props => {
    useEffect(() => {
        props.getAllPostsAction();
    }, [props.post.loading])

    const randInt = Math.floor(Math.random() * 100);
    const hostPhotoURL = `https://randomuser.me/api/portraits/men/${randInt}.jpg`;

    const curPostId = props.postId;
    // const curPost = props.post.posts.filter(p => p._id === curPostId)[0];
    const curUserId = props.auth.user ? props.auth.user._id : 0


    const [postState, setPostState] = useState({
        curPost: props.post.posts.filter(p => p._id === curPostId)[0]
    });

    const {curPost} = postState;

    const handleLikePost = () => {
        props.likePostAction(curPostId);

        props.post.loading = !props.post.loading;
    };

    return (
        <Fragment>
            <div className="post bg-white p-1 my-1">
                <div>
                    <a>
                        <img
                            className="round-img"
                            src={hostPhotoURL}
                            alt=""
                        />
                        <h4>{curPost.user.fullname}</h4>
                    </a>
                </div>
                <div>
                    <p className="my-1">
                        {curPost.text}
                    </p>
                    <p className="post-date">
                        Posted on 04/16/2019
                    </p>
                    <Button as='div' labelPosition='right'>
                        <Button basic={!curPost.likes.map(like => like.user).includes(curUserId)} color='red' onClick={handleLikePost}>
                            <Icon name='heart'/>
                            Like
                        </Button>
                        <Label as='a' basic color='red' pointing='left'>
                            {curPost.likes.length}
                        </Label>
                    </Button>
                    <Button as='div' labelPosition='right'>
                        <Button basic color='blue'>
                            <Icon name='fork'/>
                            Discussion
                        </Button>
                        <Label as='a' basic color='blue' pointing='left'>
                            28
                        </Label>
                    </Button>
                </div>
            </div>
        </Fragment>
    );
};

PostItem.propTypes = {
    auth: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    getAllPostsAction: PropTypes.func.isRequired,
    likePostAction: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.authReducer,
    post: state.postReducer,
});

const mapActionToProps = {
    likePostAction, getAllPostsAction
}

export default connect(mapStateToProps, mapActionToProps)(PostItem);
