import React from 'react';
import PropTypes from 'prop-types';
import {Icon, Item, Label} from "semantic-ui-react";
import {Link} from "react-router-dom";

const ProfileItem = ({
                         profile: {
                             user: {fullname}, facebook, instagram, linkedin, location, twitter, youtube, bio, _id, photoUrl
                         }
                     }) => {
    return (
        <Item>

            <Item.Image size='small' src={photoUrl}/>
            <Item.Content>
                <div className="ui raised segment">
                    <Label
                        content={fullname}
                        className='ui blue ribbon label'
                        style={{fontSize: 'medium'}}
                        as={Link} to={{
                        pathname: '/profile',
                        profileProps: {id: _id, photoUrl: photoUrl, profileLocation: location}
                    }}
                    />
                    <span style={{fontFamily: 'Itim', fontSize: '20px'}}>{bio}</span>
                </div>
                <Item.Extra>Reported Exposure at <Icon className='map marker'/>{location}</Item.Extra>
            </Item.Content>
        </Item>
    );
};

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired,
};

export default ProfileItem;
