import React from 'react';
import UploadForm from './upload/form.jsx';
import ImagePanel from './imagepanel/imagepanel.jsx';
import SideBar from './sidebar.jsx';
import {} from '../../scss/main.scss';

export default class App extends React.Component {

    constructor() {
        super();

        this.onUpload = this.onUpload.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);

        this.menuitems = [
            { name: 'brightness' },
            { name: 'colorize' },
            { name: 'comic' },
            { name: 'contrast' },
            { name: 'darken' },
            { name: 'dodge' },
            { name: 'duotone' },
            { name: 'edgeDetect' },
            { name: 'emboss' },
            { name: 'findEdges' },
            { name: 'flip' },
            { name: 'gammaCorrection' },
            { name: 'gaussianBlur' },
            { name: 'greyscale' },
            { name: 'hueRotate' },
            { name: 'meanremove' },
            { name: 'motionBlur' },
            { name: 'negative' },
            { name: 'noise' },
            { name: 'oldCardboard' },
            { name: 'pixelate' },
            { name: 'rotate' },
            { name: 'roundedCorners' },
            { name: 'scatter' },
            { name: 'selectiveBlur' },
            { name: 'semiGrayscale' },
            { name: 'sepia' },
            { name: 'sepiaFast' },
            { name: 'sharpen' },
            { name: 'smooth' },
            { name: 'sobelEdgeDetect' },
            { name: 'sobelEdgeEnhance' },
            { name: 'truecolor' },
            { name: 'vignette' },
        ];
    }

    onUpload(data) {
        // do something with the upload
        this.imagepanel.setState({ image: data.filename });
    }

    handleFilterChange(filtername) {
        this.imagepanel.setState({ filter: filtername });
    }

    render() {
        return (
            <div className="layout full-height">
                <UploadForm onUpload={this.onUpload} />
                <SideBar items={this.menuitems} handleFilter={this.handleFilterChange} />
                <ImagePanel ref={(c) => { this.imagepanel = c; }} />
            </div>
        );
    }
}
