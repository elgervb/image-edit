import React from 'react';

export default class ImagePanel extends React.Component {

    constructor() {
        super();

        this.state = {
            image: undefined,
        };
    }

    get host() {
        const cache = new Date().getTime();
        if (this.state.image) {
            if (this.state.filter) {
                return `http://localhost:4001/image/${this.state.filter}/${this.state.image}?${cache}`;
            }
            return `http://localhost:4001/image/${this.state.image}?${cache}`;
        }

        return `this.state.image?${cache}`;
    }

    render() {
        if (this.state.image) {
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
};
