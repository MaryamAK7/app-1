import React, { createContext, useReducer } from "react";

export const CountryContext = createContext();

const initialState = {
  country:[ {
    country: "Lebanon",
    alpha2: "LB",
    alpha3: "LBN",
    numeric: 422,
    latitude: 33.8333,
    longitude: 35.8333,
  }],
  weather: {
  "lat": 33.44,
  "lon": -94.04,
  "timezone": "America/Chicago",
  "timezone_offset": -21600,
  "current": {
    "dt": 1618317040,
    "sunrise": 1618282134,
    "sunset": 1618333901,
    "temp": 284.07,
    "feels_like": 282.84,
    "pressure": 1019,
    "humidity": 62,
    "dew_point": 277.08,
    "uvi": 0.89,
    "clouds": 0,
    "visibility": 10000,
    "wind_speed": 6,
    "wind_deg": 300,
    "weather": [
      {
        "id": 500,
        "main": "Rain",
        "description": "light rain",
        "icon": "10d"
      }
    ],
    "rain": {
      "1h": 0.21
    }
  },
    "minutely": [
    {
      "dt": 1618317060,
      "precipitation": 0.205
    },]
  },
  time: 'day',
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_country":
      return { ...state, country: action.payload };
    case "SET_weather":
      return { ...state, weather: action.payload };
    case 'SET_time':
      return {...state, time: action.payload};
    default:
      return state;
  }
};

export const CountryProvider = (props) => {
  const [country, setCountry] = useReducer(reducer, initialState);

  return (
      <div> 
    <CountryContext.Provider value={[country, setCountry]}>
      {props.children}
    </CountryContext.Provider>
    </div>
  );
};
