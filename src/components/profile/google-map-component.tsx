import React from 'react';
import {Icon, Segment} from "semantic-ui-react";
import GoogleMapReact from 'google-map-react';
import {config} from "../../utils/config";

const Marker = () => <Icon name='marker' size='big' color='red'/>
// @ts-ignore
const GoogleMapComponent = ({lat, lng}) => {
    const zoom = 14;
    return (
        <Segment attached='bottom' style={{padding: 0}}>
            <div style={{height: '300px', width: '100%'}}>
                <GoogleMapReact
                    bootstrapURLKeys={{key: config.GOOGLE_MAP_API_KEY}}
                    defaultCenter={{lat, lng}}
                    defaultZoom={zoom}
                >
                    <Marker
                        // @ts-ignore
                        lat={lat}
                        lng={lng}
                    />
                </GoogleMapReact>
            </div>
        </Segment>
    );
};

export default GoogleMapComponent;
