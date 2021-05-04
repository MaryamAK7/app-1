import React, { useEffect, useContext, useState } from "react";
import { CountryContext } from "../../Context/CountryContext";
import Current from "../Current/Current";
import Daily from "../Daily/Daily";
import Hourly from "../Hourly/Hourly";

export default function Weather() {
  const [state, dispatch] = useContext(CountryContext);
  const [bgco, setbgco] = useState({
    current: "bg-red-600",
    daily: "bg-green-900",
    hourly: "bg-green-900",
  });
  const [chosen, setChosen] = useState("current");

  useEffect(() => {
    const fetching = async () => {
      const response = await (
        await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${state.country[0].latitude}&lon=${state.country[0].longitude}&appid=61007986b4799741499362f9d6c0dca8&units=metric`
        )
      ).json();
      dispatch({ type: "SET_weather", payload: response });
    };
    fetching();
  }, [state.country, dispatch]);

  return (
    <div className="flex flex-row-reverse w-2/3 h-2/3 ">
      <div className="flex flex-col w-32 mr-4 mt-12 ">
        <button
          className={`border border-gray-200 px-5 py-2 ${bgco.current} text-white mb-2 hover:bg-red-600`}
          onClick={(e) => {
            e.preventDefault();
            setbgco({
              current: "bg-red-600 ",
              daily: "bg-blue-900",
              hourly: "bg-blue-900",
            });
            setChosen("current");
          }}
        >
          Current
        </button>
        <button
          className={`border border-gray-200 px-5 py-2 ${bgco.hourly} text-white mb-2 hover:bg-red-600`}
          onClick={(e) => {
            e.preventDefault();
            setbgco({
              current: "bg-green-900",
              daily: "bg-green-900",
              hourly: "bg-red-600 ",
            });
            setChosen("hourly");
          }}
        >
          Hourly
        </button>
        <button
          className={`border border-gray-200 px-5 py-2 ${bgco.daily} text-white mb-2 hover:bg-red-600`}
          onClick={(e) => {
            e.preventDefault();
            setbgco({
              current: "bg-green-900",
              daily: "bg-red-600 ",
              hourly: "bg-green-900",
            });
            setChosen("daily");
          }}
        >
          Daily
        </button>
      </div>
      <div className='w-full ml-8'>
      {chosen === "current" && <Current />}
      {chosen === "hourly" && <Hourly />}
      {chosen === "daily" && <Daily />}
      </div> 
    </div>
  );
}
