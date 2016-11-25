import React from 'react';

export default class SideBarItem extends React.Component {

    constructor() {
        super();

        this.state = {
            values: [],
            showArguments: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleShowArgs = this.handleShowArgs.bind(this);
    }

    handleChange(event) {
        const valueState = this.state.values;
        valueState[event.target.dataset.filter][event.target.dataset.arg] = event.target.value;
        this.setState({ values: valueState });
    }

    handleShowArgs(event) {
        event.preventDefault();
        event.stopPropagation();
        this.setState({ showArguments: !this.state.showArguments });
    }

    inputFactory(type, args, filter) {
        const cssClass = `input input--${type}`;
        if (!this.state.values[filter]) {
            this.state.values[filter] = [];
        }

        if (type === 'number') {
            return <input
                className={cssClass}
                type={type}
                min={args.min}
                max={args.max}
                data-arg={args.name}
                data-filter={filter}
                defaultValue={args.value}
                onChange={this.handleChange} />;
        } else if (type === 'color') {
            return <input
                className={cssClass}
                type={type}
                data-arg={args.name}
                data-filter={filter}
                defaultValue={`#${args.value}`}
                onChange={this.handleChange} />;
        } else if (type === 'range') {
            return <div>
                <input
                    className={cssClass}
                    type={type}
                    min={args.min}
                    max={args.max}
                    step={args.step || 1}
                    data-arg={args.name}
                    data-filter={filter}
                    defaultValue={args.value}
                    onChange={this.handleChange} />
                <span className="value">{this.state.values[filter][args.name]}</span>
            </div>;
        } else if (type === 'select') {
            return <select
                className={cssClass}
                type={type}
                data-arg={args.name}
                data-filter={filter}
                defaultValue={args.value}
                onChange={this.handleChange}>
                {args.values.map(v =>
                    <option key={v} value={v} >{v}</option>
                )}
            </select>;
        }

        return null;
    }
    render() {
        return (
            <div>
                <a className="link" onClick={() => this.props.onclick(this.props.item.method, this.state.values[this.props.item.name])}>
                    {this.props.item.name}
                    {this.props.item.args &&
                        <a className="show-args" onClick={this.handleShowArgs} title="show arguments">&hellip;</a>
                    }
                    <i className="item__info popover popover--bottom" title={this.props.item.description}>i</i>
                    <div className="popover__hover">
                        <h3>{this.props.item.name}</h3>
                        <p>{this.props.item.description}</p>
                    </div>
                </a>

                {this.state.showArguments && this.props.item.args &&
                    <div className="arguments">
                        {this.props.item.args && this.props.item.args.map((arg, i) =>
                            <div key={i} className="field">
                                <label className="label" htmlFor={arg.name}>{arg.name}</label>
                                {this.inputFactory(arg.type, arg, this.props.item.name)}
                            </div>
                        )}
                    </div>
                }
            </div>
        );
    }
}

SideBarItem.propTypes = {
    item: React.PropTypes.object,
    onclick: React.PropTypes.func,
};
