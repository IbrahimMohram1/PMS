import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels"; // استدعاء plugin

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels); // سجل الـ plugin

export default function ChartsData({ TasksData }) {
  if (!TasksData) return null;
  const hasData =
    TasksData.inProgress > 0 || TasksData.done > 0 || TasksData.toDo > 0;

  if (!hasData) return <p>No tasks yet</p>;

  const data = {
    labels: ["To Do", "In Progress", "Done"],
    datasets: [
      {
        label: "Tasks",
        data: [
          TasksData?.toDo || 0,
          TasksData?.inProgress || 0,
          TasksData?.done || 0,
        ],
        backgroundColor: [
          "rgba(255, 206, 86, 0.5)", // InProgress
          "rgba(255, 99, 132, 0.5)", // ToDo

          "rgba(75, 192, 192, 0.5)", // Done
        ],
        borderColor: [
          "rgba(255, 206, 86, 1)",
          "rgba(255, 99, 132, 1)",

          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        font: {
          weight: "bold",
          size: 12,
        },
        formatter: (value) => (value === 0 ? "" : value),
      },
    },
  };
  return (
    <>
      <div className="w-full h-full flex items-center justify-center">
        <div className="h-full w-full">
          <Doughnut data={data} options={options} />
        </div>
      </div>
    </>
  );
}
