import React, {Fragment, useEffect, useState} from 'react';
import {commentPostAction, getAllPostsAction, unCommentPostAction} from "../../redux/action/post-action";
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";
import {Button} from "semantic-ui-react";

const Post = props => {
    useEffect(() => {
        props.getAllPostsAction()
    }, [props.getAllPostsAction])


    const propsPassed = props.location.postProps;

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
        return (
            <Fragment>
                <Link to='/allposts' className="btn">Back To Posts</Link>
                <div className="post bg-white p-1 my-1">
                    <div>
                        <a>
                            <img
                                className="round-img"
                                src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                                alt=""
                            />
                            <h4>{curPost.user.fullname}</h4>
                        </a>
                    </div>
                    <div>
                        <p className="my-1">
                            {curPost.text}
                        </p>
                    </div>
                </div>

                <div className="post-form">
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
                </div>

                <div className="comments">
                    {curPost.comments.map(c => (
                        <div className="post bg-white p-1 my-1">
                            <div>
                                <a>
                                    <img
                                        className="round-img"
                                        src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                                        alt=""
                                    />
                                    <h4>{c.fullname}</h4>
                                </a>
                            </div>
                            <div>
                                <p className="my-1">
                                    {c.text}
                                </p>
                                <p className="post-date">
                                    {c.date}
                                </p>
                                {props.auth.user._id === c.user &&
                                (<Button onClick={(event) => handleDeleteComment(event, c._id)}
                                         color='brown'>Delete</Button>)}
                            </div>

                        </div>
                    ))}
                </div>
            </Fragment>
        );
    }

    return null;
};

Post.propTypes = {};

const mapStateToProps = state => ({
    post: state.postReducer,
    auth: state.authReducer
});

const mapActionToProps = {
    getAllPostsAction,
    commentPostAction,
    unCommentPostAction
}

export default connect(mapStateToProps, mapActionToProps)(withRouter(Post));
