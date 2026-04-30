import "./css/SystemView.css";
import { Chart } from "primereact/chart";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import { useState } from "react";

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

const addSystem = (
  hideElement,
  serialNumber,
  aquariumData,
  chartsArray,
  setCharts,
  lastId,
) => {
  const newChart = {
    id: lastId + 1,
    serialNumber: serialNumber,
    dates: null,
    data: {
      labels: [],
      datasets: [
        { label: "Wasserqualität", data: [], fill: false, tension: 0.4 },
        { label: "Temperatur", data: [], fill: false, tension: 0.4 },
        { label: "pH-Wert", data: [], fill: false, tension: 0.4 },
        { label: "Wasserstand", data: [], fill: false, tension: 0.4 },
      ],
    },
    options: options2,
  };
  setCharts([...chartsArray, newChart]);
  hideElement();
};

async function addAquarium(serialnum) {
  console.log("START FETCH AQUARIUM BY SERIAL NUM");
  const token = localStorage.getItem("token");
  console.log("Token:", token);
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/aquarien/serialNumber/${serialnum}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    },
  );

  const result = await response.text();
  console.log("RESULT:");
  console.log(result);

  /*addSystem(
    hide,
    serialId,
    charts,
    setCharts,
    charts.length > 0 ? charts.at(-1).id : 0,
  );
  */

  return { success: response.ok, message: result };
}

const fetchChartData = async (chart) => {
  if (!chart.dates || !chart.dates[0] || !chart.dates[1]) {
    console.warn("No date range selected");
    return;
  }
  const token = localStorage.getItem("token");
  const from = chart.dates[0].toISOString();
  const to = chart.dates[1].toISOString();

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/measurements/${chart.serialNumber}?from=${from}&to=${to}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  const measurements = await response.json();

  setCharts((prev) =>
    prev.map((c) => {
      if (c.id !== chart.id) return c;
      return { // find chart
        ...c,
        data: {
          labels: measurements.map((measurement) => measurement.timestamp), 
          datasets: c.data.datasets.map((dataset) => ({
            ...dataset,
            data: measurements
              .filter(
                (measurement) =>
                  measurement.sensorType ===
                  dataset.label.toUpperCase().replace(" ", "_"), // ! dependent on what backend named it
              )
              .map((measurement) => measurement.value), // sets data dependent on sensor
          })),
        },
      };
    }),
  );
};

function SystemView() {
  const [charts, setCharts] = useState([]);
  const [visible, setVisible] = useState(false);
  const [serialId, setSerialId] = useState("");
  const [dates, setDates] = useState();

  return (
    <>
      <div id="container" className={visible ? "blurred" : ""}>
        <h1>DEINE SYSTEME</h1>
        {charts.length == 0 && (
          <h2 className="nosystems-warning">Noch keine Systeme hinzugefügt</h2>
        )}
        <div className="charts-container">
          {charts.map((chart) => (
            <div className="chart-group" key={chart.id}>
              <div className="chartwrapper">
                <Chart
                  id={chart.id}
                  type="line"
                  data={chart.data}
                  options={chart.options}
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
              <div className="chart-extras">
                <div className="calendar-wrapper">
                  <h2 className="calendar-title">Zeitspanne:</h2>
                  <Calendar
                    value={chart.dates}
                    onChange={(e) => {
                      setCharts((prev) =>
                        prev.map((calendar) => // search for corresponding chart for calendar
                          calendar.id === chart.id
                            ? { ...calendar, dates: e.value }
                            : calendar,
                        ),
                      );
                    }}
                    selectionMode="range"
                    readOnlyInput
                    hideOnRangeSelection
                    showTime
                    hourFormat="24"
                  />
                </div>
                <Button
                  icon="pi pi-refresh"
                  className="refresh-chart-data"
                  tooltip="fetch newest data for this device"
                  tooltipOptions={{
                    position: "top",
                    showDelay: 500,
                    hideDelay: 100,
                  }}
                  onClick={() => fetchChartData(chart)}
                ></Button>
              </div>
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
                <label id="input-title">SERIENNUMMER:</label>
                <InputText
                  id="serial-id"
                  className="default-input"
                  label="Serial ID"
                  onChange={(e) => setSerialId(e.target.value)}
                ></InputText>
              </div>
              <div className="btn-wrapper">
                <Button
                  label="Hinzufügen"
                  onClick={(e) => {
                    const result = addSystem(
                      hide,
                      serialId,
                      null,
                      charts,
                      setCharts,
                      charts.length > 0 ? charts.at(-1).id : 0,
                    );
                  }}
                  text
                  className="btn"
                ></Button>
                <Button
                  label="Test Add"
                  onClick={(e) => addAquarium(serialId)}
                  text
                  className="btn"
                ></Button>
                <Button
                  label="Abbrechen"
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
