import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts/bundle/highcharts';
import { logoFor } from './utils';
import groupBy from 'lodash.groupby';

export default class ComboCharts extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.bySession !== nextProps.bySession;
    }

    render() {
        const groups = groupBy(this.props.combos, ([left, right]) => left)
        const lefts = Object.keys(groups).sort((a,b) => a.localeCompare(b));

        return (
            <div className="hdo-card">
                {lefts.map(left => this.renderGroup(left, groups[left]))}
            </div>
        );
    }

    renderGroup(left, combos) {

        return (
            <div key={left}>
                <div className="row">
                    <div className="col-md-12">
                        <div className="m-a-1">
                            {logoFor(left)}
                        </div>

                        <div className="row">
                            {
                                combos
                                    .sort((a, b) => a[1].localeCompare(b[1]))
                                    .map(combo => this.renderComboChart(combo))
                            }
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
                height: 200,
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
                    width: 4
                }
            ]
        };

        return (
            <div key={left+right} className={`col-md-6 col-sm-12 text-md-center`} id={`${left}-v-${right}`}>
                <div className="m-a-1">
                    <h4>{logoFor(right)}</h4>
                    <ReactHighcharts config={config} isPureConfig />
                </div>
            </div>
        );
    }
}
