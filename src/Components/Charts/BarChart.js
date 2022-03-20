import React from 'react'
import { Bar } from 'react-chartjs-2';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getServices } from '../../Actions/services';
import { countServedByAllService } from '../../Actions/transaction';
  
const BarChart = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getServices());
        dispatch(countServedByAllService());
    },[dispatch]);

    const { services } = useSelector((state) => state.services);
    const { served } = useSelector((state) => state.dashboard);

    const serviceName = []; 

    services.map((service) => serviceName.push(service.servName));
        
    // console.log(served);

    const data = {
        labels: served.service,
        datasets: [
        {
            label: 'Number of Customer',
            data: served.served,
            fill: false,
            backgroundColor: [
                'rgba(6, 172, 182, 0.5)',
               
                'rgba(246, 203, 24, 0.5)',
                'rgba(241, 81, 83, 0.5)',
                'rgba(238, 132, 38, 0.5)',
                'rgba(241, 81, 83, 0.5)',
                'rgba(241, 81, 83, 0.5)',
            ],
            borderColor: [
                'rgba(6, 172, 182, 1)',
               
                'rgba(246, 203, 24, 1)',
                'rgba(241, 81, 83, 1)',
                'rgba(238, 132, 38, 1)',
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
