import React from 'react';

export default class Overlay extends React.Component {
    render() {
        return (
            <div className={this.props.show ? 'overlay overlay--slidein' : 'overlay overlay--slideout'} />
        );
    }
}

Overlay.propTypes = {
    show: React.PropTypes.bool,
};
