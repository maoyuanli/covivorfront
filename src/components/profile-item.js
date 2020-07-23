import React from 'react';
import PropTypes from 'prop-types';
import {Button, Icon, Image, Item} from "semantic-ui-react";

const ProfileItem = ({
                         profile: {
                             user: {_id, fullname}, facebook, hobby, instagram, linkedin, location, twitter, youtube,bio
                         }
                     }) => {
    return (
        <Item>
            <Item.Image size='tiny' src='https://react.semantic-ui.com/images/wireframe/image.png' />

            <Item.Content>
                <Item.Header as='a'>{fullname}</Item.Header>
                <Item.Meta> <div>
                    <Button color='facebook'>
                        <Icon name='facebook' /> Facebook
                    </Button>
                    <Button color='twitter'>
                        <Icon name='twitter' /> Twitter
                    </Button>
                    <Button color='linkedin'>
                        <Icon name='linkedin' /> LinkedIn
                    </Button>
                    <Button color='instagram'>
                        <Icon name='instagram' /> Instagram
                    </Button>
                    <Button color='youtube'>
                        <Icon name='youtube' /> YouTube
                    </Button>
                </div></Item.Meta>
                <Item.Description>
                    {bio}
                </Item.Description>
                <Item.Extra>{hobby}</Item.Extra>
            </Item.Content>
        </Item>
    );
};

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired,
};

export default ProfileItem;
