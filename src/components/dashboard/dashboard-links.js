import React, {Fragment} from 'react';
import {Link} from "react-router-dom";
import {Icon} from "semantic-ui-react";

const DashboardLinks = () => {
    return (
        <Fragment>
            <div className="dash-buttons">
                <Link to="/create-profile" className="btn btn-light"
                ><Icon className="edit"/> Edit Profile</Link
                >
            </div>
        </Fragment>
    );
};

export default DashboardLinks;
