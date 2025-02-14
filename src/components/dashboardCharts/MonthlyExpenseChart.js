import React from "react";
import Chart from "react-apexcharts";

const MonthlyExpenseChart = () => {
  const options = {
    chart: {
      type: "line",
      height: 350,
      background: "#ffffff", // Set background color to white
      toolbar: {
        show: false, // Disable zoom functionality
      },
      zoom: {
        enabled: false, // Disable zooming
      },
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    title: {
      text: "Monthly Expense (2025)",
      align: "center",
      style: {
        color: "#444",
      },
    },
    markers: {
      size: 5,
      colors: ["#ff4560"],
      strokeWidth: 2,
    },
  };

  const series = [
    {
      name: "Expense",
      data: [
        3200, 3000, 3100, 3500, 3700, 3800, 3900, 4000, 4200, 4400, 4500, 4700,
      ],
    },
  ];

  return (
    <div
      style={{
        backgroundColor: "#ffffff", // White background for the component
        padding: "5px",
        borderRadius: "5px", // Optional: Rounded corners for the component
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Optional: Shadow for better UI
      }}
    >
      <Chart options={options} series={series} type="line" height={340} />
    </div>
  );
};

export default MonthlyExpenseChart;
