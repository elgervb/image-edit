import React from 'react';
import Request from './PromiseRequest';

export default class Hello extends React.Component {

    constructor() {
        super();

        this.onSubmit.bind(this);
    }

    onSubmit() {
        console.log('submit form');
        const formdata = new FormData(document.querySelector('.uploadForm'));

        const request = new Request();
        request.post('http://localhost:4001/upload', formdata)
        .catch(() => {
            // set the error on the form
            console.error('Error uploading your file');
        })
        .then(() => {
            console.log('Successfully uploaded file');
        });
    }

    render() {
        return (
            <form className="uploadForm" method="post" encType="multipart/form-data" onSubmit={this.onSubmit}>
                <input type="file" name="upload" id="upload" required onChange={this.onSubmit} />
            </form>
        );
    }
}
