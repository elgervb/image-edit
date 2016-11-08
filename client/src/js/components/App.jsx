import React from 'react';
import UploadForm from './upload/form.jsx';
import ImagePanel from './imagepanel/imagepanel.jsx';
import SideBarContainer from './sidebarcontainer.jsx';
import {} from '../../scss/main.scss';

export default class App extends React.Component {

    constructor() {
        super();

        this.state = {
            image: null,
            filter: null,
        };

        this.onUpload = this.onUpload.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
    }

    onUpload(data) {
        // do something with the upload
        this.setState({ image: data.filename });
    }

    handleFilterChange(filtername) {
        this.setState({ filter: filtername });
    }

    render() {
        return (
            <div className="layout full-height">
                <UploadForm onUpload={this.onUpload} />
                <SideBarContainer handleFilter={this.handleFilterChange} />
                <ImagePanel image={this.state.image} filter={this.state.filter} />
            </div>
        );
    }
}
