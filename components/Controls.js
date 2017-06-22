import React, {Component} from 'react';
import classnames from 'classnames';
import Select from 'react-select';


export default class Controls extends Component {
    render() {
        return (
            <div className="controls">
                <div className="hidden-xs-down">
                    {this.renderToolbar()}
                </div>

                <div className="hidden-sm-up p-a-1">
                    <div className="p-b-1">{this.renderTimeUnitSelect()}</div>
                    {this.renderCategorySelect()}
                </div>
            </div>
        )
    }

    renderToolbar() {
        const {
            timeUnits,
            selectedTimeUnit,
            selectedCategory,
            categories,
            unit,
            onUnitChange
        } = this.props;

        return (
            <div className="hdo-card-header">
                <div className="btn-group btn-group-sm p-b-1" role="group">
                    {this.props.timeUnits.map(timeUnit => (
                        <button key={timeUnit}
                                type="button"
                                onClick={this.props.onTimeUnitChange.bind(null, timeUnit)}
                                className={classnames('btn', 'btn-secondary', {active: timeUnit === selectedTimeUnit})}>
                                    {timeUnit === 'all' ? 'Alle sesjoner' : timeUnit}
                            </button>
                    ))}
                </div>

                <div className="category-select">
                    {this.renderCategorySelect()}
                </div>
            </div>
        );
    }

    renderUnitSelector() {
        return (
            <div className="btn-group btn-toggle">
                <input
                    type="button"
                    value="Relativ"
                    onClick={onUnitChange.bind(null, 'relative')}
                    className={`btn btn-sm ${unit === 'relative' ? 'btn-primary' : 'btn-secondary'}`}
                />

                <input
                    type="button"
                    value="Absolutt"
                    onClick={onUnitChange.bind(null, 'absolute')}
                    className={`btn btn-sm ${unit === 'absolute' ? 'btn-primary' : 'btn-secondary'}`}
                />
            </div>
        );
    }

    renderTimeUnitSelect() {
        const { timeUnits, selectedTimeUnit } = this.props;

        const options = this.props.timeUnits.map(timeUnit => ({
            value: timeUnit,
            label: timeUnit === 'all' ? 'Alle sesjoner' : timeUnit
        }));

        return (
            <Select
                clearable={false}
                searchable={false}
                value={selectedTimeUnit}
                onChange={this.props.onTimeUnitChange}
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


