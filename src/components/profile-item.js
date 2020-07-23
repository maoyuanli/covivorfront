import React from 'react';
import PropTypes from 'prop-types';

const ProfileItem = ({
                         profile: {
                             user: {_id, fullname}, facebook, hobby, instagram, linkedin, location, twitter, youtube
                         }
                     }) => {
    return (
        <div>
            {fullname}
        </div>
    );
};

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired,
};

export default ProfileItem;
