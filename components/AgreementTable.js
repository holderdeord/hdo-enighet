import React, { Component } from 'react';
import { Motion, spring, presets } from 'react-motion';
import d3 from 'd3';
import Sparkline from './Sparkline';
import { logoFor } from './utils';
import cn from 'classnames';

console.log(presets.stiff);

const scale = d3.scale
    .linear()
    .domain([0, 1, 50, 100])
    // .range(['#B41917', '#1E6419']);
    .range(['white', '#dd0000', 'white', '#106E0E']);

export default class AgreementTable extends Component {
    constructor(props) {
        super(props);
        this.state = {comboHighlight: {}}
    }

    render() {
        const {
            parties,
        } = this.props;

        const {
            left: highlightLeft,
            right: highlightRight
        } = this.state.comboHighlight;

        return (
            <div className="table-responsive">
                <table className="table table-sm">
                    <thead>
                        <tr>
                            <th className="diagonal" />
                            {parties.map(p => <th key={p} className={cn({highlight: p === highlightRight})} >{logoFor(p)}</th>)}
                        </tr>
                    </thead>

                    <tbody>
                        {parties.map((party, rowIndex) => (
                            <tr key={party}>
                                <th className={cn({highlight: party === highlightLeft})}>{logoFor(party)}</th>
                                {
                                    parties.map((otherParty, colIndex) =>
                                        this.renderComparison(party, otherParty, rowIndex, colIndex)
                                    )
                                }
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          );
    }

    renderComparison(left, right, rowIndex, colIndex) {
        const key = [left,right].sort().join(',');
        const highlight = this.state.comboHighlight.left == left || this.state.comboHighlight.right === right;

        const {
            selectedSession,
            sessions,
            bySession,
            allTime
        } = this.props;

        if (left == right) {
            return <td key={key} className="diagonal" />;
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
            title = `${left} v. ${right}: ${combo.count} / ${combo.total} voteringsforslag`;
        }

        return (
            <Motion key={key} defaultStyle={{val: 0}} style={{val: spring(val, [300, 50])}}>
                {value => (
                    <td
                        title={title}
                        onClick={this.setHash.bind(null, [left,right].sort().join('-v-'))}
                        onMouseOver={this.setComboHighlight.bind(this, left, right)}
                        onMouseOut={this.setComboHighlight.bind(this, null, null)}
                        className={cn('text-center', 'clickable', {highlight, diagonal: value.val === 0})}
                        style={{backgroundColor: scale(value.val), color: (value.val > 80 || value.val < 20) ? '#eee' : 'inherit'}}>
                            {value.val === 0 ? '' : `${Math.round(value.val)}%`}
                    </td>
                )}
            </Motion>
        );
    }

    setHash(hash) {
        window.location.hash = hash;
    }

    setComboHighlight(left, right) {
        this.setState({comboHighlight: {left, right}})
    }
}


