import React from 'react';

export default class ProgressBar extends React.Component {

    render() {
        return (
            <div>
                {this.props.progress > 0 &&
                    <div className="progress">
                        <div className="progress__fill" style={{ width: `${this.props.progress}%` }} />
                    </div>
                }
            </div>
        );
    }
}

ProgressBar.propTypes = {
    progress: React.PropTypes.number,
};
