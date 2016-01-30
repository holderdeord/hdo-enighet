import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts/bundle/highcharts';
import { logoFor, partyNameFor } from './utils';
import groupBy from 'lodash.groupby';

export default class ComboCharts extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.bySession !== nextProps.bySession;
    }

    render() {
        return (
            <div className="hdo-card">
                <div className="hdo-card-header top-border text-xs-center">
                    <h3>Historikk</h3>
                </div>

                {this.props.combos.map(combo => this.renderCombo(combo))}
            </div>
        )
    }

    renderCombo([left, right]) {
        return (
            <div key={left+right} id={`${left}-v-${right}`}>
                <div className="row">
                    <div className="col-md-12 text-xs-center">
                        <h4>{logoFor(left)} v. {logoFor(right)}</h4>

                        <div>
                            {this.renderComboChart([left, right])}
                        </div>
                    </div>
                </div>
                <hr />
            </div>
        );
    }

    renderComboChart([left, right]) {
        const { sessions, bySession } = this.props;
        const key = [left, right].sort().join(',');

        const data = sessions.map(session => {
            const combo = bySession[session][key];

            if (combo) {
                const val = left === right ? 100 : Math.round((combo.count / combo.total) * 100);
                return [session, val];
            } else {
                return [session, null];
            }
        })
        .filter(([session, val]) => val > 0);

        const config = {
            chart: {
                type: 'spline',
                backgroundColor: 'transparent',
                animation: false,
                height: 380,
                style: {
                    fontFamily: 'Roboto Slab, Helvetica Neue, Helvetica, sans-serif',
                    width: '100%'
                }
            },

            title: {
                text: '',
                enabled: false,
            },

            legend: {
                enabled: false
            },

            xAxis: {
                type: 'category'
            },

            yAxis: {
                min: 0,
                max: 100,
                title: { enabled: false },
                labels: {
                    format: '{value}%'
                }
            },

            credits: {
                enabled: false
            },

            series: [
                {
                    name: 'Prosent enighet',
                    data,
                    color: '#566f7c',
                    width: 1
                }
            ]
        };

        return (
            <ReactHighcharts config={config} isPureConfig />
        );
    }
}
