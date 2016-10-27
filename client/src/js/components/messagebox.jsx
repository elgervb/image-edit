import React from 'react';

export default class MessageBox extends React.Component {

    constructor() {
        super();
        this.handleClose = this.handleClose.bind(this);
        this.closed = false;
    }

    handleClose() {
        this.closed = true;
        this.forceUpdate();
    }

    render() {
        if (!this.closed) {
            return (
                <div className="msgbox pagebox error">
                    <button className="close" type="button" onClick={this.handleClose}>&times;</button>
                    <h4 className="title">{this.props.title}</h4>
                    <p>{this.props.message}</p>
                </div>
            );
        }

        return <div />;
    }
}

MessageBox.propTypes = {
    message: React.PropTypes.string,
    title: React.PropTypes.string,
    type: React.PropTypes.string,
};
