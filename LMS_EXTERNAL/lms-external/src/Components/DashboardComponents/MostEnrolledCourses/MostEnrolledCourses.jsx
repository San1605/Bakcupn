import Chart from 'react-apexcharts';
import React from 'react';
import "./MostEnrolledCourses.css";

const MostEnrolledCourses = ({ mostEnrolledCourses }) => {
    const data = {
        options: {
            chart: {
                // background: '#FFF', 
            },
            colors: ['#4DB4AE', '#B9D1F4', '#F4E7B9', '#654E8A', '#E833FF'], // Set the colors for each series
            dataLabels: {
                style: {
                    fontSize: '9px',
                    fontWeight: "400"
                },
            },
        },
        series: mostEnrolledCourses?.map((item) => item?.enrollCount) || [],
        labels: mostEnrolledCourses?.map((item) => item?.domain) || []
    };

    const role = localStorage.getItem("role");

    return (
        <div className="mostEnrolled" style={{
            height: (role === "hrBuddy" || role === "Admin") && "40%",
            width: role === "hrBuddy" && "100%",
        }}>
            <div className='mostEnrolledHeading'>Most Enrolled Course</div>
            <div className='mostEnrolledDiv'>
                <ul>
                    {
                        mostEnrolledCourses?.map((item, index) => (
                            <li key={index}>{item?.domain}</li>
                        ))
                    }
                </ul>
                <div className="donut">
                    <Chart options={data.options} series={data.series} type="donut" className="donutchart" />
                </div>
            </div>
        </div>
    );
};

export default MostEnrolledCourses;