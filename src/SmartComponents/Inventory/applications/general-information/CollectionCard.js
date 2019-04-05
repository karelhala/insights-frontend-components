import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoadingCard from './LoadingCard';
import { collectionInformationSelector } from './selectors';

const CollectionCard = ({ detailLoaded, collectionInformation, entity }) => (<LoadingCard
    title="Collection information"
    isLoading={ !detailLoaded }
    items={ [
        { title: 'Insights client', value: collectionInformation.client },
        { title: 'Egg', value: collectionInformation.egg },
        { title: 'Last check-in', value: entity.updated },
        { title: 'Registred', value: entity.created }
    ] }
/>);

CollectionCard.propTypes = {
    detailLoaded: PropTypes.bool,
    handleClick: PropTypes.func,
    entity: PropTypes.shape({
        updated: PropTypes.string,
        created: PropTypes.string
    }),
    collectionInformation: PropTypes.shape({
        client: PropTypes.string,
        egg: PropTypes.string
    })
};
CollectionCard.defaultProps = {
    detailLoaded: false,
    handleClick: () => undefined
};

export default connect(({
    entityDetails: {
        entity,
        systemProfile
    }
}) => ({
    entity,
    detailLoaded: systemProfile && systemProfile.loaded,
    collectionInformation: collectionInformationSelector(systemProfile)
}))(CollectionCard);
