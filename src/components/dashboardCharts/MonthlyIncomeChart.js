import React from "react";
import Chart from "react-apexcharts";

const MonthlyIncomeChart = () => {
  const options = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        dataLabels: {
          position: "top", // Show data labels at the top of the bars
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => `$${val}`,
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#304758"],
      },
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
      position: "bottom",
      labels: {
        style: {
          colors: "#9aa0ac",
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (val) => `$${val}`,
      },
    },
    title: {
      text: "Monthly Income (2025)",
      floating: false,
      align: "center",
      style: {
        color: "#444",
      },
    },
  };

  const series = [
    {
      name: "Income",
      data: [
        4500, 4800, 5000, 5500, 6000, 6500, 7000, 7200, 8000, 8500, 8800, 9000,
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
      <Chart options={options} series={series} type="bar" height={340} />
    </div>
  );
};

export default MonthlyIncomeChart;
