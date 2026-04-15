import "./SystemView.css";
import { Chart, Dialog, Button, InputText } from "primereact";
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
      },
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
      title: {
        display: true,
        text: "Dummy Chart",
        font: {
          size: 30,
        },
        padding: {
          bottom: 10,
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
  const [visible, setVisible] = useState(false);

  return (
    <>
      <div id="container" className={visible ? "blurred" : ""}>
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
        </div>
        <div className="addchart-wrapper">
          <Button
            className="add-chart"
            label=""
            icon="pi pi-plus-circle"
            onClick={() => setVisible(true)}
          />
        </div>

        {/*always render backdrop and make it toggable*/}
        <div
          className={`backdrop ${visible ? "active" : ""}`}
          onClick={() => setVisible(false)}
        />

        <Dialog
          visible={visible}
          modal
          dismissableMask
          onHide={() => {
            if (!visible) return;
            setVisible(false);
          }}
          content={({ hide }) => (
            <div className="dialog-wrapper">
              <div className="addchart-input">
                <label id="input-title">SERIAL ID:</label>
                <InputText id="serial-id" label="Serial ID"></InputText>
              </div>
              <div className="btn-wrapper">
                <Button
                  label="Add System"
                  onClick={(e) => hide(e)}
                  text
                  className="btn"
                ></Button>
                <Button
                  label="Cancel"
                  onClick={(e) => hide(e)}
                  text
                  className="btn"
                ></Button>
              </div>
            </div>
          )}
        ></Dialog>
      </div>
    </>
  );
}

export default SystemView;
