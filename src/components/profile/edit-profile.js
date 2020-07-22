import React, {Fragment, useEffect, useState} from 'react';
import {connect} from "react-redux";
import {Icon} from "semantic-ui-react";
import {getProfileAction, upsertProfileAction} from "../../redux/action/profile-action";
import PropTypes from 'prop-types';
import {Link, withRouter} from "react-router-dom";

const EditProfile = props => {
    const [formData, setFormData] = useState({
        location: '',
        bio: '',
        hobby: '',
        youtube: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        instagram: ''
    })

    const {
        location,
        bio,
        hobby,
        youtube,
        twitter,
        facebook,
        linkedin,
        instagram
    } = formData

    const [displaySocialInputs, toggleDisplaySocialInputs] = useState(false)

    useEffect(() => {
        props.getProfileAction();
    }, [])

    const handleOnChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        props.upsertProfileAction(formData, props.history);

    };


    return (
        <Fragment>
            <h1 className="large text-primary">
                Create/Update Your Profile
            </h1>
            <p className="lead">
                <Icon name='user'/> Let's get some information to make your
                profile stand out
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={handleOnSubmit}>
                <div className="form-group">
                    <input type="text" placeholder="* Location" name="location" required
                           value={location} onChange={e => handleOnChange(e)}
                    />
                    <small className="form-text"
                    >City & state suggested (eg. Toronto, ON)</small
                    >
                </div>
                <div className="form-group">
                    <textarea placeholder="* A short bio of yourself" name="bio" required
                              value={bio} onChange={e => handleOnChange(e)}
                    />
                    <small className="form-text">Tell us a little about yourself</small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Hobby" name="hobby"
                           value={hobby} onChange={e => handleOnChange(e)}
                    />
                    <small className="form-text"
                    >Please use comma separated values (eg.
                        movie,outdoors,swimming,photography)</small
                    >
                </div>
                <div className="my-2">
                    <div className="my-2">
                        <button type="button" className="ui primary button"
                                onClick={() => toggleDisplaySocialInputs(!displaySocialInputs)}>
                            Add Social Network Links
                        </button>
                        {' '}
                        <span>Optional</span>
                    </div>
                    <span>Optional</span>
                </div>
                {displaySocialInputs &&
                <Fragment>
                    <div className="form-group social-input">
                        <Icon name='twitter'/>
                        <input type="text" placeholder="Twitter URL" name="twitter"
                               value={twitter} onChange={e => handleOnChange(e)}
                        />
                    </div>

                    <div className="form-group social-input">
                        <Icon name='facebook'/>
                        <input type="text" placeholder="Facebook URL" name="facebook"
                               value={facebook} onChange={e => handleOnChange(e)}
                        />
                    </div>

                    <div className="form-group social-input">
                        <Icon name='youtube'/>
                        <input type="text" placeholder="YouTube URL" name="youtube"
                               value={youtube} onChange={e => handleOnChange(e)}
                        />
                    </div>

                    <div className="form-group social-input">
                        <Icon name='linkedin'/>
                        <input type="text" placeholder="Linkedin URL" name="linkedin"
                               value={linkedin} onChange={e => handleOnChange(e)}
                        />
                    </div>

                    <div className="form-group social-input">
                        <Icon name='instagram'/>
                        <input type="text" placeholder="Instagram URL" name="instagram"
                               value={instagram} onChange={e => handleOnChange(e)}
                        />
                    </div>
                </Fragment>}


                <input type="submit" className="btn btn-primary my-1"/>
                <Link className="btn btn-light my-1" to='/dashboard'>Go Back</Link>
            </form>
        </Fragment>
    );
};

EditProfile.propTypes = {
    upsertProfileAction: PropTypes.func.isRequired,
    getProfileAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    profile: state.profileReducer,
    auth: state.authReducer
});

const mapActionToProps = {
    upsertProfileAction, getProfileAction
};


export default connect(mapActionToProps, mapActionToProps)(withRouter(EditProfile));
