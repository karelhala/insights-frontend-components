import React from 'react';
import { connect } from 'react-redux';
import InventoryEntityTable from './EntityTable';
import { Button } from '@patternfly/react-core';
import { loadEntities, filterEntities, showEntities } from '../../redux/actions/inventory';
import { SimpleTableFilter } from '../../PresentationalComponents/SimpleTableFilter';
import { Grid, GridItem } from '@patternfly/react-core';
import PropTypes from 'prop-types';
import './InventoryList.scss';

class InventoryList extends React.Component {
    constructor(props) {
        super(props);
    }

    filterEntities = (filterBy) => {
        this.props.filterEntities && this.props.filterEntities('display_name', filterBy);
    }

    loadEntities = () => {
        this.props.loadEntities && this.props.loadEntities(
            this.props.items,
            {
                prefix: this.props.pathPrefix,
                base: this.props.apiBase
            }
        );
    }

    componentDidMount() {
        this.loadEntities();
    }

    render() {
        const { showHealth, entites } = this.props;
        return (
            <React.Fragment>
                <Grid guttter="sm" className="ins-inventory-list">
                    <GridItem span={ 12 }>
                        <InventoryEntityTable showHealth={ showHealth }/>
                    </GridItem>
                    <GridItem span={ 1 }>
                        <div className='buttons'>
                            <Button variant='primary' onClick={ this.loadEntities }>Refresh</Button>
                        </div>
                    </GridItem>
                </Grid>
            </React.Fragment>
        );
    }
}

InventoryList.propTypes = {
    filterEntities: PropTypes.func,
    loadEntities: PropTypes.func,
    pathPrefix: PropTypes.number,
    apiBase: PropTypes.string,
    showHealth: PropTypes.bool,
    items: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.shape({
            id: PropTypes.string
        })
    ]),
    entites: PropTypes.arrayOf(PropTypes.any)
};

function mapDispatchToProps(dispatch) {
    return {
        loadEntities: (items = [], config) => {
            const itemIds = items.reduce((acc, curr) => (
                [
                    ...acc,
                    typeof curr === 'string' ? curr : curr.id
                ]
            ), []);
            dispatch(loadEntities(itemIds, config));
            dispatch(showEntities(items.map(oneItem => (
                { ...typeof oneItem === 'string' ? { id: oneItem } : oneItem }
            ))));
        },
        filterEntities: (key = 'display_name', filterBy) => dispatch(filterEntities(key, filterBy))
    };
}

export default connect(() => ({}), mapDispatchToProps)(InventoryList);
