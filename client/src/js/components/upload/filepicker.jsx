import React from 'react';

export default class FilePicker extends React.Component {

    constructor() {
        super();

        this.state = {
            error: '',
        };
    }

    render() {
        return (
            <div className="pick-a-file">
                <label htmlFor={this.props.linkTo} className="uploadform__button">Pick an image</label>
            </div>
        );
    }
}

FilePicker.propTypes = {
    // link the label to a (hidden) file input, defined on the parent Component
    linkTo: React.PropTypes.string,
};
