import React, {useState, useEffect} from 'react'

const WeatherCard = ({tempInfo}) => {
  const [weatherIcon, setWeatherIcon] = useState("");

  const {
    icon,
    temp,
    humidity,
    pressure,
    speed,
    weatherMood,
    name,
    country,
    sunset
  } = tempInfo;

  let date = new Date(sunset*1000);
  let timeStr = `${date.getHours()}:${date.getMinutes()}`;
  let code = icon;
  let url = "http://openweathermap.org/img/w/" + code + ".png";

  useEffect(() => {
    if(weatherMood) {
      if(weatherMood === "Clouds") {
        setWeatherIcon("wi-day-cloudy");
      } else if(weatherMood === "Haze") {
        setWeatherIcon("wi-fog");
      } else {
        setWeatherIcon("wi-day-sunny");
      }
    }
  }, [weatherMood]);

  return (
    <>
      <article className="widget">
        <div className="weatherIcon">
          <i className={`wi ${weatherIcon}`}></i>
        </div>
        <div className="weatherInfo">
          <div className="temperature">
            <span>{temp}&deg;C</span>
          </div>
          <div className="description">
            <div className="weatherCondition">{weatherMood}</div>
            <div className="place">{name}, {country}</div>
          </div>
        </div>
        <div className="date">{new Date().toLocaleString()}</div>
        {/* 4 column section */}
        <div className="extra-temp">
          <div className="temp-info-minmax">
            <div className="two-sided-section">
              <p>
                <i className={"wi wi-sunset"}></i>
              </p>
              <p className="extra-info-leftside">
                {timeStr} <br />
                Sunset
              </p>
            </div>

            <div className="two-sided-section">
              <p>
                <i className={"wi wi-humidity"}></i>
              </p>
              <p className="extra-info-leftside">
                {humidity}% <br />
                Humidity
              </p>
            </div>   
          </div>

          <div className="weather-extra-info">
          <div className="two-sided-section">
              <p>
                <i className={"wi wi-rain"}></i>
              </p>
              <p className="extra-info-leftside">
                {pressure} <br />
                Pressure
              </p>
            </div>

            <div className="two-sided-section">
              <p>
                <i className={"wi wi-strong-wind"}></i>
              </p>
              <p className="extra-info-leftside">
                {speed} <br />
                Speed
              </p>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}

export default WeatherCard
