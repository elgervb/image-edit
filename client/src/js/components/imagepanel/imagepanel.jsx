import React from 'react';

export default class ImagePanel extends React.Component {
    blobUrl() {
        if (this.props.blob) {
            return `${window.URL.createObjectURL(this.props.blob)}`;
        }
        return null;
    }

    render() {
        const url = this.blobUrl() || this.props.image;
        if (url) {
            return (
                <div className="image-panel">
                    <img src={url} />
                </div>
            );
        }
        return null;
    }
}

ImagePanel.propTypes = {
    image: React.PropTypes.string,
    blob: React.PropTypes.instanceOf(Blob),
};
