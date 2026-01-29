import "./SystemView.css";
import { Chart } from "primereact";

function SystemView() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Water Flow",
        data: [12, 19, 8, 15, 22, 18],
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const options = {
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

  return (
    <div id="container">
      <p>YOUR SYSTEM</p>
      <div className="chartwrapper">
        <Chart id="waterflowchart" type="line" data={data} options={options} />
      </div>
    </div>
  );
}

export default SystemView;
