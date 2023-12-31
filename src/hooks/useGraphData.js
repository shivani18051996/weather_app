import { useState } from "react";
import { BASE_API_URL } from "../utils";
import axios from "axios";

  export const useGraphData = (cities) => {
    const [graphData, setGraphData] = useState([]);
    const [showGraph, setShowGraph] = useState(false);
 
    const fetchGraphData = async () => {
      try {
        const cityData = await Promise.all(
          cities.map(async (city) => {
            const response = await axios.get(
              `${BASE_API_URL}${city}&appid=${process.env.REACT_APP_KEYAPI}&units=metric`
            );
            return response.data.main.temp;
          })
        );
        setGraphData(cityData);
        setShowGraph(true);
      } catch (error) {
        console.error("Error fetching graph data:", error.message);
      }
    };
  
    return { graphData, showGraph, fetchGraphData };
  };