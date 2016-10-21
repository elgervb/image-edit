import React from 'react';

export default class ImagePanel extends React.Component {

    constructor() {
        super();

        this.state = {
            image: undefined,
        };
    }

    get host() {
        if (this.state.image) {
            if (this.state.filter) {
                return `http://localhost:4001/image/${this.state.filter}/${this.state.image}`;
            }
            return `http://localhost:4001/image/${this.state.image}`;
        }

        return this.state.image;
    }

    render() {
        return (
            <div className="image-panel">
                <img src={this.host} />
            </div>
        );
    }
}

ImagePanel.propTypes = {
    image: React.PropTypes.string,
};
