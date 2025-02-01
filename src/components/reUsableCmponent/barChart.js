// BarChart.js
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  // Static data for the chart
  const barData = {
    labels: ["ABC Foods", "XYZ Supplies", "Gourmet Plus", "Fresh Bites", "Tasty Treats"],
    datasets: [
      {
        label: "Dishes",
        data: [50, 70, 40, 90, 60], // Constant values
        backgroundColor: "#E88B13",
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Dishes",
        },
      },
      x: {
        title: {
          display: true,
          text: "Vendor",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    borderColor: "#058A55",
  };

  return <Bar data={barData} options={options} />;
};

export default BarChart;
