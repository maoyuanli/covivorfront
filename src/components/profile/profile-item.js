import React from 'react';
import PropTypes from 'prop-types';
import {Icon, Item, Message} from "semantic-ui-react";
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

                <Item.Header as={Link} to={{
                    pathname: '/profile',
                    profileProps: {id: _id, photoUrl: photoUrl}
                }}><a className="ui blue ribbon label">{fullname}</a></Item.Header>
                <Message
                    info
                    header={bio}
                />
                <Item.Extra><Icon className='map marker'/>{location}</Item.Extra>
            </Item.Content>
        </Item>
    );
};

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired,
};

export default ProfileItem;
