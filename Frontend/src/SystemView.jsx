import "./css/SystemView.css";
import { Chart } from "primereact/chart";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import { useState } from "react";

const options2 = {
  // hard coded options for chart view
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

const formatTimestamp = (timestamp) => {
  // format timestamp to fit backend structure
  const date = new Date(timestamp);
  const pad = (n) => String(n).padStart(2, "0"); // force string length to 2 for given string
  return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};

const translateData = (serialNum, data, refetch) => {
  // init data arrays
  const timestamps = [];
  const waterquality = [];
  const temperature = [];
  const waterLevel = [];
  const ph = [];

  if (refetch) {
    // toggle access dependant on if its a refetch (e.g. timespan) or an initial fetch
    data.forEach((datum) => {
      // add dataset to each value array
      timestamps.push(formatTimestamp(datum.timestamp));
      waterquality.push(datum.Wasserqualitaet);
      temperature.push(datum.Temperatur);
      waterLevel.push(datum.Wasserstand);
      ph.push(datum.PH);
    });
  } else {
    // add dataset to each value array
    data.sensorSet.daten.forEach((datum) => {
      timestamps.push(formatTimestamp(datum.timestamp));
      waterquality.push(datum.Wasserqualitaet);
      temperature.push(datum.Temperatur);
      waterLevel.push(datum.Wasserstand);
      ph.push(datum.PH);
    });
  }

  return {
    // return as right structure
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
  hideElement, // hide addChart-overlay function
  serialNumber,
  aquariumId,
  parsedData, // restructured data
  chartsArray, // all the charts
  setCharts,
  lastId, // keygen for react
) => {
  console.log(JSON.stringify(parsedData)); // debug
  const newChart = {
    id: lastId + 1,
    live: false,
    intervalId: null,
    aquariumId: aquariumId,
    serialNumber: serialNumber,
    dates: null,
    data: {
      labels: parsedData ? parsedData.timestamps : [], // set if theres data available
      datasets: [
        {
          label: "Wasserqualität",
          data: parsedData ? parsedData.sensorData.waterquality : [], // set if theres data available
          fill: false,
          tension: 0.4,
        },
        {
          label: "Temperatur",
          data: parsedData ? parsedData.sensorData.temperature : [], // set if theres data available
          fill: false,
          tension: 0.4,
        },
        {
          label: "pH-Wert",
          data: parsedData ? parsedData.sensorData.ph : [], // set if theres data available
          fill: false,
          tension: 0.4,
        },
        {
          label: "Wasserstand",
          data: parsedData ? parsedData.sensorData.waterLevel : [], // set if theres data available
          fill: false,
          tension: 0.4,
        },
      ],
    },
    options: options2,
  };
  setCharts([...chartsArray, newChart]); // update charts
  hideElement();
};

async function addAquarium(serialnum, hide, charts, setCharts) {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/aquarien/serialNumber/${serialnum}`, // REST endpoint
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
  const parsedData = translateData(serialnum, result, false); // reformat data
  addSystem(
    // add system with correct data
    hide,
    serialnum,
    result.id,
    parsedData,
    charts,
    setCharts,
    charts.length > 0 ? charts.at(-1).id : 0, // set key to 0 if its the first system added
  );
}

function SystemView() {
  const [charts, setCharts] = useState([]);
  const [visible, setVisible] = useState(false);
  const [serialId, setSerialId] = useState("");
  const [dates, setDates] = useState();

  const formatLocalDateTime = (date) => {
    // format date to match backend structure
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
    if (!newDates || !newDates[0] || !newDates[1]) return; // only go on if theres start AND end datetime

    const token = localStorage.getItem("token");

    const from = formatLocalDateTime(newDates[0]);
    const to = formatLocalDateTime(newDates[1]);

    // debug
    console.log(
      "URL:",
      `${import.meta.env.VITE_API_URL}/aquarien/${chart.aquariumId}/daten/timestamp?start=${from}&end=${to}`,
    );
    console.log("Token:", token);

    const response = await fetch(
      // REST endpoint
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
    const parsedData = translateData(chart.serialNumber, result, true); // format data correctly

    setCharts(
      (
        prev, // render all affected charts
      ) =>
        prev.map(
          (
            c, // iterate over all charts
          ) =>
            c.id !== chart.id
              ? c // not the target chart? return unchanged
              : {
                  // target chart?
                  ...c, // keep existing data (eg options)
                  data: {
                    // replace correct data
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

  const refetchChart = async (chart) => {
    // refetch manually
    const token = localStorage.getItem("token");

    // if dates are set, fetch with timespan
    if (chart.dates?.[0] && chart.dates?.[1]) {
      await fetchDataForTimespan(chart, chart.dates);
      return;
    }

    // otherwise fetch all data for the aquarium
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/aquarien/serialNumber/${chart.serialNumber}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      },
    );

    if (!response.ok) return;

    const result = await response.json();
    const parsedData = translateData(chart.serialNumber, result, false);

    setCharts((prev) =>
      prev.map(
        (
          c, // iterate over all charts
        ) =>
          c.id !== chart.id
            ? c // not the correct chart > unchanged
            : {
                ...c, // keep options etc
                data: {
                  // edit data form correct chart
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

  const toggleLiveRefetch = (chart, isChecked) => {
    setCharts((prev) =>
      prev.map((c) => {
        if (c.id !== chart.id) return c;

        // START interval
        if (isChecked) {
          if (c.intervalId) return c; // already running

          const id = setInterval(() => {
            setCharts((prev) => {
              const current = prev.find((x) => x.id === chart.id);
              if (current) refetchChart(current);
              return prev;
            });
          }, 10000);

          return { ...c, live: true, intervalId: id };
        }

        // STOP interval
        if (c.intervalId) {
          clearInterval(c.intervalId);
        }

        return { ...c, live: false, intervalId: null };
      }),
    );
  };

  return (
    <>
      <div id="container" className={visible ? "blurred" : ""}>
        <h1 className="loggedInHeadline">DEINE SYSTEME</h1>
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
                  <div className="calendar-inputs">
                    <div>
                      <h2 className="calendar-title">Von:</h2>
                      <Calendar
                        value={chart.dates?.[0] ?? null} // if date available
                        onChange={async (e) => {
                          const newDates = [e.value, chart.dates?.[1] ?? null];
                          setCharts((prev) =>
                            prev.map((c) =>
                              c.id === chart.id ? { ...c, dates: newDates } : c,
                            ),
                          );
                          await fetchDataForTimespan(chart, newDates); // refetch with new datetimes
                        }}
                        showTime
                        hourFormat="24"
                      />
                    </div>
                    <div>
                      <h2 className="calendar-title">Bis:</h2>
                      <Calendar
                        value={chart.dates?.[1] ?? null} // if date available
                        onChange={async (e) => {
                          const newDates = [chart.dates?.[0] ?? null, e.value];
                          setCharts((prev) =>
                            prev.map((c) =>
                              c.id === chart.id ? { ...c, dates: newDates } : c,
                            ),
                          );
                          await fetchDataForTimespan(chart, newDates); // refetch with new datetimes
                        }}
                        showTime
                        hourFormat="24"
                      />
                    </div>
                  </div>
                </div>
                <Button
                  icon="pi pi-times"
                  className="refresh-chart-data red"
                  tooltip="Zeitspanne zurücksetzen"
                  tooltipOptions={{
                    position: "top",
                    showDelay: 500,
                    hideDelay: 100,
                  }}
                  onClick={() => {
                    setCharts((prev) =>
                      prev.map((c) =>
                        c.id === chart.id ? { ...c, dates: null } : c,
                      ),
                    );
                    refetchChart({ ...chart, dates: null }); // refetch without timespan
                  }}
                ></Button>
                <div className="live-button">
                  <h2 className="calendar-title">LIVE:</h2>
                  <Checkbox
                    onChange={(e) => {
                      toggleLiveRefetch(chart, e.checked);
                    }}
                    checked={chart.live}
                  ></Checkbox>
                </div>
                <Button
                  icon="pi pi-refresh"
                  className="refresh-chart-data"
                  tooltip="Neueste Daten laden"
                  tooltipOptions={{
                    position: "top",
                    showDelay: 500,
                    hideDelay: 100,
                  }}
                  onClick={() => refetchChart(chart)} // manual refetch
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
