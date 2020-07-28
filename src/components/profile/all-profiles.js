import React, {Fragment, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {getAllProfilesAction} from "../../redux/action/profile-action";
import {Header, ItemGroup, Message} from "semantic-ui-react";
import ProfileItem from "./profile-item";
import Pagination from "../../utils/pagination";

const AllProfiles = ({getAllProfilesAction, profile}) => {

    useEffect(() => {
        getAllProfilesAction();
    }, [getAllProfilesAction]);

    const [currentPage, setCurrentPage] = useState(1);
    const profilesPerPage = 2;

    const indexOfLastProfileOnPage = currentPage * profilesPerPage;
    const indexOfFirstProfileOnPage = indexOfLastProfileOnPage - profilesPerPage;
    console.log(indexOfFirstProfileOnPage, indexOfLastProfileOnPage)

    const paginate = (page) => {
        setCurrentPage(page)
    };

    return (
        <Fragment>
            {profile.loading ?
                <div className="ui active centered inline loader">loading</div> :
                <Fragment>
                    <Header as='h1' color='blue' className="large text-primary"
                            style={{fontFamily: 'Special Elite'}}>Survivors</Header>
                    <Message info>
                        <Message.Header>Connect with each other</Message.Header>
                    </Message>
                    <ItemGroup>
                        {profile.profiles.length > 0 ?
                            (
                                profile.profiles.slice(indexOfFirstProfileOnPage, indexOfLastProfileOnPage).map(p => {
                                        return <ProfileItem key={p._id} profile={p}/>
                                    }
                                )
                            ) :
                            <h3>No Profiles Found</h3>}
                    </ItemGroup>
                </Fragment>}
            <nav>
                <ul className="pagination">
                    <li className="page-item">
                        <a className="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                            <span className="sr-only">Previous</span>
                        </a>
                    </li>
                    <Pagination itemsPerPage={profilesPerPage} totalItems={profile.profiles.length}
                                paginate={paginate}/>
                    <li className="page-item">
                        <a className="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                            <span className="sr-only">Next</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </Fragment>
    );
};

AllProfiles.propTypes = {
    getAllProfilesAction: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    profile: state.profileReducer
});

const mapActionToProps = {
    getAllProfilesAction
}

export default connect(mapStateToProps, mapActionToProps)(AllProfiles);
