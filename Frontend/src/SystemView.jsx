import "./SystemView.css";
import { Chart } from "primereact";
import "primeicons/primeicons.css";
import { useState } from "react";

function SystemView() {
  const data1 = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Water Flow",
        data: [12, 19, 8, 15, 22, 18],
        fill: false,
        tension: 0.4,
      },
      {
        label: "Temperature",
        data: [19, 21, 23, 23, 22, 18],
        fill: false,
        tension: 0.4,
      }
    ],
  };

  const data2 = {
    labels: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    datasets: [
      {
        label: "Water Flow",
        data: [34, 1, 83, 23, 65, 67, 42, 11],
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const options1 = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#333",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#333",
        },
      },
      y: {
        ticks: {
          color: "#333",
        },
      },
    },
  };

  const [charts, setCharts] = useState([
    { id: 1, data: data1, options: options1 },
    { id: 2, data: data2, options: options1 },
  ]);

  return (
    <div id="container">
      <h1>YOUR SYSTEMS</h1>
      <div className="charts-container">
        {charts.map((chart) => (
          <div className="chartwrapper">
            <Chart
              key={chart.id}
              id={chart.id}
              type="line"
              data={chart.data}
              options={chart.options}
            />
          </div>
        ))}
        <div className="addchart-wrapper">
          <button className="add-chart" onClick={() => alert("bing")}>
            <i className="pi pi-plus-circle"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SystemView;
