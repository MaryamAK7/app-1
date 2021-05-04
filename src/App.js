import React,{useContext}  from 'react'
import NavBar from './Components/NavBar/NavBar'
import Footer from './Components/Footer/Footer'
import Header from './Components/Header/Header'
import Map from './Components/Map/Map'
import Weather from './Components/Weather/Weather'
import {CountryContext} from './Context/CountryContext'
import "./App.css";

function App() {
 const [state,]= useContext(CountryContext)
  return (
    <div className={state.time === 'day' ? "App" : "AppN"}>
      <NavBar />
      <Header />
      <div className='flex'>
      <Weather />
      <Map/>
      </div> 
      <Footer />
    </div>
  );
}

export default App;
