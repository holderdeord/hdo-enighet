import React, {Component} from 'react';
import classnames from 'classnames';


export default class SessionSelector extends Component {
    render() {
        const { type } = this.props;

        return (
            <div className="session-selector">
                {type === 'select' ? this.renderSelect() : this.renderToolbar()}
            </div>
        )
    }

    renderToolbar() {
        const { sessions, selected, } = this.props;

        return (
            <div className="hdo-card-header top-border">
                <div className="btn-toolbar" role="toolbar" aria-label="Stortingssesjoner">
                    <div className="btn-group btn-group-sm" role="group" aria-label="First group">
                        {this.props.sessions.map(session => (
                            <button key={session}
                                    type="button"
                                    onClick={this.props.onChange.bind(null, session)}
                                    className={classnames('btn', 'btn-secondary', {active: session === selected})}>
                                        {session === 'all' ? 'Alle sesjoner' : session}
                                </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    renderSelect() {
        const { sessions, selected } = this.props;

        return (
            <div className="p-t-2 p-b-1">
                <select className="custom-select"
                        value={selected}
                        onChange={(e) => this.props.onChange(e.target.value)}>
                    {this.props.sessions.map(session => (
                        <option key={session} value={session}>
                            {session === 'all' ? 'Alle sesjoner' : session}
                        </option>
                    ))}
                </select>
            </div>
        )
    }
}


