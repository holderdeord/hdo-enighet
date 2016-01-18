import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts/bundle/highcharts';
import { logoFor } from './utils';

export default class ComboCharts extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.bySession !== nextProps.bySession;
    }

    render() {
        return (
            <div className="hdo-card">
                <div className="row">

                    {this.props.combos.map(combo => this.renderComboChart(combo))}
                </div>
            </div>
        );
    }

    renderComboChart([left, right]) {
        const { sessions, bySession } = this.props;
        const key = [left, right].join(',');

        const data = sessions.map(session => {
            const sessionData = bySession[session];
            const val = left === right ? 100 : Math.round((sessionData.data[key] / sessionData.total) * 100);

            return [session, val];
        })
        .filter(([session, val]) => val > 0);

        const config = {
            chart: {
                type: 'spline',
                backgroundColor: 'transparent',
                animation: false,
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
            <div key={left+right} className={`col-md-6 text-md-center`} id={`${left}-v-${right}`}>
                <div className="m-a-2">
                    <h4>{left} og {right}</h4>
                    <ReactHighcharts config={config} isPureConfig />
                </div>
            </div>
        );
    }
}
