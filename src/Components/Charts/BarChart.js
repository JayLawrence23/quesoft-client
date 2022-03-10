import React from 'react'
import { Bar } from 'react-chartjs-2';
  
const BarChart = () => {
        
    const data = {
        labels: ['Customer Service', 'Foreign Exchange', 'Withdrawal', 'Bills Payment'],
        datasets: [
        {
            label: 'Number of Customer',
            data: [12, 19, 3, 5 ],
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
