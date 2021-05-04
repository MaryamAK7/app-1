import React, { useState, useContext } from "react";
import { CountryContext } from "../../Context/CountryContext";
import Data from "../../Data/countries.json";
import pic from "../Weather/images/sunny.png";

export default function NavBar() {
  const [search, setSearch] = useState();
  const [, dispatch] = useContext(CountryContext);
  const [title, setTitle] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(search);
    let res = Data.ref_country_codes.filter(
      (cntry) => cntry.country.toLowerCase() === search.toLowerCase()
    );

    if (res.length !== 0) {
      dispatch({ type: "SET_country", payload: res });
      setTitle("");
    } else {
      setTitle("invalid search");
    }
    setSearch("");
  };
  return (
    <div className="flex justify-between text-white text-xl font-medium box-content h-20 w-full  ">
      <div  className='flex'>
        <img src={pic} className="h-16 ml-4" alt=''/>
        <h1 className="p-5 pl-0 text-2xl font-medium"> The Weather</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="shadow-md m-4 px-4 py-1 text-green-900  "
          placeholder="Search for a country"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="bg-red-600 text-white mr-5 px-4 py-1">
          Search
        </button>
        {title}
      </form>
    </div>
  );
}
