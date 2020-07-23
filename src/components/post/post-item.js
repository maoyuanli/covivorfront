import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

const PostItem = props => {
    const randInt = Math.floor(Math.random() * 100);
    const hostPhotoURL = `https://randomuser.me/api/portraits/men/${randInt}.jpg`
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
                    <button type="button" className="btn btn-light">
                        <i className="fas fa-thumbs-up"></i>
                        <span>4</span>
                    </button>
                    <button type="button" className="btn btn-light">
                        <i className="fas fa-thumbs-down"></i>
                    </button>
                    <a href="post.html" className="btn btn-primary">
                        Discussion <span className='comment-count'>2</span>
                    </a>
                    <button
                        type="button"
                        className="btn btn-danger"
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </div>
            </div>
        </Fragment>
    );
};

PostItem.propTypes = {

};

export default PostItem;
