import React, { useContext, useEffect, useState } from "react";
import { CountryContext } from "../../Context/CountryContext";
import { Line } from "react-chartjs-2";

export default function Hourly() {
  const [state] = useContext(CountryContext);
  let l = [];
  const [bgco, setbgco] = useState({
    Temperature: "bg-red-600",
    Humidity: "bg-gray-400",
    Pressure: "bg-gray-400",
    Wind: "bg-gray-400",
    Weather: "bg-gray-400",
  });
  const [result, setResult] = useState([]);
  const [lab, setlab] = useState("Temperature C");
  useEffect(() => {
    if (lab === "Temperature C") {
      setResult(state.weather.hourly.map((hour) => hour.temp));
    } else if (lab === "Humidity %") {
      setResult(state.weather.hourly.map((hour) => hour.humidity));
    } else if (lab === "Pressure hPa") {
      setResult(state.weather.hourly.map((hour) => hour.pressure));
    } else if (lab === "Wind Speed metre/sec") {
      setResult(state.weather.hourly.map((hour) => hour.wind_speed));
    } else if (lab === "Weather") {
      setResult(state.weather.hourly.map((hour) => hour.weather[0].main));
    }
  }, [lab,state.weather.hourly]);
  for (let i = 0; i <= 48; i++) {
    l.push(i.toString());
  }
  const stat = {
    labels: l,
    datasets: [
      {
        label: lab,
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgb(6, 78, 59)",
        borderColor: "rgb(6, 78, 59)",
        borderWidth: 1,
        data: result,
      },
    ],
  };
  return (
    <div className="border bg-gray-300 border-gray-100 rounded-3xl shadow-2xl ">
      <div className="text-5xl p-4">{state.country[0].country} </div>
      <div className="flex flex-row ">
        <div className="flex flex-row  container mx-auto mb-8">
          <div className=" flex flex-col mx-8 ">
            <button
              className={`border border-gray-200 ${bgco.Temperature} text-white hover:bg-red-600 px-4 py-2 mb-4`}
              onClick={() => {
                setlab("Temperature C");
                setbgco({
                  Temperature: "bg-red-600",
                  Humidity: "bg-gray-400",
                  Pressure: "bg-gray-400",
                  Wind: "bg-gray-400",
                  Weather: "bg-gray-400",
                });
              }}
            >
              Temperature
            </button>
            <button
              className={`border border-gray-200 ${bgco.Humidity} text-white hover:bg-red-600 px-4 py-2 mb-4 `}
              onClick={() => {
                setlab("Humidity %");
                setbgco({
                  Temperature: "bg-gray-400",
                  Humidity: "bg-red-600",
                  Pressure: "bg-gray-400",
                  Wind: "bg-gray-400",
                  Weather: "bg-gray-400",
                });
              }}
            >
              Humidity
            </button>
            <button
              className={`border border-gray-200  ${bgco.Pressure} text-white hover:bg-red-600 px-4 py-2 mb-4`}
              onClick={() => {
                setlab("Pressure hPa");
                setbgco({
                  Temperature: "bg-gray-400",
                  Humidity: "bg-gray-400",
                  Pressure: "bg-red-600",
                  Wind: "bg-gray-400",
                  Weather: "bg-gray-400",
                });
              }}
            >
              Pressure
            </button>
            <button
              className={`border border-gray-200 ${bgco.Wind} text-white hover:bg-red-600 px-4 py-2 mb-4`}
              onClick={() => {
                setlab("Wind Speed metre/sec");
                setbgco({
                  Temperature: "bg-gray-400",
                  Humidity: "bg-gray-400",
                  Pressure: "bg-gray-400",
                  Wind: "bg-red-600",
                  Weather: "bg-gray-400",
                });
              }}
            >
              Wind Speed
            </button>
            <button
              className={`border border-gray-200 ${bgco.Weather} text-white hover:bg-red-600 px-4 py-2 mb-4`}
              onClick={() => {
                setlab("Weather");
                setbgco({
                  Temperature: "bg-gray-400",
                  Humidity: "bg-gray-400",
                  Pressure: "bg-gray-400",
                  Wind: "bg-gray-400",
                  Weather: "bg-red-600",
                });
              }}
            >
              Weather
            </button>
          </div>
          <div className="flex flex-col font-medium text-left w-2/3">
            {lab === "Weather" ? (
              <table className="table-fixed m-2">
                {state.weather.hourly.map((day, index) => (
                  <tr className="h-12 border-b-2">
                    <td className="ml-2">
                      {index === 0 ? "Now" : `Hour ${index}`}:
                    </td>
                    <td className="flex">
                      <div>{day.weather[0].main}</div>
                    </td>
                    <td>
                      <img
                        src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                        alt=""
                        className="h-8"
                      />
                    </td>
                  </tr>
                ))}
              </table>
            ) : (
              <Line
                data={stat}
                options={{
                  title: {
                    display: true,
                    text: "Hello",
                    fontSize: 24,
                  },
                  legend: {
                    display: true,
                    position: "right",
                  },
                }}
                className="mx-4"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
