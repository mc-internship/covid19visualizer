import {defaultOptions} from './ChartUtilsDonut';

import deepmerge from 'deepmerge';
import React from 'react';
import {Doughnut} from 'react-chartjs-2';

function AgeChart(props) {
    
    
if(!props.children || !props.adult || !props.oldage){
    return <div></div>;
    }

  let children = props.children;
  let adult = props.adult;
  let oldage = props.oldage;
  //let medianage = props.medianage


  const chartData = {
    datasets: [
      {
        data: [children, adult, oldage],
        backgroundColor: ['#ea6e9a','#6497f3', '#ccff99'],
        label: 'Age Demographics',
      },
    ],
    labels: ['Children', 'Adult', 'Old Age'],
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

export default AgeChart;
