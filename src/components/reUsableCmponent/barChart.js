// BarChart.js
import React, { useEffect } from "react";
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
import { useGetDashboardDetailQuery } from "../../api/dashboard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const { data, refetch } = useGetDashboardDetailQuery();
  useEffect(() => {
    refetch();
  }, []);
  const barData = {
    labels: data?.data?.zoneBasedParticipants?.map((data) => data?.label),
    datasets: [
      {
        label: "Participants",
        data: data?.data?.zoneBasedParticipants?.map((data) => data?.count),
        backgroundColor: "#058A55",
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
          text: "Participants",
        },
      },
      x: {
        title: {
          display: true,
          text: "Zone",
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Hides the legend
      },
    },
    borderColor: "#058A55",
  };

  return <Bar data={barData} options={options} />;
};

export default BarChart;
