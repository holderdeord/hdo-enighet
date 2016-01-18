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
            <table className="table">
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
        const { selectedSession, sessions, bySession } = this.props;

        if (left == right) {
            return <td key={key}/>;
        }

        // if (rowIndex > colIndex) {
        //     return <td key={key}/>;
        // }

        if (selectedSession === 'Alle') {
            const values = sessions.map(session => {
                const sessionData = bySession[session];
                return left === right ? 100 : Math.round((sessionData.data[key] / sessionData.total) * 100);
            });

            return <td key={key}><Sparkline width={50} height={20} data={values} /></td>;
        } else {
            let dataset = bySession[this.props.selectedSession];

            const { total, data } = dataset;
            const count = data[key];

            let val = Math.round((count / total) * 100);
            let backgroundColor = 'white';

            return (
                <Motion key={key} defaultStyle={{val: 0}} style={{val: spring(val)}}>
                    {value => <td
                        title={`${count} / ${total} voteringer`}
                        className="text-center"
                        style={{backgroundColor: scale(value.val)}}>
                            <a href={`#${[left,right].sort().join('-v-')}`}>{value.val === 0 ? '' : `${Math.round(value.val)}%`}</a>
                        </td>
                    }
                </Motion>
            );

        }
    }

}


