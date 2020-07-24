import React, {Fragment, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {commentPostAction, getAllPostsAction} from "../../redux/action/post-action";
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";

const Post = props => {
    useEffect(()=>{
        props.getAllPostsAction()
    },[props.getAllPostsAction])


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
        props.commentPostAction(propsPassed.id,newCommentText);
    }

    if(!propsPassed){
        props.history.push('/allposts')
    }else{
        const curPost = props.post.posts.filter(p=>p._id === propsPassed.id)[0]
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
                                      placeholder="Create a post"
                                      required
                                      value={newCommentText} onChange={e => handleTextOnChange(e)}
                                  />
                        <input type="submit" className="btn btn-dark my-1" value="Submit"/>
                    </form>
                </div>

                <div className="comments">
                    <div className="post bg-white p-1 my-1">
                        <div>
                            <a href="profile.html">
                                <img
                                    className="round-img"
                                    src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                                    alt=""
                                />
                                <h4>John Doe</h4>
                            </a>
                        </div>
                        <div>
                            <p className="my-1">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
                                possimus corporis sunt necessitatibus! Minus nesciunt soluta
                                suscipit nobis. Amet accusamus distinctio cupiditate blanditiis
                                dolor? Illo perferendis eveniet cum cupiditate aliquam?
                            </p>
                            <p className="post-date">
                                Posted on 04/16/2019
                            </p>
                        </div>
                    </div>

                    <div className="post bg-white p-1 my-1">
                        <div>
                            <a href="profile.html">
                                <img
                                    className="round-img"
                                    src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                                    alt=""
                                />
                                <h4>John Doe</h4>
                            </a>
                        </div>
                        <div>
                            <p className="my-1">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
                                possimus corporis sunt necessitatibus! Minus nesciunt soluta
                                suscipit nobis. Amet accusamus distinctio cupiditate blanditiis
                                dolor? Illo perferendis eveniet cum cupiditate aliquam?
                            </p>
                            <p className="post-date">
                                Posted on 04/16/2019
                            </p>
                            <button
                                type="button"
                                className="btn btn-danger"
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                </div>

            </Fragment>
        );
    }

    return null;
};

Post.propTypes = {
    
};

const mapStateToProps = state => ({
    post: state.postReducer,
    auth: state.authReducer
});

const mapActionToProps = {
    getAllPostsAction,
    commentPostAction
}

export default connect(mapStateToProps, mapActionToProps)(withRouter(Post));
