import React from 'react';
import PropTypes from 'prop-types';
import {Icon, Item, Message} from "semantic-ui-react";
import {Link} from "react-router-dom";
import DummyPhoto from "../../utils/dummy-photo";

const ProfileItem = ({
                         profile: {
                             user: {fullname}, facebook, instagram, linkedin, location, twitter, youtube, bio, _id
                         }
                     }) => {

    const randInt = Math.floor(Math.random() * 100);
    const hostPhotoURL = `https://randomuser.me/api/portraits/men/${randInt}.jpg`;
    return (
        <Item>
            <Item.Image><DummyPhoto size='tiny'/></Item.Image>


            <Item.Content>
                <Item.Header as={Link} to={{
                    pathname: '/profile',
                    profileProps: {id: _id, photoUrl: hostPhotoURL}
                }}>{fullname}</Item.Header>
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
