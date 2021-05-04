import React, { useEffect, useState, useContext } from "react";
import {CountryContext} from '../../Context/CountryContext';

export default function Header() {
  const [state, dispatch] = useContext(CountryContext)
  const [date, setDate] = useState(new Date());
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
useEffect(()=>{
  const dateRise = new Date(state.weather.current.sunrise*1000)
  const dateSet = new Date(state.weather.current.sunrise*1000)
  if(date.getHours() <= dateRise.getHours() && date.getHours() >= dateSet.getHours()  ){
    dispatch({type: 'SET_time', payload: 'night'})
  }
},[state.weather, dispatch,date])
  
  return (
    <div className="flex flex-col  font-bold justify-center content-center text-white  mb-4 m-auto">
      <h1 className="pt-10 pb-5 text-3xl ">
        {date &&<div>  {days[date.getDay()]} {date.getDate()} {months[date.getMonth()]} {date.getFullYear()}  </div>}
       
      </h1>
    </div>
  );
}
