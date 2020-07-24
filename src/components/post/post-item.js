import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Button, Icon, Label} from "semantic-ui-react";
import {connect} from "react-redux";

const PostItem = props => {
    const randInt = Math.floor(Math.random() * 100);
    const hostPhotoURL = `https://randomuser.me/api/portraits/men/${randInt}.jpg`;
    const usersLiked = props.post.likes.map(like=>like.user);
    const curUserId = props.auth.user ? props.auth.user._id : 0
    const alreadyLiked = usersLiked.includes(curUserId);
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
                        <h4>{props.post.user.fullname}</h4>
                    </a>
                </div>
                <div>
                    <p className="my-1">
                        {props.post.text}
                    </p>
                    <p className="post-date">
                        Posted on 04/16/2019
                    </p>
                    <Button as='div' labelPosition='right'>
                        <Button basic={!alreadyLiked} color='red'>
                            <Icon name='heart' />
                            Like
                        </Button>
                        <Label as='a' basic color='red' pointing='left'>
                            {props.post.likes.length }
                        </Label>
                    </Button>
                    <Button as='div' labelPosition='right'>
                        <Button basic color='blue'>
                            <Icon name='fork' />
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
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.authReducer
});

const mapActionToProps = {

}

export default connect(mapStateToProps, mapActionToProps)(PostItem);
