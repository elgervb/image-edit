import React from 'react';

export default class Hello extends React.Component {
    constructor() {
        super();

        this.state = { greet: 'World' };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        const ar = ['world', 'universe'];
        this.setState({ greet: ar[Math.floor(Math.random() * ar.length)] });
    }
    
    render() {
        return (
            <h1> <button onClick={this.handleClick}> + </button> 
                Hello {this.state.greet}
            </h1>
        );
    }
}
