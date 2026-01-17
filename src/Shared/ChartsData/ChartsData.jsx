import React, { useContext } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels"; // استدعاء plugin
import { AuthContext } from "../../Context/AuthContext";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels); // سجل الـ plugin

export default function ChartsData({ TasksData }) {
  const { darkMode } = useContext(AuthContext);

  if (!TasksData) return null;
  const hasData =
    TasksData.inProgress > 0 || TasksData.done > 0 || TasksData.toDo > 0;

  if (!hasData)
    return (
      <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
        No tasks yet
      </p>
    );

  const textColor = darkMode ? "#d1d5db" : "#1f2937";
  const gridColor = darkMode ? "#374151" : "#e5e7eb";

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
        color: textColor,
        formatter: (value) => (value === 0 ? "" : value),
      },
      legend: {
        labels: {
          color: darkMode ? "#fff" : "#000",
          font: {
            size: 12,
          },
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: darkMode
          ? "rgba(31, 41, 55, 0.95)"
          : "rgba(0, 0, 0, 0.8)",
        borderColor: darkMode ? "#4b5563" : "#ccc",
        borderWidth: 1,
      },
    },
  };
  return (
    <>
      <div
        className={`w-full h-full flex items-center justify-center transition-colors duration-300 rounded-md`}
      >
        <div className="h-full w-full">
          <Doughnut data={data} options={options} />
        </div>
      </div>
    </>
  );
}
