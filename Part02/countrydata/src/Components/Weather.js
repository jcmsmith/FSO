import { useState, useEffect } from "react";
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY;

const Weather = ({lat, lon}) => {

    let [weatherData, setWeatherData] = useState([])

    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`

    const getWeatherHook = () => {
        axios
          .get(url)
          .then(handleWeatherResponse)
    }

    const handleWeatherResponse = (response) => {
        console.log('weather response: ', response)
        let temp = Math.round(response.data.main.temp - 273.15)
        let iconURL = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
        console.log('icon', iconURL)
        let wind = response.data.wind.speed

        setWeatherData(weatherData.concat([temp, iconURL, wind]))
    }
    
    useEffect(getWeatherHook, [lat, lon])

    return(
        <div>
            <p>temperature: {weatherData[0]}C</p>
            <img src={weatherData[1]} />
            <p>wind speed: {weatherData[2]} m/s</p>
        </div>
    )
}

export default Weather;