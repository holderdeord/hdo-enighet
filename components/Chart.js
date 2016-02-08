import React, { Component, PropTypes } from 'react';
import Highcharts from 'highcharts';

export default class Chart extends Component {
     propTypes: {
          config: PropTypes.object.isRequired,
          isPureConfig: PropTypes.bool
     };

     renderChart(config = this.props.config) {
          if (!config) {
               throw new Error('Config must be specified for the Chart component');
          }
  
          let chartConfig = config.chart;

          if (this.chart && this.props.singleSeriesChange) {
               this.chart.series[0].setData(config.series[0].data, true);
          } else {
               this.chart = new Highcharts.Chart({
                   ...config,
                   chart: {
                     ...chartConfig,
                     renderTo: this.refs.chart
                   }
               });
          }
  
     }

     shouldComponentUpdate(nextProps) {
          return !this.props.isPureConfig || !(this.props.config === nextProps.config)
     }

     componentDidUpdate() {
          this.renderChart();
     }

     getChart() {
          if (!this.chart) {
            throw new Error('getChart() should not be called before the component is mounted');
          }

          return this.chart;
     }

     componentDidMount() {
          this.renderChart();
     }

     render() {
          return <div ref="chart" />;
     }
};
