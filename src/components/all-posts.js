import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {getAllPostsAction} from "../redux/action/post-action";

const AllPosts = props => {
    useEffect(()=>{
        props.getAllPostsAction();
    },[props.getAllPostsAction])

    return (
        <Fragment>

        </Fragment>
    );
};

AllPosts.propTypes = {
    post: PropTypes.object.isRequired,
    getAllPostsAction: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    post: state.postReducer
});

const mapActionToProps = {
    getAllPostsAction
}

export default connect(mapStateToProps, mapActionToProps)(AllPosts);
