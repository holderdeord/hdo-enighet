import React, {Component} from 'react';
import classnames from 'classnames';


export default class SessionSelector extends Component {
    render() {
        const { type } = this.props;

        return (
            <div className="session-selector text-center">
                {type === 'select' ? this.renderSelect() : this.renderNav()}
            </div>
        )
    }

    renderNav() {
        const { sessions, selected, } = this.props;

        return (
            <nav className="nav nav-inline">
                {this.props.sessions.map(session => (
                    <a
                        key={session}
                        className={classnames("nav-link", {active: session === selected})}
                        href="#"
                        onClick={this.props.onChange.bind(null, session)}
                    >
                        {session}
                    </a>
                ))}
            </nav>            
        );
    }

    renderSelect() {
        const { sessions, selected } = this.props;

        return (
            <select value={selected} onChange={(e) => this.props.onChange(e.target.value)}>
                {this.props.sessions.map(session => (
                    <option
                        key={session}
                    >
                        {session}
                    </option>
                ))}
            </select>
        )
    }
}


