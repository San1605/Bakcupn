import Chart from "react-apexcharts";
import React from "react";
import "./TopColleges.css";

const TopColleges = ({ role, topColleges }) => {
  const state = {
    series: [
      {
        data: topColleges?.map((item, index) => item?.studentCount) || [],
      },

    ],
    options: {
      chart: {
        type: "bar",
        height: "100%",
      },
      plotOptions: {
        bar: {
          borderRadius: 0,
          horizontal: true,
          barHeight: "30%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: topColleges?.map((item, index) => item?.collegeName) || [],
        labels: {
          style: {
            fontSize: "10px",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            fontSize: "10px",
          },
        },
      },
      grid: {
        show: false,
        borderColor: '#90A4AE',
        strokeDashArray: 0,
        position: 'back',
        xaxis: {
          lines: {
            show: false
          },

        },
        yaxis: {
          lines: {
            show: false
          }
        },
        row: {
          colors: undefined,
          opacity: 0.5
        },
        column: {
          colors: undefined,
          opacity: 0.5
        },
        padding: {
          top: -10,
          right: 0,
          bottom: -10,
          left: 0
        },
      },
      colors: ["#4DB4AE", "#FFC300", "#33FF57", "#3377FF", "#E833FF"],
    },
  };

  return (
    <div
      className="ProgressReport"
      style={{
        height: (role === "hrBuddy" || role === "Admin") && "40%",
        width: role === "hrBuddy" && "100%",
      }}
    >
      <div className="progressReportHeading top-colleges-heading">Top Colleges</div>
      {/* <hr /> */}
      <div className="progressReportDiv">
        <div className="reportParamsList">
          <ul>
            {topColleges?.map((item, index) => (
              <li key={index}>{item?.collegeName}</li>
            ))}
          </ul>
        </div>
        <Chart
          options={state.options}
          series={state.series}
          type="bar"
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};

export default TopColleges;