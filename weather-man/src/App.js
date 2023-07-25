import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

const api = {
  key: "9b2e069ec37a6e020e7a6b62a2fbd392",
  base: "https:api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result)
        });
      setQuery('');
      console.log(weather);
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednsday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (

    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app')
      : 'app'}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°C
              </div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
            <div className="details">
              <span className='row'>Feels Like</span>
              <span className='feels'>{Math.round(weather.main.feels_like)}</span>
            </div>
            <div className="details">
              <span className='row'>Humidity</span>
              <span className='feels'>{(weather.main.humidity)}</span>
            </div>
            <div className="details">
              <span className='row'>Pressure</span>
              <span className='feels'>{Math.round(weather.main.pressure)}</span>
            </div>
            <div className="details">
              <span className='row'>Min</span>
              <span className='feels'>{Math.round(weather.main.temp_min)}</span>
            </div>
            <div className="details">
              <span className='row'>Max</span>
              <span className='feels'>{Math.round(weather.main.temp_max)}</span>
            </div>

          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
