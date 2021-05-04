import React, { useContext } from "react";
import { CountryContext } from "../../Context/CountryContext";

export default function Current() {
  const [state] = useContext(CountryContext);
  return (
      <div className="border bg-gray-300 border-gray-100 mr-0  shadow-2xl mb-8 ">
        <div className="text-5xl p-4">{state.country[0].country} </div>
        <div className="flex flex-row m-auto">
          <div className="w-1/3 text-xl font-medium">
            <div className='border-2 w-1/2 m-auto px-4 py-2 bg-green-900 text-white mb-4'>{state.weather.current.weather[0].main}</div>
            <img
              src={`http://openweathermap.org/img/wn/${state.weather.current.weather[0].icon}@2x.png`}
              alt=""
              className="m-auto w-2/3 border border-white"
            />
          </div>
          <div className="flex flex-col w-2/3 m-4 font-medium text-left">
            <table className="table-fixed mx-14">
              <tr className="h-12 ">
                <td >Temperature:</td>
                <td>{state.weather.current.temp} C</td>
              </tr>
              <tr className="h-12 ">
                <td>Timezone:</td>
                <td>{state.weather.timezone}</td>
              </tr>
              <tr className="h-12 ">
                <td>Humidity:</td>
                <td>{state.weather.current.humidity}</td>
              </tr>
              <tr className="h-12 ">
                <td>Pressure:</td>
                <td>{state.weather.current.pressure}</td>
              </tr>
              <tr className="h-12">
                <td>Description:</td>
                <td>{state.weather.current.weather[0].description}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
  );
}
