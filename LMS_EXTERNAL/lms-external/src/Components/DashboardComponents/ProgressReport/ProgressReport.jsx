import Chart from "react-apexcharts";
import React from "react";
import "./ProgressReport.css";

const ProgressReport = ({ role, progressReport }) => {
  const state = {
    series: [
      {
         data: Object.keys(progressReport)?.map((item) => progressReport[item]) || [],
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
        categories: ["LP Completion Rate", "Attendance", "Problem Solving", "Assessment Completion"] || [],
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
        height: role === "hrBuddy" && "40%",
        width: role === "hrBuddy" && "100%",
      }}
    >
      <div className="progressReportHeading">Progress Report</div>
      <div className="progressReportDiv">
        <div className="reportParamsList">
          <ul>
            <li>LP Completion Rate</li>
            <li>Attendance</li>
            <li>Problem Solving</li>
            <li>Assessment Completion</li>
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

export default ProgressReport;