// "use client"
// import React, { useEffect, useRef } from "react";
// import Chart from "chart.js/auto";

// export default function App() {
//     const canvasEl = useRef(null);
  
//     const colors = {
//       purple: {
//         default: "rgba(149, 76, 233, 1)",
//         half: "rgba(149, 76, 233, 0.5)",
//         quarter: "rgba(149, 76, 233, 0.25)",
//         zero: "rgba(149, 76, 233, 0)"
//       },
//       indigo: {
//         default: "rgba(80, 102, 120, 1)",
//         quarter: "rgba(80, 102, 120, 0.25)"
//       }
//     };
  
//     useEffect(() => {
//       const ctx = canvasEl.current.getContext("2d");
//       // const ctx = document.getElementById("myChart");
  
//       const gradient = ctx.createLinearGradient(0, 16, 0, 600);
//       gradient.addColorStop(0, colors.purple.half);
//       gradient.addColorStop(0.65, colors.purple.quarter);
//       gradient.addColorStop(1, colors.purple.zero);
  
//       const weight = [60.0, 60.2, 59.1, 61.4, 59.9, 60.2, 59.8, 58.6, 59.6, 59.2];
  
//       const labels = [
//         "Week 1",
//         "Week 2",
//         "Week 3",
//         "Week 4",
//         "Week 5",
//         "Week 6",
//         "Week 7",
//         "Week 8",
//         "Week 9",
//         "Week 10"
//       ];
//       const data = {
//         labels: labels,
//         datasets: [
//           {
//             backgroundColor: gradient,
//             label: "My First Dataset",
//             data: weight,
//             fill: true,
//             borderWidth: 2,
//             borderColor: colors.purple.default,
//             lineTension: 0.2,
//             pointBackgroundColor: colors.purple.default,
//             pointRadius: 3
//           }
//         ]
//       };
//       const config = {
//         type: "line",
//         data: data
//       };
//       const myLineChart = new Chart(ctx, config);
  
//       return function cleanup() {
//         myLineChart.destroy();
//       };
//     });
  
//     return (
//       <div className="App">
//         <span>Airbnb Property Analysis</span>
//         <canvas id="myChart" ref={canvasEl} height="100" />
//       </div>
//     );
//   }
  

export default function App() {
  
}



// 'use client'

// import React from 'react';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { Bar } from 'react-chartjs-2';
// import { faker } from '@faker-js/faker';
// import { useState, useEffect } from "react";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// export const options = {
//   plugins: {
//     title: {
//       display: true,
//       text: 'Chart.js Bar Chart - Stacked',
//     },
//   },
//   responsive: true,
//   interaction: {
//     mode: 'index' as const,
//     intersect: false,
//   },
//   scales: {
//     x: {
//       stacked: true,
//     },
//     y: {
//       stacked: true,
//     },
//   },
// };

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

// export const data = {
//   labels,
//   datasets: [
//     {
//       label: 'Dataset 1',
//       data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//       backgroundColor: 'rgb(255, 99, 132)',
//       stack: 'Stack 0',
//     },
//     {
//       label: 'Dataset 2',
//       data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//       backgroundColor: 'rgb(75, 192, 192)',
//       stack: 'Stack 0',
//     },
//     {
//       label: 'Dataset 3',
//       data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//       backgroundColor: 'rgb(53, 162, 235)',
//       stack: 'Stack 1',
//     },
//   ],
// };

// const BarChart = () => {
//   const [chartData, setChartData] = useState({
//     dataSets: [],
//   });

//   const [chartOptions, setChartOptions] = useState({});
//   return (
//     <div className="w-full md:col-span-2 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white">
//    <Bar options={options} data={data} />;

//     </div>
//   );
// };

// export default BarChart;
