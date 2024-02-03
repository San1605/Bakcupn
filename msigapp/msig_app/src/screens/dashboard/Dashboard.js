import React, { useEffect, useState } from 'react';
import styles from './dashboard.module.css'

import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

import { baseUrl } from '../../config';

function Dashboard() {

    const [chatTypeOptions, setChatTypeOptions] = useState([])
    const [chatTypeSeries, setChatTypeSeries] = useState([])
    const [tokenOptions, setTokenOptions] = useState([])
    const [tokenSeries, setTokenSeries] = useState([])
    const [barTypeOptions, setBarTypeOptions] = useState([])
    const [barTypeSeries, setBarTypeSeries] = useState([])
    const [lineTypeOptions, setLineTypeOptions] = useState([])
    const [lineTypeSeries, setLineTypeSeries] = useState([])

    useEffect(() => {
        let email = localStorage.getItem("user-email")
        let data = new FormData();
        data.append('user_email', email);

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${baseUrl}/chattype`,
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));

                let count = response.data.data.map(item => {
                    return item.count
                })

                setChatTypeSeries(count)
                let title = response.data.data.map(item => {
                    return item.title
                })
                setChatTypeOptions({
                    labels: title,
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
                })
                setBarTypeSeries([{
                    data: count
                }])
                setBarTypeOptions({
                    chart: {
                        height: 180,
                        type: 'bar',
                    },
                    plotOptions: {
                        bar: {
                            columnWidth: '45%',
                            distributed: true,
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    legend: {
                        show: false
                    },
                    xaxis: {
                        categories: title,
                        labels: {
                            style: {
                                fontSize: '12px'
                            }
                        }
                    }
                })
                setLineTypeSeries([{
                    name: "Chats",
                    data: count
                }])
                setLineTypeOptions({
                    chart: {
                        height: 330,
                        type: 'line',
                        zoom: {
                            enabled: false
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        curve: 'straight'
                    },
                    // title: {
                    //     text: 'Product Trends by Month',
                    //     align: 'left'
                    // },
                    grid: {
                        row: {
                            colors: ['#f3f3f3', 'transparent'],
                            opacity: 0.5
                        },
                    },
                    xaxis: {
                        categories: title,
                    }
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    useEffect(() => {
        let email = localStorage.getItem("user-email")
        let data = new FormData();
        data.append('user_email', email);

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${baseUrl}/tokengraph`,
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));

                let title = Object.keys(response.data.data)
                let count = Object.values(response.data.data)
                console.log(title)
                console.log(count)
                setTokenSeries(count)
                setTokenOptions({
                    labels: title,
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
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                Dashboard
            </div>
            <div className={styles.graphContainer}>
                <div className={styles.graphBox}>
                    <div className={styles.graphHeader}>
                        <span>Total Tokens v/s Used Tokens</span>
                    </div>
                    {tokenSeries.length ?
                        <ReactApexChart
                            options={tokenOptions}
                            series={tokenSeries}
                            type="pie"
                            width={330}
                        /> :
                        <></>
                    }
                </div>
                <div className={styles.graphBox}>
                    <div className={styles.graphHeader}>
                        <span>No of chats</span>
                    </div>
                    {barTypeSeries.length ?
                        <ReactApexChart
                            options={barTypeOptions}
                            series={barTypeSeries}
                            type="bar"
                            height={180}
                        /> :
                        <></>
                    }
                </div>
                <div className={styles.graphBox}>
                    <div className={styles.graphHeader}>
                        <span>Types of conversations</span>
                    </div>
                    {chatTypeSeries.length ?
                        <ReactApexChart
                            options={chatTypeOptions}
                            series={chatTypeSeries}
                            type="pie"
                            width={330}
                        /> :
                        <></>
                    }
                </div>
                <div className={styles.graphBox}>
                    <div className={styles.graphHeader}>
                        <span>Chat Type Projection</span>
                    </div>
                    {lineTypeSeries.length ?
                        <ReactApexChart
                            options={lineTypeOptions}
                            series={lineTypeSeries}
                            type="line"
                            height={200}
                        /> :
                        <></>
                    }
                </div>
            </div>
        </div>
    );
}

export default Dashboard;