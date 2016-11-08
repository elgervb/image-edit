import React from 'react';

export default class ImagePanel extends React.Component {

    get host() {
        const cache = new Date().getTime();
        if (this.props.image) {
            if (this.props.filter) {
                return `http://localhost:4001/image/${this.props.filter}/${this.props.image}?${cache}`;
            }
            return `http://localhost:4001/image/${this.props.image}?${cache}`;
        }

        return `this.props.image?${cache}`;
    }

    render() {
        if (this.props.image) {
            return (
                <div className="image-panel">
                    <img src={this.host} />
                </div>
            );
        }
        return null;
    }
}

ImagePanel.propTypes = {
    image: React.PropTypes.string,
    filter: React.PropTypes.string,
};
