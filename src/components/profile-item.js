import React from 'react';
import PropTypes from 'prop-types';
import {Button, Icon, Item, Message} from "semantic-ui-react";
import {Link} from "react-router-dom";

const ProfileItem = ({
                         profile: {
                             user: {fullname}, facebook, instagram, linkedin, location, twitter, youtube, bio, _id
                         }
                     }) => {

    const randInt = Math.floor(Math.random() * 100);
    const hostPhotoURL = `https://randomuser.me/api/portraits/men/${randInt}.jpg`;
    return (
        <Item>
            <Item.Image size='tiny' src={hostPhotoURL}/>

            <Item.Content>
                <Item.Header as={Link} to={{pathname: '/profile', profileProps: {id: _id}}}>{fullname}</Item.Header>
                <Message
                    info
                    header={bio}
                />
                <Item.Meta>
                    <div>
                        {facebook && (<Button color='facebook'>
                            <Icon name='facebook'/> {facebook}
                        </Button>)}
                        {twitter && (<Button color='twitter'>
                            <Icon name='twitter'/> {twitter}
                        </Button>)}
                        {instagram && (<Button color='instagram'>
                            <Icon name='instagram'/> {instagram}
                        </Button>)}
                        {linkedin && (<Button color='linkedin'>
                            <Icon name='linkedin'/> {linkedin}
                        </Button>)}
                        {youtube && (<Button color='youtube'>
                            <Icon name='youtube'/> {youtube}
                        </Button>)}
                    </div>
                </Item.Meta>
                <Item.Extra><Icon className='map marker'/>{location}</Item.Extra>
            </Item.Content>
        </Item>
    );
};

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired,
};

export default ProfileItem;
