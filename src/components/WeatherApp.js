import React, { useState, useEffect } from "react";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useWeatherData } from "../hooks/useWeatherData";
import { useGraphData } from "../hooks/useGraphData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  indexAxis: "x",
  elements: {
    bar: {
      borderWidth: 1,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        font: {
          size: 14,
        },
      },
    },
    title: {
      display: true,
      text: "",
      font: {
        size: 18,
        weight: "bold",
      },
    },
  },
};

const cities = ["Bangalore", "Chennai", "Delhi", "Mumbai", "Kolkata"];

const WeatherApp = () => {
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [, setCityCoordinates] = useState({ lat: 0, lon: 0 });
  const {weatherData,coordinates} = useWeatherData(selectedCity);
  const { graphData, showGraph, fetchGraphData } = useGraphData(cities);


  const handleShowGraph = async () => {
    setCityCoordinates(coordinates);
    fetchGraphData();
  };

  useEffect(() => {
    setCityCoordinates(coordinates);
  }, [coordinates]);

  return (
    <div className="container mx-auto mt-8 p-4">
      <div className="bg-gradient-to-r from-blue-300 to-blue-500 text-white rounded-lg shadow-lg p-6">
        <h1 className="text-4xl font-extrabold mb-6">Weather App</h1>
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2 text-gray-200">
            Select City:
          </label>
          <div className="relative">
            <select
              className="p-3 border rounded w-full bg-gray-100 text-gray-800 appearance-none"
              onChange={(e) => setSelectedCity(e.target.value)}
              value={selectedCity}
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg
                className="h-6 w-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-6">
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <h2 className="text-xl font-semibold mb-4 text-blue-500">
                {`${selectedCity}`}
              </h2>
              <div className="">
                <div>
                  <p className="text-gray-700 text-lg">
                    Current Temperature:{" "}
                    <span className="text-blue-500">
                      {weatherData.temp}°C
                    </span>
                  </p>
                  <p className="text-gray-700 text-lg ">
                    Maximum Temperature:{" "}
                    <span className="text-red-500">
                      {weatherData.temp_max}°C
                    </span>
                  </p>
                  <p className="text-gray-700 text-lg">
                    Minimum Temperature:{" "}
                    <span className="text-green-500">
                      {weatherData.temp_min}°C
                    </span>
                  </p>{" "}
                  <p className="text-gray-700 text-lg">
                    Humidity:{" "}
                    <span className="text-yellow-500">
                      {weatherData.humidity}%
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={handleShowGraph}
              className="bg-gradient-to-r from-blue-700 to-blue-800 text-white py-3 px-6 rounded-md hover:from-blue-600 hover:to-blue-700 transition duration-300 focus:outline-none focus:ring focus:border-blue-600"
            >
              Show Graph
            </button>
          </div>
          {showGraph && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Temperature Comparison Graph
              </h2>
              <Bar
                data={{
                  labels: cities,
                  datasets: [
                    {
                      label: "Temperature (°C)",
                      data: graphData,
                      backgroundColor: "rgba(75,192,192,0.7)",
                      borderColor: "rgba(75,192,192,1)",
                      borderWidth: 1,
                    },
                  ],
                }}
                options={options}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
