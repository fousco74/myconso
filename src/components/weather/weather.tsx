"use client";
import { coreMakeGetRequest } from "@/utilities/functions";
import Image from "next/image";
import { useEffect, useState } from "react";

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_WEATHER_BASE_URL;
const city = process.env.NEXT_PUBLIC_WEATHER_CITY;

interface WeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type?: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export default function Weather() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [date, setDate] = useState("");

  // 🔄 Met à jour la date & l'heure chaque minute
  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };

      setDate(new Intl.DateTimeFormat("fr-FR", options).format(now));
    };

    updateDate(); // Met à jour immédiatement
    const interval = setInterval(updateDate, 60 * 1000); // Met à jour chaque minute

    return () => clearInterval(interval); // Nettoyage de l'intervalle
  }, []);

  // récupérer les données météo
  const fetchWeather = async () => {
    try {
      if (!API_KEY || !BASE_URL) {
                return;
      }

      const response = await coreMakeGetRequest({
        baseUrl: BASE_URL,
        endpoint: `?q=${city}&units=metric&lang=fr&appid=${API_KEY}`,
        isProtected: false,
        additionalHeaders: {
          "Content-Type": "application/json",
        },
      });

      if (!response.success) {
        throw new Error(`Erreur API: ${response.success} ${response.message}`);
      }

      console.log("open weather data", response.data);

      setWeatherData(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des données météo :", error);
    }
  };

  // Met à jour les données météo toutes les 10 minutes
  useEffect(() => {
    fetchWeather();
    const interval = setInterval(fetchWeather, 10 * 60 * 1000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="md:w-1/2 bg-white rounded-lg border py-4 px-1">
      <div className="flex justify-around">
        {weatherData && (
          <Image
            src={`/icons/times/${weatherData.weather[0].main.toLowerCase()}.svg`}
            alt="weather-icon"
            width={80}
            height={80}
          />
        )}
        <div className="flex flex-col text-[12px]">
          <div className="flex gap-2">
            <h3 className="font-bold text-midnightblue text-base">Météo</h3>
            <Image src="/icons/weatherBold.svg" alt="weather-icon" width={15} height={15} />
          </div>
          <div className="flex gap-1">
            <h5>Ce temps est susceptible <br />de faire baisser votre <br />consommation !</h5>
            <Image src="/icons/info.svg" alt="info-icon" width={15} height={15} className="self-start" />
          </div>
        </div>
      </div>

      <div className="flex flex-col px-2">
        <div className="flex text-midnightblue">
          <span className="text-4xl">{weatherData?.main.temp}°</span>
          <span className="text-xl self-center">C</span>
        </div>
        <div className="flex gap-2 items-center">
          <Image src="/icons/weather.svg" alt="weather-icon" width={15} height={15} />
          <span>{weatherData?.weather[0].description}</span>
        </div>
      </div>

      <hr className="my-2" />

      <div className="flex gap-2 items-center text-midnightblue text-opacity-80 px-2">
        <Image src="/icons/location.svg" alt="location-icon" width={15} height={15} />
        <span>{weatherData?.name}, {weatherData?.sys.country}</span>
      </div>
      <div className="flex gap-2 items-center text-midnightblue text-opacity-80 px-2">
        <Image src="/icons/calandar.svg" alt="calendar-icon" width={15} height={15} />
        <span>{date}</span>
      </div>
    </div>
  );
}
