import React from 'react';
import UploadForm from './upload/form.jsx';
import ImagePanel from './imagepanel/imagepanel.jsx';

export default class App extends React.Component {

    constructor() {
        super();

        this.onUpload = this.onUpload.bind(this);
    }

    onUpload(data) {
        // do something with the upload
        this.imagepanel.setState({ image: data.url });
    }

    render() {
        return (
            <div>
                <UploadForm onUpload={this.onUpload} />
                <ImagePanel ref={(c) => { this.imagepanel = c; }} />
            </div>
        );
    }
}
