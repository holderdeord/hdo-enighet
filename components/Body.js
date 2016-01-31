import React, { Component } from 'react';

import SessionSelector from './SessionSelector';
import AgreementTable from './AgreementTable';
import ComboCharts from './ComboCharts';
import Explanation from './Explanation';
import fetch from 'isomorphic-fetch';
import Spinner from 'react-spinkit';
import OtherServices from './OtherServices';

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
        showExplanation: false
    };

    componentDidMount() {
        const url = 'agreement.json'

        fetch(url, {credentials: 'same-origin'})
            .then(res => res.json())
            .then(data => this.setState({data: this.parse(data)}))
    }

    render() {
        if (!this.state.data) {
            return (
                <div className="spinner">
                    <Spinner spinnerName="three-bounce" noFadeIn />
                </div>
            );
        }

        const {
            data: { sessions, currentSession, lastUpdate},
            data,
            selectedSession,
        } = this.state;

        return (
            <div>
                <main>
                    <AgreementTable
                        selectedSession={selectedSession}
                        {...data} />

                    <SessionSelector
                        sessions={['all', ...sessions]}
                        selected={selectedSession}
                        onChange={::this.handleSessionChange} />
                </main>

                <ComboCharts {...data} />
                <Explanation currentSession={currentSession} lastUpdate={lastUpdate}/>
                <OtherServices />
            </div>
        );
    }

    handleSessionChange(session) {
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
            bySession: data.by_session,
            currentSession: data.current_session,
            lastUpdate: data.last_update
        };
    }
}


