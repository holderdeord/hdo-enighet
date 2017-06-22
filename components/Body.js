import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import Spinner from 'react-spinkit';

import Controls from './Controls';
import AgreementTable from './AgreementTable';
import ComboCharts from './ComboCharts';
import Explanation from './Explanation';
import RelatedServices from './RelatedServices';

const PARTY_ORDER = [
    'SV',
    'A',
    'Sp',
    'MDG',
    'KrF',
    'V',
    'H',
    'FrP'
];

const TIME_UNIT_NAMES = {
    session: 'Alle sesjoner',
    period: 'Alle perioder'
}

export default class Body extends Component {
    state = {
        selectedTimeUnit: 'all',
        selectedCategory: 'all',
        unit: 'relative'
    };

    componentDidMount() {
        const url = this.props.allCategories ? 'agreement-all-categories.json' : 'agreement.json';

        fetch(url, {credentials: 'same-origin'})
            .then(res => res.json())
            .then(data => this.setState({data: this.parse(data)}))

        if (this.props.animate) {
            this.animateTimer = setInterval(() => {
                if (this.props.animate.includes('categories')) {
                    this.selectNextCategory();
                }

                if (this.props.animate.includes('timeUnits')) {
                    this.selectNextTimeUnit();
                }
            }, 1000);
        }
    }

    componentWillUnmount() {
        if (this.animateTimer) {
            clearInterval(this.animateTimer);
            this.animateTimer = null;
        }
    }

    render() {
        if (!this.state.data) {
            return (
                <div className="spinner">
                    <Spinner spinnerName="three-bounce" />
                </div>
            );
        }

        const {
            data: { timeUnits, currentTimeUnit, lastUpdate, categories},
            data,
            selectedTimeUnit,
            selectedCategory,
            unit
        } = this.state;

        const { showCount } = this.props;

        return (
            <div>
                <main>
                    <AgreementTable
                        unit={unit}
                        selectedTimeUnit={selectedTimeUnit}
                        selectedCategory={selectedCategory}
                        showCount={showCount}
                        {...data}
                    />

                    <Controls
                        unit={unit}
                        allTimeUnitsName={TIME_UNIT_NAMES[this.props.timeUnit] || 'Alle ukjente'}
                        categories={['all', ...categories]}
                        timeUnits={['all', ...timeUnits]}
                        selectedCategory={selectedCategory}
                        selectedTimeUnit={selectedTimeUnit}
                        onTimeUnitChange={::this.handleTimeUnitChange}
                        onCategoryChange={::this.handleCategoryChange}
                        onUnitChange={::this.handleUnitChange}
                     />
                </main>

                <ComboCharts
                    selectedCategory={selectedCategory}
                    unit={unit}
                    showCount={showCount}
                    exporting={this.props.exporting}
                    {...data}
                />

                <Explanation
                    currentTimeUnit={currentTimeUnit}
                    lastUpdate={lastUpdate}
                />

                <RelatedServices />
            </div>
        );
    }

    handleTimeUnitChange(timeUnit) {
        this.setState({selectedTimeUnit: timeUnit});
    }

    handleCategoryChange(category) {
        this.setState({selectedCategory: category});
    }

    handleUnitChange(unit) {
        this.setState({unit: unit});
    }

    parse(data) {
        let parties = Object.keys(data.all_time.all)
            .map(e => e.split(','))
            .reduce((a, e) => [...a, ...e], [])

        parties = parties
            .filter((e, i) => parties.indexOf(e) === i)
            .sort((a, b) => PARTY_ORDER.indexOf(a) - PARTY_ORDER.indexOf(b))

        const combos = {};

        parties.forEach(left => {
            parties.forEach(right => {
                if (left !== right) {
                    const parties = [left, right].sort();
                    combos[parties.join()] = parties;
                }
            })
        });

        if (this.props.extraCombo) {
            const extraParties = this.props.extraCombo.split(',').filter(p => parties.includes(p)).sort();
            combos[extraParties.join()] = extraParties
        }

        const timeUnitMap = data[`by_${this.props.timeUnit}`];

        const timeUnits = Object.keys(timeUnitMap).filter(s => Object.keys(timeUnitMap[s].all).length > 0)
        const sortedCombos = Object.keys(combos).map(k => combos[k]).sort((a,b) => a.join().localeCompare(b.join()));

        return {
            parties,
            combos: sortedCombos,
            timeUnits,
            categories: data.categories.sort((a, b) => a.localeCompare(b)),
            allTime: data.all_time,
            byTimeUnit: timeUnitMap,
            currentTimeUnit: data[`current_${this.props.timeUnit}`],
            lastUpdate: data.last_update
        };
    }

    selectNextCategory() {
        if (!this.state.data) {
            return;
        }

        const {
            data: { categories },
            selectedCategory
        } = this.state;

        const currentIndex = categories.indexOf(selectedCategory) + 1;
        let nextCategory = currentIndex >= categories.length ? categories[0] : categories[currentIndex];

        this.setState({selectedCategory: nextCategory});
    }

    selectNextCategory() {
        if (!this.state.data) {
            return;
        }

        const {
            data: { categories },
            selectedCategory
        } = this.state;

        const currentIndex = categories.indexOf(selectedCategory) + 1;
        let nextCategory = currentIndex >= categories.length ? categories[0] : categories[currentIndex];

        this.setState({selectedCategory: nextCategory});
    }

    selectNextTimeUnit() {
        if (!this.state.data) {
            return;
        }

        const {
            data: { timeUnits },
            selectedTimeUnit
        } = this.state;

        const currentIndex = timeUnits.indexOf(selectedTimeUnit) + 1;
        let nextTimeUnit = currentIndex >= timeUnits.length ? timeUnits[0] : timeUnits[currentIndex];

        this.setState({selectedTimeUnit: nextTimeUnit});
    }
}


