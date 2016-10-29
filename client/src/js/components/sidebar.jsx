import React from 'react';

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
                            <a onClick={() => this.props.handleFilter(item.name)}>
                                {item.name}
                                <i className="item__info" title={item.description}>i</i>
                            </a>
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
