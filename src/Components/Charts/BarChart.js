import React from 'react'
import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getServices } from '../../Actions/services';
import { countServedByAllService } from '../../Actions/transaction';
  
const BarChart = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(countServedByAllService());
    },[dispatch]);

    const { served } = useSelector((state) => state.dashboard);
   
    const allServed = Array.isArray(served) ? served.reduce((obj, item) => (obj[item._id] = item.count, obj) ,{}) : 0;
    
    const serviceNames = Object.keys(allServed);
    const servedCounts = Object.values(allServed);

    const data = {
        
        labels: serviceNames,
        datasets: [
        {
            label: 'Number of Customer',
            data: servedCounts,
            fill: false,
            backgroundColor: [
                'rgba(6, 172, 182, 0.5)',
                'rgba(246, 203, 24, 0.5)',
                'rgba(241, 81, 83, 0.5)',
                'rgba(238, 132, 38, 0.5)',
                'rgba(162, 213, 172, 0.5)',
                'rgba(79, 143, 191, 0.5)',
                'rgba(255, 227, 179, 0.5)',
                'rgba(83, 210, 219, 0.5)',
                'rgba(151, 78, 195, 0.5)',
                'rgba(243, 184, 180, 0.5)',
            ],
            borderColor: [
                'rgba(6, 172, 182, 1)',
                'rgba(246, 203, 24, 1)',
                'rgba(241, 81, 83, 1)',
                'rgba(238, 132, 38, 1)',
                'rgba(162, 213, 172, 1)',
                'rgba(79, 143, 191, 1)',
                'rgba(83, 210, 219, 1)',
                'rgba(255, 227, 179, 1)',
                'rgba(151, 78, 195, 1)',
                'rgba(243, 184, 180, 1)',
            ],
            borderWidth: 1,
        },
        ],
    };
  
    const options = {
        scales: {
        yAxes: [
            {
            ticks: {
                beginAtZero: true,
            },
            },
        ],
        },
    };
    return (
        <div>
            <Bar
                data={data}
                options={options}
                height={300}
                width={600}
            />
        </div>
    )
}

export default BarChart
