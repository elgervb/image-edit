/* http://andrewhfarmer.com/react-ajax-best-practices/#2-container-components */
import React from 'react';
import SideBar from './sidebar.jsx';
import Request from './PromiseRequest';

export default class SideBarContainer extends React.Component {
    constructor() {
        super();

        this.state = {
            filters: [],
        };

        this.fetch();
    }

    fetch() {
        const request = new Request();
        request.get('http://localhost:4001/filters')
            .then((json) => {
                this.state.filters = json;
                this.forceUpdate();
            });
    }

    render() {
        if (this.state.filters) {
            return (
                <SideBar items={this.state.filters} handleFilter={this.props.handleFilter} />
            );
        }

        return null;
    }
}

SideBarContainer.propTypes = {
    handleFilter: React.PropTypes.func,
};
