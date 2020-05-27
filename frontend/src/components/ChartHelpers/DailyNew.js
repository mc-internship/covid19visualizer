import {
    defaultOptions,
    xAxisDefaults,
    yAxisDefaults,
    formatNumber,
  } from './ChartUtils';
  
  import {format, parse} from 'date-fns';
  import deepmerge from 'deepmerge';
  import React from 'react';
  import {Bar, defaults} from 'react-chartjs-2';
  
  function DailyNewChart(props) {
    const dates = [];
    const confirmed = [];
  
    if (!props.timeseries || props.timeseries.length === 0) {
      return <div></div>;
    }
  
    props.timeseries.forEach((data, index) => {
      if (index >= 31) {
        const date = parse(data.date, 'y-M-d', new Date(2020, 0, 1));
        dates.push(format(date, 'dd MMM'));
        confirmed.push(data.dailyconfirmed);
      }
    });
  
    const barDataSet = {
      labels: dates,
      datasets: [
        {
          data: confirmed,
          label: 'Confirmed',
          backgroundColor: '#ff6862',
        },
      ],
    };
  
    const options = deepmerge(defaultOptions, {
      tooltips: {
        mode: 'index',
      },
      legend: {
        display: true,
        reverse: true,
        labels: {
          usePointStyle: false, // Required to change pointstyle to 'rectRounded' from 'circle'
          generateLabels: (chart) => {
            const labels = defaults.global.legend.labels.generateLabels(chart);
            labels.forEach((label) => {
              //label.pointStyle = 'rectRounded';
            });
            return labels;
          },
        },
      },
      scales: {
        xAxes: [
          deepmerge(xAxisDefaults, {
            stacked: true,
          }),
        ],
        yAxes: [
          deepmerge(yAxisDefaults, {
            stacked: true,
            ticks: {
              callback: (value) => formatNumber(value),
            },
          }),
        ],
      },
    });
  
    return (
      <div className="charts-header">
        <div className="chart-title">{props.title}</div>
        <div className="chart-content">
          <Bar data={barDataSet} options={options} />
        </div>
      </div>
    );
  }
  
  export default DailyNewChart;
  
