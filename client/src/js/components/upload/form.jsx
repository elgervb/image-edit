import React from 'react';
import Request from './PromiseRequest';

export default class UploadForm extends React.Component {

    constructor() {
        super();

        this.state = {
            error: '',
            uploaded: false,
            images: [],
        };

        this.handleUpload = this.handleUpload.bind(this);
        this.handleFilePick = this.handleFilePick.bind(this);
    }

    handleUpload(e) {
        e.preventDefault();
        const formdata = new FormData(document.querySelector('.uploadform'));
        const request = new Request();
        const success = (data) => {
            this.props.onUpload(data);
            this.setState({
                error: '',
                uploaded: true,
            });
        };
        request.post('http://localhost:4001/upload', formdata)
        .then(success.bind(this), (err) => {
            // set the error on the form
            this.setState({ error: JSON.parse(err.message).error });
        });
    }

    handleFilePick(evt) {
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
                                images: this.state.images.concat({
                                    src: e.target.result,
                                    name: f.name,
                                    size: f.size,
                                    type: f.type,
                                }),
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
            <div className={this.state.uploaded ? 'overlay overlay--slideout' : 'overlay overlay--slidein'}>
                <form className="uploadform" method="post" encType="multipart/form-data">
                    <h1 className="uploadform__header">Upload your image</h1>
                    <div className="error">{this.state.error}</div>
                    <input type="file" name="upload" id="upload" className="uploadform__picker" required onChange={this.handleFilePick} />
                    <label htmlFor="upload" className="uploadform__button">Pick an image</label>

                    {this.state.images.length > 0 &&
                        <div className="button-group">
                            <button className="uploadform__button" onClick={this.handleUpload}>Upload</button>
                        </div>
                    }

                    {this.state.images.length > 0 && this.state.images.map(image =>
                        <div className="preview">
                            <p>{image.name}</p>
                            <img className="preview__thumb" src={image.src} />
                        </div>
                    )}
                </form>
            </div>
        );
    }
}

UploadForm.propTypes = {
    onUpload: React.PropTypes.func,
};
