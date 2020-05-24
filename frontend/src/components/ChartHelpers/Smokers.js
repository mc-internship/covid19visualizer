import {defaultOptions} from './ChartUtils';

import deepmerge from 'deepmerge';
import React from 'react';
import {Doughnut} from 'react-chartjs-2';

function SmokersChart(props) {
  let malesmoker = props.malesmokers;
  let femalesmoker = props.femalesmokers;
  let nonsmoker = 100 - malesmoker - femalesmoker;

  const chartData = {
    datasets: [
      {
        data: [malesmoker, femalesmoker, nonsmoker],
        backgroundColor: ['#a3a3c2', '#668cff', '#99ebff'],
        label: 'Smoker Demographics',
      },
    ],
    labels: ['Male Smokers', 'Female Smokers', 'Non-Smokers'],
  };

  const chartOptions = deepmerge(defaultOptions, {
    tooltips: {
      mode: 'point',
      position: 'nearest',
      callbacks: {
        label: function (tooltipItem, data) {
          const dataset = data.datasets[tooltipItem.datasetIndex];
          const meta = dataset._meta[Object.keys(dataset._meta)[0]];
          const total = meta.total;
          const currentValue = dataset.data[tooltipItem.index];
          const percentage = parseFloat(
           ((currentValue / total) * 100).toFixed(1)
          );
          return + percentage + '%';
        },
        title: function (tooltipItem, data) {
          return data.labels[tooltipItem[0].index];
        },
      },
    },
  });

  return (
    <div className="charts-header">
      <div className="chart-title">{props.title}</div>
      <div className="chart-content doughnut">
        <Doughnut data={chartData} options={chartOptions} />
      </div> 
   </div>
  );
}

export default SmokersChart;
