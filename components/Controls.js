import React, {Component} from 'react';
import classnames from 'classnames';


export default class SessionSelector extends Component {
    render() {
        return (
            <div className="controls">
                <div className="hidden-xs-down">
                    {this.renderToolbar()}
                </div>

                <div className="hidden-sm-up">
                    {this.renderSelect()}
                    {this.renderCategorySelect()}
                </div>
            </div>
        )
    }

    renderToolbar() {
        const {
            sessions,
            selectedSession,
            selectedCategory
        } = this.props;

        return (
            <div className="hdo-card-header">
                <div className="btn-group btn-group-sm" role="group">
                    {this.props.sessions.map(session => (
                        <button key={session}
                                type="button"
                                onClick={this.props.onSessionChange.bind(null, session)}
                                className={classnames('btn', 'btn-secondary', {active: session === selectedSession})}>
                                    {session === 'all' ? 'Alle sesjoner' : session}
                            </button>
                    ))}
                </div>

                <div className="btn-group btn-group-sm m-t-1" role="group">
                    {this.props.categories.slice(0, 23).map(category => (
                        <button key={category}
                                type="button"
                                onClick={this.props.onCategoryChange.bind(null, category)}
                                className={classnames('btn', 'btn-secondary', {active: category === selectedCategory})}>
                                    {category === 'all' ? 'Alle kategorier' : category}
                            </button>
                    ))}
                </div>
            </div>
        );
    }

    renderSelect() {
        const { sessions, selectedSession } = this.props;

        return (
            <div className="p-t-2 p-b-1">
                <select className="custom-select"
                        value={selectedSession}
                        onChange={(e) => this.props.onSessionChange(e.target.value)}>
                    {this.props.sessions.map(session => (
                        <option key={session} value={session}>
                            {session === 'all' ? 'Alle sesjoner' : session}
                        </option>
                    ))}
                </select>
            </div>
        )
    }

    renderCategorySelect() {
        return (
          <select className="custom-select input-sm"
                    onChange={e => this.props.onCategoryChange(e.target.value)}
                    value={this.props.selectedCategory}>
            {this.props.categories.map(c =>
              <option key={c} value={c}>{c == 'all' ? 'Alle kategorier' : c}</option>
            )}
          </select>
        );
    }
}


