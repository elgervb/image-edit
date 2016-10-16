import React from 'react';
import Request from './PromiseRequest';

export default class UploadForm extends React.Component {

    constructor() {
        super();

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        const formdata = new FormData(document.querySelector('.uploadForm'));
        const request = new Request();
        const success = (xhr) => {
            const data = JSON.parse(xhr.response);
            this.props.onUpload(data);
            console.log('Successfully uploaded file', xhr, data);
        };

        request.post('http://localhost:4001/upload', formdata)
        .then(success.bind(this), (err) => {
            // set the error on the form
            console.error('Error uploading your file', err);
        });
    }

    render() {
        return (
            <form className="uploadForm" method="post" encType="multipart/form-data"> 
                <input type="file" name="upload" id="upload" required onChange={this.handleSubmit} />
            </form>
        );
    }
}

UploadForm.propTypes = {
    onUpload: React.PropTypes.func,
};
