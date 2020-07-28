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
    const itemsPerPage = 5;

    const indexOfLastItemOnPage = currentPage * itemsPerPage;
    const indexOfFirstItemOnPage = indexOfLastItemOnPage - itemsPerPage;

    const paginate = (page) => {
        setCurrentPage(page)
    };

    const handleClickNext = () => {
        if (currentPage < Math.ceil(profile.profiles.length / itemsPerPage))
            setCurrentPage(currentPage + 1)
    };

    const handleClickPrev = () => {
        if (currentPage > 1)
            setCurrentPage(currentPage - 1)
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
                                profile.profiles.slice(indexOfFirstItemOnPage, indexOfLastItemOnPage).map(p => {
                                        return <ProfileItem key={p._id} profile={p}/>
                                    }
                                )
                            ) :
                            <h3>No Profiles Found</h3>}
                    </ItemGroup>
                </Fragment>}
            <Pagination itemsPerPage={itemsPerPage} totalItems={profile.profiles.length}
                        paginate={paginate} onClickNext={handleClickNext} onClickPrev={handleClickPrev}/>

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
