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

const translateData = (serialNum, data) => {
  const timestamps = [];
  const waterquality = [];
  const temperature = [];
  const waterLevel = [];
  const ph = [];

  data.forEach((datum) => {
    timestamps.push(datum.timestamp);
    waterquality.push(datum.Wasserqualitaet);
    temperature.push(datum.Temperatur);
    waterLevel.push(datum.Wasserstand);
    ph.push(datum.PH);
  });

  return {
    serial: serialNum,
    timestamps: timestamps,
    sensorData: {
      waterquality: waterquality,
      temperature: temperature,
      waterLevel: waterLevel,
      ph: ph,
    },
  };
};

const addSystem = (
  hideElement,
  serialNumber,
  aquariumId,
  parsedData,
  chartsArray,
  setCharts,
  lastId,
) => {
  console.log(JSON.stringify(parsedData));
  const newChart = {
    id: lastId + 1,
    aquariumId: aquariumId,
    serialNumber: serialNumber,
    dates: null,
    data: {
      labels: parsedData ? parsedData.timestamps : [],
      datasets: [
        {
          label: "Wasserqualität",
          data: parsedData ? parsedData.sensorData.waterquality : [],
          fill: false,
          tension: 0.4,
        },
        {
          label: "Temperatur",
          data: parsedData ? parsedData.sensorData.temperature : [],
          fill: false,
          tension: 0.4,
        },
        {
          label: "pH-Wert",
          data: parsedData ? parsedData.sensorData.ph : [],
          fill: false,
          tension: 0.4,
        },
        {
          label: "Wasserstand",
          data: parsedData ? parsedData.sensorData.waterLevel : [],
          fill: false,
          tension: 0.4,
        },
      ],
    },
    options: options2,
  };
  setCharts([...chartsArray, newChart]);
  hideElement();
};

async function addAquarium(serialnum, hide, charts, setCharts) {
  const token = localStorage.getItem("token");
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

  if (!response.ok) {
    console.error("Aquarium not found");
    return;
  }

  const result = await response.json();
  console.log(result);
  const parsedData = translateData(serialnum, result);
  addSystem(
    hide,
    serialnum,
    result.id,
    parsedData,
    charts,
    setCharts,
    charts.length > 0 ? charts.at(-1).id : 0,
  );
}

function SystemView() {
  const [charts, setCharts] = useState([]);
  const [visible, setVisible] = useState(false);
  const [serialId, setSerialId] = useState("");
  const [dates, setDates] = useState();

  const formatLocalDateTime = (date) => {
    const d = new Date(
      date.toLocaleString("en-US", { timeZone: "Europe/Berlin" }),
    );

    const pad = (n) => String(n).padStart(2, "0");

    return (
      d.getFullYear() +
      "-" +
      pad(d.getMonth() + 1) +
      "-" +
      pad(d.getDate()) +
      "T" +
      pad(d.getHours()) +
      ":" +
      pad(d.getMinutes()) +
      ":" +
      pad(d.getSeconds())
    );
  };

  const fetchDataForTimespan = async (chart, newDates) => {
    if (!newDates || !newDates[0] || !newDates[1]) return;

    const token = localStorage.getItem("token");

    const from = formatLocalDateTime(newDates[0]);
    const to = formatLocalDateTime(newDates[1]);

    console.log(
      "URL:",
      `${import.meta.env.VITE_API_URL}/aquarien/${chart.aquariumId}/daten/timestamp?start=${from}&end=${to}`,
    );
    console.log("Token:", token);

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/aquarien/${chart.aquariumId}/daten/timestamp?start=${from}&end=${to}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      },
    );

    if (!response.ok) return;

    const result = await response.json();
    const parsedData = translateData(chart.serialNumber, result);

    setCharts((prev) =>
      prev.map((c) =>
        c.id !== chart.id
          ? c
          : {
              ...c,
              data: {
                labels: parsedData.timestamps,
                datasets: [
                  {
                    ...c.data.datasets[0],
                    data: parsedData.sensorData.waterquality,
                  },
                  {
                    ...c.data.datasets[1],
                    data: parsedData.sensorData.temperature,
                  },
                  { ...c.data.datasets[2], data: parsedData.sensorData.ph },
                  {
                    ...c.data.datasets[3],
                    data: parsedData.sensorData.waterLevel,
                  },
                ],
              },
            },
      ),
    );
  };

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
                    onChange={async (e) => {
                      const newDates = e.value;
                      setCharts((prev) =>
                        prev.map((c) =>
                          c.id === chart.id ? { ...c, dates: newDates } : c,
                        ),
                      );
                      await fetchDataForTimespan(chart, newDates);
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
                  onClick={() => alert("fetch new chart data")}
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
                  onClick={(e) =>
                    addAquarium(serialId, hide, charts, setCharts)
                  }
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
