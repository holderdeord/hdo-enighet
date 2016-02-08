import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts/bundle/highcharts';
import { logoFor, partyNameFor } from './utils';
import groupBy from 'lodash.groupby';

export default class ComboCharts extends Component {
    shouldComponentUpdate({bySession, selectedCategory, unit}, nextState) {
        return this.props.bySession !== bySession ||
            this.props.selectedCategory !== selectedCategory ||
            this.props.unit !== unit;
    }

    render() {
        return (
            <div className="row">
                {this.props.combos.map(combo => this.renderCombo(combo))}
            </div>
        )
    }

    renderCombo([left, right]) {
        return (
            <div key={left+right} id={`${left}-v-${right}`} className="col-md-6">
                <div className="hdo-card text-xs-center">
                    <div className="hdo-card-header">
                        <h4>{logoFor(left)} v. {logoFor(right)}</h4>
                        <h5>{this.props.selectedCategory === 'all' ? '' : <span>i saker om <strong>{this.props.selectedCategory}</strong></span>}</h5>
                    </div>

                    <div className="p-y-1">
                        {this.renderComboChart([left, right])}
                    </div>
                </div>
            </div>
        );
    }

    renderComboChart([left, right]) {
        const { sessions, bySession, selectedCategory } = this.props;
        const key = [left, right].sort().join(',');

        let percentData = [];
        let countData = [];
        let totalData = [];

        sessions.map(session => {
            const sessionData = bySession[session];
            const combo = selectedCategory === 'all' ? sessionData.all[key] : sessionData.categories[selectedCategory] && sessionData.categories[selectedCategory][key]

            if (combo && combo.total) {
                const val = Math.round((combo.count / combo.total) * 100);
                percentData.push([session, val]);
                countData.push([session, combo.count]);
                totalData.push([session, combo.total]);
            } else {
                return [session, null];
            }
        })

        percentData = percentData.filter(([session, val]) => val > 0);
        countData = countData.filter(([session, val]) => val > 0);
        totalData = totalData.filter(([session, val]) => val > 0);

        const series = [];
        const isRelative = this.props.unit === 'relative';

        if (isRelative) {
            series.push({
                name: 'Prosent enighet',
                data: percentData,
                color: '#606b82',
                lineWidth: 4,
                marker: {
                    radius: 6
                }
            });
        } else {
            series.push({
                name: 'Antall forslag enige',
                data: countData,
                color: '#606b82',
                lineWidth: 4
            });

            series.push({
                name: 'Antall forslag totalt',
                data: totalData,
                color: '#b8bfcc',
                lineWidth: 4
            });
        }

        const config = {
            chart: {
                type: isRelative ? 'spline' : 'areaspline',
                backgroundColor: 'transparent',
                animation: true,
                height: 280,
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
                type: 'category',
                lineColor: '#ddd',
                gridLineWidth: 0,
                minorGridLineWidth: 0,
                tickWidth: 0,
                labels: {
                    style: {
                        fontSize: '0.65rem',
                        fontWeight: '600'
                    }
                }
            },

            yAxis: {
                tickInterval: isRelative ? 25 : undefined,
                tickPosition: 'inside',
                gridLineWidth: 1,
                gridLineColor: 'rgba(221, 221, 221, 0.6)',
                min: isRelative ? 0 : undefined,
                max: isRelative ? 100 : undefined,
                title: { enabled: false },
                labels: {
                    format: isRelative ? '{value}%' : '{value}',
                    style: {
                        fontSize: '0.9rem',
                        fontWeight: 'normal',
                        color: '#999'
                    }

                }
            },

            credits: {
                enabled: false
            },

            tooltip: {
                pointFormat: `<strong>${left} v. ${right}</strong>: ${isRelative ? "{point.y}% enige" : "{series.name}: {point.y}"}`,
            },

            series
        };

        return (
            <ReactHighcharts config={config} isPureConfig />
        );
    }
}
