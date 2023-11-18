import React, { useState, useEffect } from 'react';
import { LinearScale, Chart,CategoryScale,BarElement } from 'chart.js'; // Import the necessary scale and Chart
import { Bar } from 'react-chartjs-2';
import Navbar from '../Navbar';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import EmpNavbar from '../EmpNavbar/EmpNavbar';
import { dashBoard } from '../../../api/empApi';

Chart.register(LinearScale,CategoryScale,BarElement);


const EmpDash = () => {
  const { providerInfo } = useSelector((state) => state.employee);
 

const navigate=useNavigate()

useEffect(()=>{

    if(!providerInfo)
    {
        navigate('/emplogin')
    }

},[providerInfo,navigate])

const providerId = providerInfo.provider._id;

  const [empStats, setEmpStats] =useState({
    totalBookings: 0,
    totalEarnings: 0,
  });


  const [chartData, setChartData] = useState({
    labels: ['Total Bookings', 'Total Earnings'],
    datasets: [
      {
        label: 'Employee Data',
        data: [0, 0], 
        backgroundColor: ['#36A2EB', '#FFCE56'],
      },
    ],
  });

  useEffect(() => {
    dashBoard(providerId)
      .then((response) => response.json())
      .then((data) => {
        setEmpStats(data);

       
        setChartData({
          ...chartData,
          datasets: [
            {
              ...chartData.datasets[0],
              data: [data.totalBookings, data.totalEarnings],
            },
          ],
        });
      })
      .catch((error) =>
        console.error('Error fetching employee statistics: ', error)
      );
  }, []);

  return (
    <>
  <EmpNavbar/>
      <div className="bg-gray-300  ">
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-semibold mb-4 mt-14 text-center">Employee Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2 flex justify-center">
                Total Bookings
              </h2>
              <p className="flex justify-center text-xl font-semibold">
                {empStats.totalBookings}
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2 flex justify-center">
                Total Earnings
              </h2>
              <p className="flex justify-center text-xl font-semibold">
                ₹{empStats.totalEarnings}
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow mt-4  h-screen">
            <h2 className="text-xl font-semibold mb-2">Booking Chart</h2>
            <div className="flex justify-center items-center h-96 w-full">
              <Bar
                data={chartData}
                options={{
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmpDash;
