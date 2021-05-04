import React, { useState, useEffect, useContext } from "react";
import { CountryContext } from "../../Context/CountryContext";
import ReactMapGl, {
  Marker,
  Popup,
  NavigationControl,
  GeolocateControl,
  ScaleControl,
} from "react-map-gl";
import Data from "../../Data/countries.json";
import markr from "../Weather/images/markr.png";

export default function Map() {
  const [viewport, setViewport] = useState({
    latitude: 33.8333,
    longitude: 35.8333,
    width: "100vw",
    height: "55vh",
    zoom: 1,
  });
  const [, dispatch] = useContext(CountryContext);
  const [selectedMark, setSelectedMark] = useState(null);
  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Escape") {
        setSelectedMark(null);
      }
    };
    window.addEventListener("keydown", listener);
    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <div className="flex justify-center mx-8 w-1/3 h-full ">
      <ReactMapGl
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/maryamak/cknvrl4d31vqd17jgc5vkpmmu"
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
        className=" shadow-lg "
      >
        {Data.ref_country_codes.map((data, index) => (
          <Marker
            key={index}
            latitude={data.latitude}
            longitude={data.longitude}
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                setSelectedMark(data);
                const res = Data.ref_country_codes.filter(cntry => (cntry.latitude) === data.latitude && (cntry.longitude) === data.longitude)
                dispatch({type: 'SET_country', payload: res})
              }}
            >
              <img src={markr} alt="" className="w-4 " />
            </button>
          </Marker>
        ))}
        {selectedMark ? (
          <Popup
            latitude={selectedMark.latitude}
            longitude={selectedMark.longitude}
            onClose={() => setSelectedMark(null)}
          >
            <div className='p-2 '>
              <h2> {selectedMark.country}</h2>
            </div>
          </Popup>
        ) : null}
        <NavigationControl className="top-20 right-10" />
        <GeolocateControl
          className="top-10 right-10"
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          auto
        />
        <ScaleControl maxWidth={100} unit="metric" className="top-5 right-10" />
      </ReactMapGl>
    </div>
  );
}
