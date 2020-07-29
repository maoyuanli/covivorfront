import React, {Fragment, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {createPostAction, getAllPostsAction} from "../../redux/action/post-action";
import {Icon} from "semantic-ui-react";
import PostItem from "./post-item";
import Pagination from "../../utils/pagination";

const AllPosts = ({auth, post, getAllPostsAction, createPostAction}) => {
    useEffect(() => {
        getAllPostsAction();
    }, [getAllPostsAction])

    const [creatPostText, setCreatePostText] = useState({newPostText: ''});
    const {newPostText} = creatPostText;

    const handleTextOnChange = (e) => {
        setCreatePostText(
            {...creatPostText, [e.target.name]: e.target.value}
        )
    };

    const handleCreatePost = (e) => {
        e.preventDefault();
        createPostAction(newPostText);
        setCreatePostText({newPostText: ''})
    }

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const indexOfLastItemOnPage = currentPage * itemsPerPage;
    const indexOfFirstItemOnPage = indexOfLastItemOnPage - itemsPerPage;

    const paginate = (page) => {
        setCurrentPage(page)
    };

    const handleClickNext = () => {
        if (currentPage < Math.ceil(post.posts.length / itemsPerPage))
            setCurrentPage(currentPage + 1)
    };

    const handleClickPrev = () => {
        if (currentPage > 1)
            setCurrentPage(currentPage - 1)
    };

    return (
        <Fragment>
            {post.loading ? <div className="ui active centered inline loader">loading</div> :
                <Fragment>
                    <div className="ui icon green message" style={{color: 'black'}}>
                        <Icon className="chat"/>
                        <div className="content">
                            <div className="header" style={{color: 'black'}}>
                                Welcome to the Surviviors community!
                            </div>
                            <p>Sign up today to participate.</p>
                        </div>
                    </div>

                    {auth.isAuthenticated &&
                    (<div className="post-form">
                        <form className="form my-1" onSubmit={handleCreatePost}>
                                  <textarea
                                      name="newPostText"
                                      // @ts-ignore
                                      cols="30"
                                      // @ts-ignore
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
                        {post.posts.slice(indexOfFirstItemOnPage,indexOfLastItemOnPage).map(p => (
                            <PostItem key={p._id} postPassed={p}/>
                        ))}
                    </div>
                </Fragment>
            }
            <Pagination itemsPerPage={itemsPerPage} totalItems={post.posts.length}
                        paginate={paginate} onClickNext={handleClickNext} onClickPrev={handleClickPrev}/>
        </Fragment>
    );
};

AllPosts.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
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
