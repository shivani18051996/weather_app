import { useEffect, useState } from "react";
import { BASE_API_URL } from "../utils";
import axios from "axios";

export const useWeatherData = (selectedCity) => {
    const [weatherData, setWeatherData] = useState({});
    const [coordinates, setCoordinates] = useState({ lat: 0, lon: 0 });
    useEffect(() => {
      const fetchWeatherData = async () => {
        try {
          const response = await axios.get(
            `${BASE_API_URL}${selectedCity}&appid=${process.env.REACT_APP_KEYAPI}&units=metric`
          );
          const { coord } = response.data;
          setWeatherData(response.data.main);
        setCoordinates({ lat: coord.lat, lon: coord.lon });
        } catch (error) {
          console.error("Error fetching weather data:", error.message);
        }
      };
  
      fetchWeatherData();
    }, [selectedCity]);
  
    return {weatherData,coordinates};
  };
  