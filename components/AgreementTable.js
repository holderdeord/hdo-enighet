import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import d3 from 'd3';
import Sparkline from './Sparkline';
import { logoFor } from './utils';

const scale = d3.scale
    .linear()
    .domain([0, 1, 50, 100])
    // .range(['#B41917', '#1E6419']);
    .range(['white', '#de2d26', 'lightgray', '#31a354']);

export default class AgreementTable extends Component {

    render() {
        const {
            parties,
        } = this.props;

        return (
            <table className="table table-condensed">
                <thead>
                    <tr>
                        <th></th>
                        {parties.map(p => <th key={p}>{logoFor(p)}</th>)}
                    </tr>
                </thead>

                <tbody>
                    {parties.map((party, rowIndex) => (
                        <tr key={party}>
                            <th>{logoFor(party)}</th>
                            {
                                parties.map((otherParty, colIndex) =>
                                    this.renderComparison(party, otherParty, rowIndex, colIndex)
                                )
                            }
                        </tr>
                    ))}
                </tbody>
            </table>
          );
    }

    renderComparison(left, right, rowIndex, colIndex) {
        const key = [left,right].sort().join(',');
        const {
            selectedSession,
            sessions,
            bySession,
            allTime
        } = this.props;

        if (left == right) {
            return <td key={key} className="hdo-pattern diagonal" />;
        }

        let combo;

        if (this.props.selectedSession === 'all') {
            combo = allTime[key];
        } else {
            combo = bySession[this.props.selectedSession][key];
        }

        let val = 0;
        let title = '';

        if (combo) {
            val = Math.round((combo.count / combo.total) * 100);
            title = `${combo.count} / ${combo.total} voteringsforslag`;
        }

        return (
            <Motion key={key} defaultStyle={{val: 0}} style={{val: spring(val)}}>
                {value => <td
                    title={title}
                    className="text-center"
                    style={{backgroundColor: scale(value.val)}}>
                        <a href={`#${[left,right].sort().join('-v-')}`}>{value.val === 0 ? '' : `${Math.round(value.val)}%`}</a>
                    </td>
                }
            </Motion>
        );
    }
}


