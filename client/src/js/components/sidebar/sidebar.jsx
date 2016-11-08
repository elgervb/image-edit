import React from 'react';
import SideBarItem from './sidebaritem.jsx';

export default class SideBar extends React.Component {

    render() {
        return (
            <div className="sidebar">
                <ul className="sidebar__menu">
                    <li className="sidebar__menu__item">
                        <a onClick={() => this.props.handleFilter('')}>original</a>
                    </li>
                    {this.props.items && this.props.items.map((item, i) =>
                        <li key={i} className="sidebar__menu__item">
                            <SideBarItem item={item} onclick={this.props.handleFilter} />
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}

SideBar.propTypes = {
    items: React.PropTypes.array,
    handleFilter: React.PropTypes.func,
};
