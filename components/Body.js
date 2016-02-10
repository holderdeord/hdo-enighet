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
]

export default class Body extends Component {
    state = {
        selectedSession: 'all',
        selectedCategory: 'all',
        unit: 'relative'
    };

    componentDidMount() {
        const url = 'agreement.json'

        fetch(url, {credentials: 'same-origin'})
            .then(res => res.json())
            .then(data => this.setState({data: this.parse(data)}))

        if (this.props.animate) {
            this.animateTimer = setInterval(() => {
                if (this.props.animate.includes('categories')) {
                    this.selectNextCategory();
                }

                if (this.props.animate.includes('sessions')) {
                    this.selectNextSession();
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
            data: { sessions, currentSession, lastUpdate, categories},
            data,
            selectedSession,
            selectedCategory,
            unit
        } = this.state;

        return (
            <div>
                <main>
                    <AgreementTable
                        unit={unit}
                        selectedSession={selectedSession}
                        selectedCategory={selectedCategory}
                        {...data}
                    />

                    <Controls
                        unit={unit}
                        categories={['all', ...categories]}
                        sessions={['all', ...sessions]}
                        selectedCategory={selectedCategory}
                        selectedSession={selectedSession}
                        onSessionChange={::this.handleSessionChange}
                        onCategoryChange={::this.handleCategoryChange}
                        onUnitChange={::this.handleUnitChange}
                     />
                </main>

                <ComboCharts
                    ref="charts"
                    {...data}
                    selectedCategory={selectedCategory}
                    unit={unit}
                />

                <Explanation currentSession={currentSession} lastUpdate={lastUpdate}/>
                <RelatedServices />
            </div>
        );
    }

    handleSessionChange(session) {
        this.setState({selectedSession: session});
    }

    handleCategoryChange(category) {
        this.setState({selectedCategory: category}, () => this.refs.charts.redraw());
    }

    handleUnitChange(unit) {
        this.setState({unit: unit}, () => this.refs.charts.redraw());
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

        const sessions = Object.keys(data.by_session).filter(s => Object.keys(data.by_session[s].all).length > 0)
        const sortedCombos = Object.keys(combos).map(k => combos[k]).sort((a,b) => a.join().localeCompare(b.join()));

        return {
            parties,
            combos: sortedCombos,
            sessions,
            categories: data.categories.sort((a, b) => a.localeCompare(b)),
            allTime: data.all_time,
            bySession: data.by_session,
            currentSession: data.current_session,
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

    selectNextSession() {
        if (!this.state.data) {
            return;
        }

        const {
            data: { sessions },
            selectedSession
        } = this.state;

        const currentIndex = sessions.indexOf(selectedSession) + 1;
        let nextSession = currentIndex >= sessions.length ? sessions[0] : sessions[currentIndex];

        this.setState({selectedSession: nextSession});
    }
}


