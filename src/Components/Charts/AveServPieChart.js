import React from 'react'
import { Doughnut } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { averageServiceTime } from '../../Actions/transaction';

const AveServPieChart = ( { missed, waiting, served}) => {
        
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(averageServiceTime());
    },[dispatch]);

    const { avgServTime } = useSelector((state) => state.dashboard);
   
    const allServed = Array.isArray(avgServTime) ? avgServTime.reduce((obj, item) => (obj[item._id] = item.ave, obj) ,{}) : 0;
    
    const serviceNames = Object.keys(allServed);
    const servedAve = Object.values(allServed);

    const data = {
        labels: serviceNames,
        datasets: [
        {
            label: 'Number of Customer',
            data: servedAve,
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
       
    };
    return (
        <div>
            <Doughnut
                data={data}
                options={options}
                height={300}
                width={600}
            />
        </div>
    )
}

export default AveServPieChart
