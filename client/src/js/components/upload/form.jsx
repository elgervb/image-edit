import React from 'react';
import Request from './PromiseRequest';

export default class UploadForm extends React.Component {

    constructor() {
        super();

        this.state = {
            error: '',
        };

        this.handleUpload = this.handleUpload.bind(this);
    }

    handleUpload(evt) {
        debugger;
        const formdata = new FormData(document.querySelector('.uploadform'));
        const request = new Request();
        const success = (data) => {
            this.props.onUpload(data);
            this.setState({ error: '' });
        };

        this.showPreview(evt);

        request.post('http://localhost:4001/upload', formdata)
        .then(success.bind(this), (err) => {
            // set the error on the form
            this.setState({ error: JSON.parse(err.message).error });
        });
    }

    showPreview(evt) {
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            const files = evt.target.files;
            let file, i;

            for (i = 0; i < files.length; i++) {
                file = files[i];

                if (file.type.match('image.*')) {
                    const reader = new FileReader();
                    /* eslint-disable arrow-body-style */
                    //
                    reader.onload = ((f) => {
                        return (e) => {
                            this.setState({
                                image: {
                                    src: e.target.result,
                                    name: f.name,
                                },
                            });
                        };
                    })(file);
                    /* eslint-enable arrow-body-style */

                    reader.readAsDataURL(file);
                }
            }
        }
    }

    render() {
        return (
            <div className="overlay overlay--slidein">
                <form className="uploadform" method="post" encType="multipart/form-data">
                    <h1 className="uploadform__header">Upload your image</h1>
                    <div className="error">{this.state.error}</div>
                    <input type="file" name="upload" id="upload" required onChange={this.handleUpload} />
                    <label htmlFor="upload" className="uploadform__button">Upload</label>

                    <div className="preview">
                        <p>{(this.state.image) ? this.state.image.name : ''}</p>
                        <img className="preview__thumb" src={(this.state.image) ? this.state.image.src : ''} />
                    </div>
                </form>
            </div>
        );
    }
}

UploadForm.propTypes = {
    onUpload: React.PropTypes.func,
};
