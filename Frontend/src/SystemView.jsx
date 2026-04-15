import "./SystemView.css";
import { Chart, Dialog, Button, InputText } from "primereact";
import "primeicons/primeicons.css";
import { useState } from "react";


function addSystem(hideElement, name, chartsArray, setCharts, lastId) {

  const data1 = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Water Quality",
        data: [54, 76, 63, 230, 178, 102],
        fill: false,
        tension: 0.4,
      },
      {
        label: "Temperature",
        data: [19, 21, 23, 23, 22, 18],
        fill: false,
        tension: 0.4,
      },
      {
        label: "pH",
        data: [6.7, 3.0, 12.0, 4.5, 5.1, 1.2],
        fill: false,
        tension: 0.4,
      },
      {
        label: "Water Level",
        data: [20, 15, 10, 5, 85, 74],
        fill: false,
        tension: 0.4,
      },
    ],
  };


  const options2 = {
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
        text: name,
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

  let newId = lastId+1;
  setCharts([...chartsArray, {id: newId, data: data1, options: options2 }]);
  hideElement();
}

function SystemView() {
  
  const [charts, setCharts] = useState([]);
  const [visible, setVisible] = useState(false);
  const [serialId, setSerialId] = useState("");

  return (
    <>
      <div id="container" className={visible ? "blurred" : ""}>
        <h1>YOUR SYSTEMS</h1>
        <div className="charts-container">
          {charts.length != 0 ? charts.map((chart) => (
            <div className="chartwrapper">
              <Chart
                key={chart.id}
                id={chart.id}
                type="line"
                data={chart.data}
                options={chart.options}
              />
            </div>
          )) :  null}
        </div>
        <div className="addchart-wrapper">
          <Button
            className="add-chart"
            label=""
            icon="pi pi-plus-circle"
            onClick={() => setVisible(true)}
          />
        </div>

        {/*always render backdrop and make it toggable by clicking*/}
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
                <InputText id="serial-id" label="Serial ID" onChange={(e) => setSerialId(e.target.value)}></InputText>
              </div>
              <div className="btn-wrapper">
                <Button
                  label="Add System"
                  onClick={(e) => addSystem(hide, serialId, charts, setCharts, charts.length > 0 ? charts.at(-1).id : 0)}
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
