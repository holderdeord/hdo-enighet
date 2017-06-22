import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import d3 from 'd3';
import Sparkline from './Sparkline';
import { logoFor } from './utils';
import cn from 'classnames';

export default class AgreementTable extends Component {
    state = {comboHighlight: {}};

    scale = d3.scale
        .linear()
        .domain([0, 50, 100])
        // .range(['#B41917', '#1E6419']);
        .range(['#dd0000', 'white', '#106E0E']);

    render() {
        const {
            parties,
            unit
        } = this.props;

        const {
            left: highlightLeft,
            right: highlightRight
        } = this.state.comboHighlight;

        return (
            <div className={"table-responsive"}>
                <table className={`table table-sm unit-${unit}`}>
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

        if (left == right) {
            return <td key={key} className="diagonal" />;
        }

        const {
            selectedTimeUnit,
            selectedCategory,
            timeUnits,
            byTimeUnit,
            allTime,
            unit
        } = this.props;

        const isRelative = unit === 'relative';
        const highlight = this.state.comboHighlight.left == left || this.state.comboHighlight.right === right;

        let combo;

        if (selectedTimeUnit === 'all') {
            combo = selectedCategory === 'all' ? allTime.all[key] : allTime.categories[selectedCategory] && allTime.categories[selectedCategory][key];
        } else {
            combo = selectedCategory === 'all' ? byTimeUnit[selectedTimeUnit].all[key] : byTimeUnit[selectedTimeUnit].categories[selectedCategory] && byTimeUnit[selectedTimeUnit].categories[selectedCategory][key];
        }

        let val = 0, count = 0, total = 0;

        if (combo) {
            val = Math.round((combo.count / combo.total) * 100);
            count = combo.count;
            total = combo.total;
        }

        const title = `${left} v. ${right}: ${count} / ${total} voteringsforslag`;
        const isEmpty = !combo || combo.total === 0;

        const style = {
            val: spring(val, [300, 50]),
            count: count,
            total: total
        };

        return (
            <Motion key={key} defaultStyle={{val, count, total}} style={style}>
                {value => {
                    let displayValue;

                    if (isEmpty) {
                        displayValue = '';
                    } else if (isRelative) {
                        displayValue = `${Math.round(value.val)}%`
                    } else {
                        displayValue = `${Math.round(value.count)} / ${Math.round(value.total)}`;
                    }

                    return (
                        <td
                            title={title}
                            onClick={this.setHash.bind(null, [left,right].sort().join('-v-'))}
                            onMouseOver={this.setComboHighlight.bind(this, left, right)}
                            onMouseOut={this.setComboHighlight.bind(this, null, null)}
                            className={cn('text-center', 'clickable', {highlight, diagonal: isEmpty})}
                            style={{backgroundColor: this.scale(value.val), color: (value.val > 80 || value.val < 20) ? '#eee' : 'inherit'}}>
                                {displayValue}
                        </td>

                    )
                }}
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


