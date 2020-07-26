import React, {Fragment, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {createPostAction, getAllPostsAction} from "../../redux/action/post-action";
import {Icon} from "semantic-ui-react";
import PostItem from "./post-item";

const AllPosts = props => {
    useEffect(() => {
        props.getAllPostsAction();
    }, [props.getAllPostsAction])

    const [creatPostText, setCreatePostText] = useState({newPostText: ''});
    const {newPostText} = creatPostText;

    const handleTextOnChange = (e) => {
        setCreatePostText(
            {...creatPostText, [e.target.name]: e.target.value}
        )
    };

    const handleCreatePost = (e) => {
        e.preventDefault();
        props.createPostAction(newPostText);
        setCreatePostText({newPostText: ''})
    }

    return (
        <Fragment>
            {props.post.loading ? <div className="ui active centered inline loader">loading</div> :
                <Fragment>
                    <div className="ui icon green message" style={{color:'black'}}>
                        <Icon className="chat"/>
                        <div className="content">
                            <div className="header" style={{color:'black'}}>
                                Welcome to the Surviviors community!
                            </div>
                            <p>Sign up today to participate.</p>
                        </div>
                    </div>

                    {props.auth.isAuthenticated &&
                    (<div className="post-form">
                        <form className="form my-1" onSubmit={handleCreatePost}>
                                  <textarea
                                      name="newPostText"
                                      cols="30"
                                      rows="5"
                                      placeholder="Share something..."
                                      required
                                      value={newPostText} onChange={e => handleTextOnChange(e)}
                                  />
                            <input type="submit" className="btn btn-dark my-1" value="Submit"/>
                        </form>
                    </div>)
                    }

                    <div>
                        {props.post.posts.map(p => (
                            <PostItem key={p._id} postPassed={p}/>
                        ))}
                    </div>
                </Fragment>
            }
        </Fragment>
    );
};

AllPosts.propTypes = {
    post: PropTypes.object.isRequired,
    getAllPostsAction: PropTypes.func.isRequired,
    createPostAction: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    post: state.postReducer,
    auth: state.authReducer
});

const mapActionToProps = {
    getAllPostsAction,
    createPostAction
}

export default connect(mapStateToProps, mapActionToProps)(AllPosts);
