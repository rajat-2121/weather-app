import React, {useEffect, useState} from 'react';
import WeatherCard from './weatherCard';
import "./styles.css";

const Temp = () => {

  const [searchValue, setSearchValue] = useState("varanasi");
  const [tempInfo, setTempInfo] = useState({});

  const keyHandler = (e) => {
    if(e.key === 13) {
      getWeatherInfo();
    }
  };

  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=8b01ebad5319b599198387c09f82a61e&units=metric`;

      const res = await fetch(url);
      const data = await res.json();

      const {temp, humidity, pressure} = data.main;
      const {speed} = data.wind;
      const {main: weatherMood,icon} = data.weather[0];
      const {name} = data;
      const {country, sunset} = data.sys;

      const myWeatherInfo = {
        icon,
        temp,
        humidity,
        pressure,
        speed,
        weatherMood,
        name,
        country,
        sunset
      };

      setTempInfo(myWeatherInfo);

      console.log(temp, weatherMood, name, speed);
    } catch(error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeatherInfo();
  }, []);

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input 
            type="search" 
            placeholder="search..." 
            autoFocus 
            id="search" 
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button 
            className="searchButton" 
            type="button"
            onClick={getWeatherInfo}
            onKeyDown={(e) => keyHandler(e)}
          >
            Search
          </button>
        </div>
      </div>

      <WeatherCard tempInfo={tempInfo} />
    </>
  )
}

export default Temp;
