// "use client"
// import React, { useEffect, useRef } from "react";
// import Chart from "chart.js/auto";

import BarChart from "@/app/component/bar-chart";
import { faker } from '@faker-js/faker';
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
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

   const data2 = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
<div>
  <BarChart
  data={data2}
  />
</div>
  )
}



