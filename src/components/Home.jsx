import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import Detail from "./Detail";
import { FaWind,FaTachometerAlt } from "react-icons/fa";
import { WiHumidity,WiCloud } from "react-icons/wi";

const MyComponent = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather`,
          {
            params: {
              q: "Delhi", 
              appid: "46858cf5567baa95edc1766cfff71b1d",
            },
          }
        );
        setWeather(response.data);
      } catch (error) {
        console.log("Data not found", error.message);
      }
    };

    fetchWeather(); 
  }, []);

  const handleCity = async (city) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        {
          params: {
            q: city,
            appid: "46858cf5567baa95edc1766cfff71b1d",
          },
        }
      );
      setWeather(response.data);
      setCity(""); 
    } catch (error) {
      console.log("Data not found", error.message);
      setWeather(null)
    }
  };

  return (
    <>
      <div className="my-10 flex justify-center">
        <Card
          className="p-5 w-3/4 lg:w-1/3"
          sx={{
            background:
              "radial-gradient(ellipse 80% 80% at 50% -20%, rgba(120,119,198,0.3), rgba(255,255,255,0))",
          }}
        >
          <div className="flex flex-row my-5">
            <TextField
              style={{ marginRight: "2px" }}
              id="city"
              value={city}
              label="Enter City Name"
              variant="outlined"
              fullWidth
              onChange={(e) => setCity(e.target.value)}
            />
            <Button variant="contained" onClick={() => handleCity(city)}>
              <FaSearch />
            </Button>
          </div>
          {weather ? (
            <div>
              <div className="flex flex-col items-start justify-center">
                <h1 className="text-5xl font mb-12 mt-3">
                  {Math.round(weather.main.temp - 273)}&deg; C <span className="text-sm">feels like {Math.round(weather.main.feels_like-273)}&deg; C</span>
                </h1>
                <h1 className="text-4xl font">{weather.name}</h1>
              </div>
              <div className="flex flex-row flex-wrap justify-around mt-10">
                <Detail title="Wind" value={weather.wind.speed} unit={"Km/h"} Icon={FaWind} />
                <Detail title="Pressure" value={weather.main.pressure} unit={"pa"} Icon={FaTachometerAlt}/>
                <Detail title="Humidity" value={weather.main.humidity} unit={"%"} Icon={WiHumidity}/>
                <Detail title="Clouds" value={weather.clouds.all} unit={"%"} Icon={WiCloud} />
              </div>
            </div>
          ) : (
            <h1>Data not found</h1>
          )}
        </Card>
      </div>
    </>
  );
};

export default MyComponent;
