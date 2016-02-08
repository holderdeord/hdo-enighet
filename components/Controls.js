import React, {Component} from 'react';
import classnames from 'classnames';
import Select from 'react-select';


export default class SessionSelector extends Component {
    render() {
        return (
            <div className="controls">
                <div className="hidden-xs-down">
                    {this.renderToolbar()}
                </div>

                <div className="hidden-sm-up p-a-1">
                    <div className="p-b-1">{this.renderSessionSelect()}</div>
                    {this.renderCategorySelect()}
                </div>
            </div>
        )
    }

    renderToolbar() {
        const {
            sessions,
            selectedSession,
            selectedCategory,
            categories
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

                <hr />

                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        {this.renderCategorySelect()}
                    </div>
                </div>
            </div>
        );
    }

    renderSessionSelect() {
        const { sessions, selectedSession } = this.props;

        const options = this.props.sessions.map(session => ({
            value: session,
            label: session === 'all' ? 'Alle sesjoner' : session
        }));

        return (
            <Select
                clearable={false}
                searchable={false}
                value={selectedSession}
                onChange={this.props.onSessionChange}
                options={options}
            />
        );
    }

    renderCategorySelect() {
        const options = this.props.categories.map(c => ({
            value: c,
            label: c === 'all' ? 'Alle kategorier' : c
        }));

        return (
            <Select
                clearable={false}
                searchable={false}
                onChange={this.props.onCategoryChange}
                value={this.props.selectedCategory}
                options={options}
            />
        );
    }
}


