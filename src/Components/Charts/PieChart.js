import React from 'react'
import { Doughnut } from 'react-chartjs-2';
  
const PieChart = ( { missed, waiting, served}) => {
        
    const data = {
        labels: ['Waiting', 'Served', 'Missed'],
        datasets: [
        {
            label: 'Number of Customer',
            data: [waiting, served, missed],
            fill: false,
            backgroundColor: [
                'rgba(6, 172, 182, 0.5)',
                'rgba(238, 132, 38, 0.5)',
                'rgba(241, 81, 83, 0.5)',
                
            ],
            borderColor: [
                'rgba(6, 172, 182, 1)',
                'rgba(238, 132, 38, 1)',
                'rgba(241, 81, 83, 1)',
                
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

export default PieChart
