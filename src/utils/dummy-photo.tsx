import React from 'react';
import {Image} from "semantic-ui-react";

const DummyPhoto = React.memo(
    // @ts-ignore
    function generatePhoto({size}) {
        const randInt = Math.floor(Math.random() * 100);
        const randGender = randInt > 50 ? 'women' : 'men'
        const photoUrl = `https://randomuser.me/api/portraits/${randGender}/${randInt}.jpg`;
        return (
            <Image src={photoUrl} size={size} circular/>
        )
    }
);

export default DummyPhoto;
