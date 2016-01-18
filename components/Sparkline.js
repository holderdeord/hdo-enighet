import React, { Component } from 'react';
import d3 from 'd3';

export default class Sparkline extends Component {
    render() {
        const { width, data, height, interpolation } = this.props;

        const x = d3.scale.linear()
          .range([0, width])
          .domain(d3.extent(data, (d, i) => i))

        const y = d3.scale.linear()
          .range([height, 0])
          .domain(d3.extent(data, (d) => d))

        const line = d3.svg.line()
          .x((d, i) => x(i))
          .y((d) => y(d))
          .interpolate(interpolation)

          return (
            <svg className="sparkline" width={width} height={height}>
                <path d={line(data)} />
            </svg>
        )
    }
}
