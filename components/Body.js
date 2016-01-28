import React, { Component } from 'react';

import SessionSelector from './SessionSelector';
import AgreementTable from './AgreementTable';
import ComboCharts from './ComboCharts';
import fetch from 'isomorphic-fetch';
import Spinner from 'react-spinkit';

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
    constructor(props) {
        super(props);
        this.state = {
            selectedSession: '2015-2016'
        };
    }

    componentDidMount() {
        const url = 'agreement.json'

        fetch(url, {credentials: 'same-origin'})
            .then(res => res.json())
            .then(data => this.setState({data: this.parse(data)}, ::this.createTimer))
    }

    createTimer() {
        this.interval = setInterval(() => {
            let current = this.state.data.sessions.indexOf(this.state.selectedSession);

            if (current == this.state.data.sessions.length - 1) {
                current = -1;
            }

            this.setState({selectedSession: this.state.data.sessions[current + 1]});
        }, 3000);
    }

    stopTimer() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    componentWillUnmount() {
        stopTimer();
    }

    render() {
        if (!this.state.data) {
            return (
                <div className="spinner">
                    <Spinner spinnerName="three-bounce" noFadeIn />
                </div>
            );
        }

        return (
            <div>
                <main>
                    <SessionSelector
                        sessions={[...this.state.data.sessions]}
                        selected={this.state.selectedSession}
                        onChange={::this.handleSessionChange} />

                    <AgreementTable
                        selectedSession={this.state.selectedSession}
                        {...this.state.data} />
                </main>

                <ComboCharts {...this.state.data} />
            </div>
        );
    }

    handleSessionChange(session) {
        this.stopTimer();
        this.setState({selectedSession: session});
    }

    parse(data) {
        let parties = Object.keys(data.all_time)
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

        const sessions = Object.keys(data.by_session).filter(s => Object.keys(data.by_session[s]).length > 0)
        const sortedCombos = Object.keys(combos).map(k => combos[k]).sort((a,b) => a.join().localeCompare(b.join()));

        return {
            parties,
            combos: sortedCombos,
            sessions,
            allTime: data.all_time,
            bySession: data.by_session
        };
    }
}


