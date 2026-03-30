import React, { useState, useEffect, useRef } from 'react'
import './weather.css'
import search_icon from '../assets/search_icon.png'
import clear_icon from '../assets/clear_icon.png'
import cloudy_icon from '../assets/cloudy_icon.png'
import cloud_icon from '../assets/cloud_icon.png'
import drizzle_icon from '../assets/drizzle_icon.png'
import rain_icon from '../assets/rain_icon.png'
import storm_icon from '../assets/storm_icon.png'
import snow_icon from '../assets/snow_icon.png'
import wind_icon from '../assets/wind_icon.png'
import humidity_icon from '../assets/humidity_icon.png'


const Weather = () => {

    const inputRef = useRef();
    const [weatherData, setWeatherData] = useState(false);

    const allIcons ={
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloudy_icon, 
        "02n": cloudy_icon,
        "03d": cloud_icon, 
        "03n": cloud_icon,
        "04d": cloud_icon,
        "04n": cloud_icon,
        "09d": drizzle_icon,
        "09n": drizzle_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "11d": storm_icon,
        "11n": storm_icon,
        "13d": snow_icon,
        "13n": snow_icon,
        "50d": drizzle_icon,
        "50n": drizzle_icon,
    }

    const getBackground = (condition) => {
        const backgrounds = {
            Clear: "linear-gradient(45deg, #ffe438d0, #025fff)",
            Clouds: "linear-gradient(45deg, #343a4c, #1ab1fc)",
            Rain: "linear-gradient(45deg, #373b44, #4286f4)",
            Drizzle: "linear-gradient(45deg, #89f7fe, #66a6ff)",
            Thunderstorm: "linear-gradient(45deg, #0f0c29, #302b63)",
            Snow: "linear-gradient(45deg, #e0eafc, #5994e7)",
            Mist: "linear-gradient(45deg, #606c88, #3f4c6b)",
            Haze: "linear-gradient(45deg, #8170b8, #f3ff1061)",
            Smoke: "linear-gradient(45deg, #606c88, #3f4c6b)",
            Fog: "linear-gradient(45deg, #606c88, #3f4c6b)",
        }
        return backgrounds[condition] || "linear-gradient(45deg, #4731c2eb, #c116d4d1)"
    }

    const search =async (city) => {
        try {
            const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`;

            const response = await fetch(url);
            const data = await response.json();
            console.log(data);

            const icon = allIcons[data.weather[0].icon] || clear_icon;
            setWeatherData({
                location: data.name,
                country: data.sys.country,
                temperature: Math.floor(data.main.temp),
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                icon: icon,
                condition: data.weather[0].main
            })

        } catch (error) {
            setWeatherData(false);
            console.error("Error fetching weather data:", error);
        }
        inputRef.current.value = ""
    }

        useEffect(() => {
            search("New York");
        },[])

  return (
    <div className='weather' 
      style={{
            backgroundImage: weatherData 
                ? getBackground(weatherData.condition)
                : "linear-gradient(45deg, #4731c2eb, #c116d4d1)"
        }}
    >
        <div className='title'>
            <h1>Weather App</h1>
        </div>
        <div className='search-bar'>
          <input 
          ref={inputRef}          
          type='text' 
          placeholder='Enter city name' 
          onKeyDown={(e) => {
             if (e.key === "Enter") search(inputRef.current.value)
            }}
        
          />
          <img src={search_icon} alt="Search" 
          onClick={()=>search(inputRef.current.value)}
          />
        </div>

        {weatherData ?<> 
          <img src={weatherData ? weatherData.icon : clear_icon} alt="Weather" className='weather-icon' />
        <p className='temperature'>{weatherData ? weatherData.temperature : '--'}°C</p>
        <h1 className='city'>{weatherData ? weatherData.location : 'New York'}</h1>
        <p className='country'>{weatherData ? weatherData.country: 'US'}</p>
        <div className="weather-data">
            <div className="col">
                <img src={humidity_icon} alt="Humidity" />
                <div>
                    <p>{weatherData ? weatherData.humidity : '--'} %</p>
                    <span>Humidity</span>
                </div>
                
            </div>
            <div className="col">
                <img src={wind_icon} alt="Wind" />
                <div>
                    <p>{weatherData ? weatherData.windSpeed : '--'} km/h</p>
                    <span>Wind Speed</span>
                </div>
                
            </div>
        </div>

        </> : <>City Not Found... 
        Try Again</>}

        
    </div>
  )
}

export default Weather