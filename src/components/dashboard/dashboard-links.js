import React, {Fragment} from 'react';
import {Link} from "react-router-dom";
import {Icon} from "semantic-ui-react";

const DashboardLinks = () => {
    return (
        <Fragment>
            <div className="dash-buttons">
                <Link to="/upsert-profile" className="ui primary button"
                ><Icon className="edit"/> Edit Profile</Link
                >
            </div>
        </Fragment>
    );
};

export default DashboardLinks;
