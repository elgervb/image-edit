import React from 'react';
import Request from './PromiseRequest';
import FilePicker from './filepicker.jsx';
import ImagePreview from './imagepreview.jsx';
import ProgressBar from './progressbar.jsx';

export default class UploadForm extends React.Component {

    constructor() {
        super();

        this.UPLOAD_ID = 'uploadinput';

        this.state = {
            error: '',
            uploaded: false,
            images: [],
            progress: 0,
        };

        this.handleUpload = this.handleUpload.bind(this);
        this.handleFilePick = this.handleFilePick.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleDragOver = this.handleDragOver.bind(this);
    }

    handleClear() {
        this.setState({
            uploaded: false,
            images: [],
            progress: 0,
        });
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

        request.onProgress((pe) => {
            if (pe.lengthComputable) {
                const percentLoaded = Math.round((pe.loaded / pe.total) * 100);
                if (percentLoaded < 100) {
                    this.setState({ progress: percentLoaded });
                }
            }
        });

        request.post('http://localhost:4001/upload', formdata)
        .then(success.bind(this), (err) => {
            // set the error on the form
            let error;
            if (err.message) {
                error = JSON.parse(err.message).error;
            } else {
                error = 'Unable to upload at this time.';
            }

            this.setState({ error });
        });
    }

    componentDidMount() {
        this.dropzone = document.querySelector('.uploadform');
        this.dropzone.ondragover = this.handleDragOver;
        this.dropzone.ondragleave = () => this.dropzone.classList.remove('dropzone__hover');
        this.dropzone.ondrop = (evt) => {
            this.dropzone.classList.remove('dropzone__hover');
            this.handleFilePick(evt);
        };
    }

    handleDragOver(evt) {
        this.dropzone.classList.add('dropzone__hover');
        evt.stopPropagation();
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
    }

    handleFilePick(evt) {
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            evt.preventDefault();
            // handle file upload && drop
            const files = evt.target.files || evt.dataTransfer.files;
            let file, i;

            for (i = 0; i < files.length; i++) {
                file = files[i];
                if (!file.type.match('image.*')) {
                    this.setState({ error: 'Only images are allowed to upload' });
                } else {
                    const reader = new FileReader();
                    /* eslint-disable arrow-body-style */
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

                    reader.onprogress = (e) => {
                        if (e.lengthComputable) {
                            const percentLoaded = Math.round((e.loaded / e.total) * 100);
                            if (percentLoaded < 100) {
                                this.setState({ progress: percentLoaded });
                            }
                        }
                    };

                    reader.readAsDataURL(file);
                }
            }
        }
    }

    render() {
        return (
            <div className={this.state.uploaded ? 'overlay overlay--slideout' : 'overlay overlay--slidein'}>
                <form className="uploadform" method="post" encType="multipart/form-data">
                    <input type="file" accept="image/*" name="upload" id={this.UPLOAD_ID}
                      className="uploadform__picker" required onChange={this.handleFilePick} />

                    <h1 className="uploadform__header">{this.state.images.length === 0 ? 'Pick a new image' : 'Upload your image'}</h1>

                    {!this.state.images.length > 0 &&
                        <FilePicker linkTo={this.UPLOAD_ID} />
                    }

                    {this.state.images.length > 0 &&
                        <div className="button-group">
                            <button className="uploadform__button uploadform__button--remove" onClick={this.handleClear}>&times;</button>
                            <button className="uploadform__button" onClick={this.handleUpload}>Upload</button>
                        </div>
                    }

                    <ProgressBar progress={this.state.progress} />
                    <ImagePreview images={this.state.images} />
                </form>
            </div>
        );
    }
}

UploadForm.propTypes = {
    onUpload: React.PropTypes.func,
};
