import React from 'react';
import Request from './PromiseRequest';

export default class UploadForm extends React.Component {

    constructor() {
        super();

        this.state = {
            error: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        const formdata = new FormData(document.querySelector('.uploadForm'));
        const request = new Request();
        const success = (data) => {
            this.props.onUpload(data);
            this.setState({ error: '' });
        };

        request.post('http://localhost:4001/upload', formdata)
        .then(success.bind(this), (err) => {
            // set the error on the form
            this.setState({ error: JSON.parse(err.message).error });
        });
    }

    render() {
        return (
            <form className="uploadForm" method="post" encType="multipart/form-data"> 
                <div className="error">{this.state.error}</div>
                <input type="file" name="upload" id="upload" required onChange={this.handleSubmit} />
            </form>
        );
    }
}

UploadForm.propTypes = {
    onUpload: React.PropTypes.func,
};
