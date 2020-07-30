import React, {Fragment, useEffect, useState} from 'react';
import {commentPostAction, getAllPostsAction, unCommentPostAction} from "../../redux/action/post-action";
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";
import {Button, Icon, Item, ItemGroup} from "semantic-ui-react";
import PropTypes from 'prop-types';
// @ts-ignore
const Post = ({post, auth, profile, getAllPostsAction, commentPostAction, unCommentPostAction, location, history}) => {
    useEffect(() => {
        getAllPostsAction()
    }, [getAllPostsAction])


    const propsPassed = location.postProps;

    const curUserId = auth.user ? auth.user._id : 0;

    const [commentText, setCommentTest] = useState({newCommentText: ''});
    const {newCommentText} = commentText;
// @ts-ignore
    const handleTextOnChange = (e) => {
        setCommentTest(
            {...commentText, [e.target.name]: e.target.value}
        )
    };
// @ts-ignore
    const handleCreateComment = (e) => {
        e.preventDefault();
        commentPostAction(propsPassed.id, newCommentText);
        setCommentTest({newCommentText: ''})
    }

// @ts-ignore
    const handleDeleteComment = (e, commentId) => {
        e.preventDefault();
        unCommentPostAction(propsPassed.id, commentId)
    };

    if (!propsPassed) {
        history.push('/allposts')
    }
    // @ts-ignore
    const curPost = post.posts.filter(p => p._id === propsPassed.id)[0]
    // @ts-ignore
    const curPostUserProfile = profile.profiles.filter(p => p.user._id === curPost.user._id)[0];

    return (
        <Fragment>
            <Button icon labelPosition='left' as={Link} to='/allposts' color='grey'>
                Back To Posts
                <Icon className='left arrow'/>
            </Button>
            <div className="post bg-white p-1 my-1">
                <ItemGroup>
                    {!profile.loading && (<Item.Image src={curPostUserProfile.photoUrl}/>)}
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
                            <form className="form my-1" onSubmit={handleCreateComment}>
                                  <textarea
                                      name="newCommentText"
                                      // @ts-ignore
                                      cols="30"
                                      // @ts-ignore
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
                {curPost.comments
                    // @ts-ignore
                    .map(c => {
                            // @ts-ignore
                            const commentUserProfile = profile.profiles.filter(p => p.user._id === c.user)[0];
                            return (
                                <div key={c._id} className="post bg-white p-1 my-1">
                                    <ItemGroup>
                                        {!profile.loading && (<Item.Image src={commentUserProfile.photoUrl}/>)}
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

};

Post.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    getAllPostsAction: PropTypes.func.isRequired,
    commentPostAction: PropTypes.func.isRequired,
    unCommentPostAction: PropTypes.func.isRequired,
};
// @ts-ignore
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

// @ts-ignore
export default connect(mapStateToProps, mapActionToProps)(withRouter(Post));
