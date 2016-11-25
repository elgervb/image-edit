import React from 'react';
import UploadForm from './upload/form.jsx';
import ImagePanel from './imagepanel/imagepanel.jsx';
import SideBarContainer from './sidebar/sidebarcontainer.jsx';
import Overlay from './generic/overlay.jsx';
import Request from './generic/PromiseRequest';
import UrlBuilder from '../utils/urlbuilder';
import {} from '../../scss/main.scss';

export default class App extends React.Component {

    constructor() {
        super();

        this.state = {
            image: null, // the uploaded image
            filter: null, // the filter applied
            working: false,
            url: null,
            blob: null,
        };

        this.onUpload = this.onUpload.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
    }

    get imageUrl() {
        return UrlBuilder.generateUrl(this.state.image, this.state.filter, this.state.args);
    }

    onUpload(blob) {
        // do something with the upload
        this.state.image = blob.filename;

        this.setState({
            url: this.imageUrl,
        });
    }

    handleFilterChange(filtername, args) {
        this.state.filter = filtername; // needed by this.imageUrl()
        this.state.args = args;
        this.setState({ working: true });
        const request = new Request('blob');
        request.get(this.imageUrl)
        .then((blob) => {
            this.setState({ working: false, blob });
        }, () => {
            this.setState({ working: false });
        });
    }

    render() {
        return (
            <div className="layout full-height">
                <UploadForm onUpload={this.onUpload} />
                <SideBarContainer handleFilter={this.handleFilterChange} />
                <ImagePanel image={this.state.url} blob={this.state.blob} />
                <Overlay show={this.state.working} />
            </div>
        );
    }
}
