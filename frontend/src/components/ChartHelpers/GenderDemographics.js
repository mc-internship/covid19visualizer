import {defaultOptions} from './ChartUtilsDonut';

import deepmerge from 'deepmerge';
import React from 'react';
import {Doughnut} from 'react-chartjs-2';

function GenderChart(props) {
  let male = props.male;
  let female = props.female;

  if(!props.male || !props.female){
    return <div></div>;
  }


  const chartData = {
    datasets: [
      {
        data: [male, female],
        backgroundColor: ['#ff884d', '#cc66ff'],
        label: 'Gender Demographics',
      },
    ],
    labels: ['Male', 'Female'],
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

export default GenderChart;
