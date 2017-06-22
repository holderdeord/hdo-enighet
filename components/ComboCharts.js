import React, { Component } from 'react';
import { logoFor, partyNameFor } from './utils';
import groupBy from 'lodash.groupby';
import Chart from './Chart';

export default class ComboCharts extends Component {
    shouldComponentUpdate({byTimeUnit, selectedCategory, unit}, nextState) {
        return this.props.byTimeUnit !== byTimeUnit || selectedCategory !== this.props.selectedCategory;
    }

    render() {
        return (
            <div className="row">
                {this.props.combos.map(combo => this.renderCombo(combo))}
            </div>
        )
    }

    renderCombo(parties) {
        let header;

        if (parties.length === 2) {
            header = <span>{logoFor(parties[0])} v. {logoFor(parties[1])}</span>
        } else {
            header = parties.map(p => logoFor(p))
        }

        return (
            <div key={parties.join('-')} id={parties.join('-vs-')} className="col-md-6">
                <div className="hdo-card text-xs-center">
                    <div className="hdo-card-header">
                        <h4>{header}</h4>
                        <h5>{this.props.selectedCategory === 'all' ? '' : <span>i saker om <strong>{this.props.selectedCategory}</strong></span>}</h5>
                    </div>

                    <div className="p-y-1">
                        {this.renderComboChart(parties)}
                    </div>
                </div>
            </div>
        );
    }

    renderComboChart(parties) {
        const {
            timeUnits,
            byTimeUnit,
            selectedCategory,
            showCount
        } = this.props;

        const key = parties.sort().join(',');
        const series = [];
        const isRelative = this.props.unit === 'relative';

        let totalCount = 0;

        if (isRelative) {
            let percentData = [];

            timeUnits.map(timeUnit => {
                const timeUnitData = byTimeUnit[timeUnit];
                const combo = selectedCategory === 'all' ? timeUnitData.all[key] : timeUnitData.categories[selectedCategory] && timeUnitData.categories[selectedCategory][key]

                if (combo && combo.total) {
                    totalCount += combo.total;
                    percentData.push([timeUnit, Math.round((combo.count / combo.total) * 100)]);
                }
            })

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
            let countData = [];
            let totalData = [];

            timeUnits.map(timeUnit => {
                const timeUnitData = byTimeUnit[timeUnit];
                const combo = selectedCategory === 'all' ? timeUnitData.all[key] : timeUnitData.categories[selectedCategory] && timeUnitData.categories[selectedCategory][key]

                if (combo && combo.total) {
                    totalCount += combo.total;
                    countData.push([timeUnit, combo.count]);
                    totalData.push([timeUnit, combo.total]);
                }
            })

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

        const type = isRelative ? 'spline' : 'areaspline';

        const config = {
            chart: {
                type,
                backgroundColor: 'transparent',
                animation: true,
                height: 280,
                style: {
                    fontFamily: 'Roboto Slab, Helvetica Neue, Helvetica, sans-serif',
                    width: '100%'
                }
            },

            exporting: {
                enabled: !!this.props.exporting,

                chartOptions: {
                    chart: {
                        backgroundColor: 'white'
                    },

                    title: {
                        enabled: true,
                        text: parties.join(', ')
                    },

                    credits: {
                        enabled: true,
                        text: 'enighet.holderdeord.no',
                        href: 'https://enighet.holderdeord.no',
                        position: { align: 'right' }
                    },

                    plotOptions: {
                        series: {
                            dataLabels: {
                                enabled: true,
                                color: '#777'
                            }
                        }
                    }
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
                position: {
                    align: 'center',
                },
                enabled: showCount,
                text: `Basert på ${totalCount} voteringsforslag.`,
                href: null
            },

            tooltip: {
                pointFormat: `<strong>${parties.join(' v. ')}</strong>: ${isRelative ? '{point.y}% enige' : '{series.name}: {point.y}'}`,
            },

            series
        };

        return (
            <Chart config={config} isPureConfig singleSeriesChange={true} />
        );
    }
}
