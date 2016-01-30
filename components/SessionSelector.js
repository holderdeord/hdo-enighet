import React, {Component} from 'react';
import classnames from 'classnames';


export default class SessionSelector extends Component {
    render() {
        return (
            <div className="session-selector">
                <div className="hidden-xs-down">
                    {this.renderToolbar()}
                </div>

                <div className="hidden-sm-up">
                    {this.renderSelect()}
                </div>
            </div>
        )
    }

    renderToolbar() {
        const { sessions, selected, } = this.props;

        return (
            <div className="hdo-card-header">
                <div className="btn-group btn-group-sm" role="group">
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


