import React from 'react';

export default class ImagePanel extends React.Component {
    
    constructor() {
        super();

        this.state = {
            image: undefined,
        };
    }

    render() {
        return (
            <div className="image-panel">
                <img src={`http://localhost:4001${this.state.image}`} />
            </div>
        );
    }
}
