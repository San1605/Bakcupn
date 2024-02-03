import React, { useState, useEffect } from 'react'
import Chart from "react-apexcharts";

const SetimentGraph = ({ currentTime, transcript, speaker_map }) => {
  const [customerAxis, setCustomerAxis] = useState([]);
  const [cSupportAxis, setCSupportAxis] = useState([]);
  const [chartTime, setChartTime] = useState([]);
  const currentTimeInt = Math.floor(currentTime);

  useEffect(() => {
    if (chartTime.length > 0 && chartTime[chartTime.length - 1] !== currentTimeInt - 1) {
      setCustomerAxis([[currentTimeInt, 0]]);
      setCSupportAxis([[currentTimeInt, 0]]);
      setChartTime([currentTimeInt]);
    } else {
      let customer_arr = [];
      let agent_arr = [];

      if (customerAxis.length > 8) {
        customerAxis.shift();
        cSupportAxis.shift();
      }

      const tIndex = transcript.findIndex(el => el[1][0] <= currentTime && el[1][1] >= currentTime);
      if (tIndex !== -1) {
        const elementData = transcript[tIndex];
        const elementSentiment = elementData[3];
        let setimentval = 0;
        if (elementSentiment === 0) {
          setimentval = -1;
        } else if (elementSentiment === 2) {
          setimentval = 1;
        } else {
          setimentval = 0;
        }
        const isCustomer = speaker_map.Customer === elementData[0] ? 1 : 0;
        customer_arr = [currentTimeInt, isCustomer ? setimentval : 0];
        agent_arr = [currentTimeInt, isCustomer ? 0 : setimentval];

      } else {
        customer_arr = [currentTimeInt, 0];
        agent_arr = [currentTimeInt, 0];
      }

      setCustomerAxis([...customerAxis, customer_arr]);
      setCSupportAxis([...cSupportAxis, agent_arr]);
      setChartTime([...chartTime, currentTimeInt]);

      if (chartTime.slice(-1) !== secondsToTime(currentTime)) {
        setCustomerAxis([...customerAxis, customer_arr]);
        setCSupportAxis([...cSupportAxis, agent_arr]);
        setChartTime([...chartTime, currentTimeInt]);
      }
    }
  }, [currentTimeInt, transcript])

  function secondsToTime(e) {
    var m = Math.floor(e % 3600 / 60).toString().padStart(2, '0'),
      s = Math.floor(e % 60).toString().padStart(2, '0');
    return m + ':' + s;
  }

  const linegraph = {
    options: {
      stroke: {
        curve: "smooth",
        width: 1,
      },
      chart: {
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        type: "string",
        labels: {
          formatter: function (val) {
            return secondsToTime(val);
          },
        },
      },
      yaxis: {
        min: -1,
        max: 1,
        labels: {
          formatter: function (val) {
            return val.toFixed(0);
          },
        },
      },
      colors: ["#6770FF", "#01C5A3"],
    },
    series: [
      {
        name: "Customer",
        data: customerAxis,
      },
      {
        name: "Agent",
        data: cSupportAxis,
      },
    ]
  };

  return (
    <div className='summary-card'>
      <div className='header'>
        <h6>Sentiment Graph</h6>
      </div>
      <div className='c-body setiment-graph-div'>
        <Chart
          options={linegraph.options}
          series={linegraph.series}
          type="line"
          width="100%"
          height="140"
        />
      </div>
    </div>
  )
}

export default SetimentGraph