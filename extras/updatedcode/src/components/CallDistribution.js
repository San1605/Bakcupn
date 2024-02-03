import React from 'react';
import ReactApexChart from 'react-apexcharts';
import '../assets/css/summary-card.css';

const CallDistribution = ({percentage_distribution, currentTime, audioTotalTime, isProgress}) => {

  const callseries_op = {
    series: percentage_distribution ? [percentage_distribution.Agent, percentage_distribution.Customer] : [0,0],
    options: {
      chart: {
        type: 'donut',
      },
      labels: ['Agent', 'Customer'],
      colors: ['#00829B', '#FCB406'],
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val.toFixed(2);
        }
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    },
  }


  return (
    <div className='summary-card'>
      <div className='header'>
        <h6>Call Distribution</h6>
      </div>
      <div className='c-body'>
        <div className='donut-chart'>
          {!isProgress && audioTotalTime <= currentTime ? <ReactApexChart options={callseries_op.options} series={callseries_op.series} type="donut" width="260"/> : "Call in progress..."}
        </div>
      </div>
    </div>
  )
}

export default CallDistribution