import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {getAllPostsAction} from "../../redux/action/post-action";
import {Icon} from "semantic-ui-react";
import PostItem from "./post-item";

const AllPosts = props => {
    useEffect(() => {
        props.getAllPostsAction();
    }, [props.getAllPostsAction])

    return (
        <Fragment>
            {props.post.loading ? <div className="ui active centered inline loader">loading</div> :
                <Fragment>
                    <h1 className="large text-primary">
                        Posts
                    </h1>
                    <p className="lead"><Icon className="user"/> Welcome to the community!</p>

                    {props.auth.isAuthenticated && (<div className="post-form">
                        <div className="bg-primary p">
                            <h3>Say Something...</h3>
                        </div>
                        <form className="form my-1">
                              <textarea
                                  name="text"
                                  cols="30"
                                  rows="5"
                                  placeholder="Create a post"
                                  required
                              />
                            <input type="submit" className="btn btn-dark my-1" value="Submit"/>
                        </form>
                    </div>)}

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
    getAllPostsAction: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    post: state.postReducer,
    auth: state.authReducer
});

const mapActionToProps = {
    getAllPostsAction
}

export default connect(mapStateToProps, mapActionToProps)(AllPosts);
