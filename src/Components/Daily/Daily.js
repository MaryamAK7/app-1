import React, { useContext, useEffect, useState } from "react";
import { CountryContext } from "../../Context/CountryContext";
import { Bar } from "react-chartjs-2";

export default function Daily() {
  const [state] = useContext(CountryContext);
  const [bgco, setbgco] = useState({
    Temperature: "bg-red-600",
    Humidity: "bg-gray-400",
    Pressure: "bg-gray-400",
    Wind: "bg-gray-400",
    Weather: "bg-gray-400",
  });
  const [result, setResult] = useState([]);
  const [lab, setlab] = useState('Temperature C');
  useEffect(() => {
    if (lab === "Temperature C") {
      setResult(state.weather.daily.map((day) => day.temp.day));
    } else if (lab === "Humidity %") {
      setResult(state.weather.daily.map((day) => day.humidity));
    } else if (lab === "Pressure hPa") {
      setResult(state.weather.daily.map((day) => day.pressure));
    } else if (lab === "Wind Speed metre/sec") {
      setResult(state.weather.daily.map((day) => day.wind_speed));
    } else if (lab === "Weather") {
      setResult(state.weather.daily.map((day) => day.weather[0].main));
    }
  }, [lab,state.weather.daily]);
  const stat = {
    labels: ["today", "day1", "day2", "day3", "day4", "day5", "day6", "day7"],
    datasets: [
      {
        label: lab,
        backgroundColor: "rgb(6, 78, 59)",
        borderColor: "rgba(229, 231, 235)",
        borderWidth: 1,
        data: result,
      },
    ],
  };
  return (
    <div className="border bg-gray-300 border-gray-100 m-auto mr-0 rounded-3xl shadow-2xl mb-8 ">
      <div className="text-5xl p-4">{state.country[0].country} </div>
      <div className="flex flex-row container mx-auto">
        <div className="w-1/3 flex flex-col mb-4">
          <button
            className={`border border-gray-200 px-5 py-2 ${bgco.Temperature} text-white hover:bg-red-600 w-3/4 m-auto mb-1`}
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
            className={`border border-gray-200 px-5 py-2 ${bgco.Humidity} text-white hover:bg-red-600 w-3/4 m-auto mb-1`}
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
            className={`border border-gray-200 px-5 py-2 ${bgco.Pressure} text-white hover:bg-red-600 w-3/4 m-auto mb-1`}
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
            className={`border border-gray-200 px-5 py-2 ${bgco.Wind} text-white hover:bg-red-600 w-3/4 m-auto mb-1`}
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
            className={`border border-gray-200 px-5 py-2 ${bgco.Weather} text-white hover:bg-red-600 w-3/4 m-auto mb-1`}
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
        <div className="flex flex-col w-2/3 m-4 font-medium text-left">
          {lab === "Weather" ? (
            <table className="table-fixed w-2/3 m-auto">
              {state.weather.daily.map((day, index) => (
                <tr className="h-12 border-b-2">
                  <td className="ml-2">
                    {index === 0 ? "Today" : `Day ${index}`}:
                  </td>
                  <td className="flex">
                    <div>{day.weather[0].main}</div>
                  </td>
                  <td>
                    <img
                      src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                      alt=""
                      className="h-12"
                    />
                  </td>
                </tr>
              ))}
            </table>
          ) : (
            <Bar
              data={stat}
              options={{
                title: {
                  display: true,
                  text: "Average Rainfall per month",
                  fontSize: 20,
                },
                legend: {
                  display: true,
                  position: "right",
                },
              }}
            className='my-4'
            />
          )}
        </div>
      </div>
    </div>
  );
}
