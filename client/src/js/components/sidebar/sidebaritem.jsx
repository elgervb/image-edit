import React from 'react';

export default class SideBarItem extends React.Component {
    render() {
        return (
            <a onClick={() => this.props.onclick(this.props.item.method)}>
                {this.props.item.name}
                <i className="item__info popover popover--bottom" title={this.props.item.description}>i</i>
                <div className="popover__hover">
                    <h3>{this.props.item.name}</h3>
                    <p>{this.props.item.description}</p>
                </div>
            </a>
        );
    }
}

SideBarItem.propTypes = {
    item: React.PropTypes.object,
    onclick: React.PropTypes.func,
};
