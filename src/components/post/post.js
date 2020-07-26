import React, {Fragment, useEffect, useState} from 'react';
import {commentPostAction, getAllPostsAction, unCommentPostAction} from "../../redux/action/post-action";
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";
import {Button, Item, ItemGroup} from "semantic-ui-react";

const Post = props => {
    useEffect(() => {
        props.getAllPostsAction()
    }, [props.getAllPostsAction])


    const propsPassed = props.location.postProps;

    const curUserId = props.auth.user ? props.auth.user._id : 0;

    const [commentText, setCommentTest] = useState({newCommentText: ''});
    const {newCommentText} = commentText;

    const handleTextOnChange = (e) => {
        setCommentTest(
            {...commentText, [e.target.name]: e.target.value}
        )
    };

    const handleCreateComment = (e) => {
        e.preventDefault();
        props.commentPostAction(propsPassed.id, newCommentText);
        setCommentTest({newCommentText: ''})
    }


    const handleDeleteComment = (e, commentId) => {
        e.preventDefault();
        props.unCommentPostAction(propsPassed.id, commentId)
    };

    if (!propsPassed) {
        props.history.push('/allposts')
    } else {
        const curPost = props.post.posts.filter(p => p._id === propsPassed.id)[0]
        const curPostUserProfile = props.profile.profiles.filter(p => p.user._id === curPost.user._id)[0];
        return (
            <Fragment>
                <Link to='/allposts' className="btn">Back To Posts</Link>
                <div className="post bg-white p-1 my-1">
                    <ItemGroup>
                        {!props.profile.loading && (<Item.Image src={curPostUserProfile.photoUrl}/>)}
                        <Item.Header>{curPost.user.fullname}</Item.Header>
                    </ItemGroup>
                    <div>
                        <p className="ui positive message" style={{fontSize: 'large'}}>
                            {curPost.text}
                        </p>
                        <p className="post-date">
                            {curPost.date}
                        </p>
                    </div>
                </div>

                <div className="post-form">
                    {curUserId === 0 ?
                        (<div className="bg-primary p">
                            <h3>Log in to comment</h3>
                        </div>) : (
                            <Fragment>
                                <div className="bg-primary p">
                                    <h3>Leave A Comment</h3>
                                </div>
                                <form className="form my-1" onSubmit={handleCreateComment}>
                                  <textarea
                                      name="newCommentText"
                                      cols="30"
                                      rows="5"
                                      placeholder="Type your comment"
                                      required
                                      value={newCommentText} onChange={e => handleTextOnChange(e)}
                                  />
                                    <input type="submit" className="btn btn-dark my-1" value="Submit"/>
                                </form>
                            </Fragment>
                        )}
                </div>

                <div className="comments">
                    {curPost.comments.map(c => {
                            const commentUserProfile = props.profile.profiles.filter(p => p.user._id === c.user)[0];
                            return (
                                <div key={c._id} className="post bg-white p-1 my-1">
                                    <ItemGroup>
                                        {!props.profile.loading && (<Item.Image src={commentUserProfile.photoUrl}/>)}
                                        <Item.Header>{c.fullname}</Item.Header>
                                    </ItemGroup>
                                    <div>
                                        <p className="ui info message" style={{fontSize: 'large'}}>
                                            {c.text}
                                        </p>
                                        <p className="post-date">
                                            {c.date}
                                        </p>
                                        {curUserId === c.user &&
                                        (<Button onClick={(event) => handleDeleteComment(event, c._id)}
                                                 color='brown'>Delete</Button>)}
                                    </div>

                                </div>
                            )
                        }
                    )}
                </div>
            </Fragment>
        );
    }

    return null;
};

Post.propTypes = {};

const mapStateToProps = state => ({
    post: state.postReducer,
    auth: state.authReducer,
    profile: state.profileReducer
});

const mapActionToProps = {
    getAllPostsAction,
    commentPostAction,
    unCommentPostAction,
}

export default connect(mapStateToProps, mapActionToProps)(withRouter(Post));
