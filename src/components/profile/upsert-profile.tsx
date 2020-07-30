import React, {Fragment, useEffect, useState} from 'react';
import {connect} from "react-redux";
import {Form, Icon, Image} from "semantic-ui-react";
import {getProfileAction, upsertProfileAction} from "../../redux/action/profile-action";
import PropTypes from 'prop-types';
import {Link, withRouter} from "react-router-dom";
// @ts-ignore
const UpsertProfile = ({profile, history, upsertProfileAction, getProfileAction}) => {

    useEffect(() => {
        getProfileAction();
    }, [getProfileAction]);

    const loadedProf = profile.profile !== null && profile.profile.profile.length !== 0 ? profile.profile.profile[0] : ''

    const [formData, setFormData] = useState({
        location: loadedProf ? loadedProf.location : '',
        bio: loadedProf ? loadedProf.bio : '',
        photoUrl: loadedProf ? loadedProf.photoUrl : '',
        youtube: loadedProf ? loadedProf.youtube : '',
        twitter: loadedProf ? loadedProf.twitter : '',
        facebook: loadedProf ? loadedProf.facebook : '',
        linkedin: loadedProf ? loadedProf.linkedin : '',
        instagram: loadedProf ? loadedProf.instagram : ''
    })

    const {
        location,
        bio,
        photoUrl,
        youtube,
        twitter,
        facebook,
        linkedin,
        instagram
    } = formData

    const [displaySocialInputs, toggleDisplaySocialInputs] = useState(false)
// @ts-ignore
    const handleOnChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    };
// @ts-ignore
    const handleOnSubmit = (e) => {
        e.preventDefault();
        upsertProfileAction(formData, history);

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
            <Image src={photoUrl} size='small'/>
            <Form className="form" onSubmit={handleOnSubmit}>
                <Form.Field>
                    <label>Profile Photo Link</label>
                    <input type="text" placeholder="Profile Photo Url Link" name="photoUrl" required
                           value={photoUrl} onChange={e => handleOnChange(e)}
                    />
                    <small className="form-text"
                    >currently supports photo url, photo upload on the way</small
                    >
                </Form.Field>
                <Form.Field>
                    <label>Location of Exposure</label>
                    <input type="text" placeholder="* Location" name="location" required
                           value={location} onChange={e => handleOnChange(e)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Bio</label>
                    <textarea placeholder="* A short bio of yourself" name="bio" required
                              value={bio} onChange={e => handleOnChange(e)}
                    />
                </Form.Field>
                <div className="my-2">
                    <div className="my-2">
                        <button type="button" className="ui primary button"
                                onClick={() => toggleDisplaySocialInputs(!displaySocialInputs)}>
                            Add Social Network Links
                        </button>
                        {' '}
                        <span>Optional</span>
                    </div>
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
            </Form>
        </Fragment>
    );
};

UpsertProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    upsertProfileAction: PropTypes.func.isRequired,
    getProfileAction: PropTypes.func.isRequired,
};
// @ts-ignore
const mapStateToProps = state => ({
    profile: state.profileReducer,
});

const mapActionToProps = {
    upsertProfileAction,
    getProfileAction
};
// @ts-ignore
export default connect(mapStateToProps, mapActionToProps)(withRouter(UpsertProfile));
