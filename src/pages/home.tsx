import axios from "axios";
import { useEffect, useState } from "react";
import WeatherTable from "../components/weather-table";
import InputText from "../components/input-text";
import TextTitle from "../components/text-title";
import { Container, Stack   } from "@chakra-ui/react";
import WeatherCard from "../components/weather-card";

type WeatherData = {
  name: string;
  daily: {
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    time: string[];
    temperature_2m_mean: number[];
  };
};

export default function Home() {
  const [weathers, setWeathers] = useState<WeatherData[]>([]);
  const [weather, setWeather] = useState<WeatherData>()

  useEffect(() => {
    getWeathers();
  }, []);

  async function getWeathers() {
    const cities = ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador", "Maceió"];

    try {
      const results = await Promise.all(
        cities.map(async (city) => {
          const geoRes = await axios.get(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}`
          );

          const location = geoRes.data.results?.[0];
          if (!location) {
            throw new Error(`Local não encontrado: ${city}`);
          }

          const forecastRes = await axios.get(
            `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
          );

          return {
            name: city,
            daily: forecastRes.data.daily,
          } as WeatherData;
        })
      );
      console.log(results);
      setWeathers(results);
    } catch (err) {
      console.error("Erro ao buscar dados:", err);
    }
  }

  async function searchWeather(city: string) {
    try {
      const geoRes = await axios.get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}`
      );

      const location = geoRes.data.results?.[0];
      if (!location) {
        alert("Cidade não encontrada!");
        return;
      }

      const forecastRes = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&daily=temperature_2m_max,temperature_2m_min,temperature_2m_mean,apparent_temperature_mean,wind_speed_10m_max&timezone=auto`
      );
      console.log(forecastRes);
      setWeather({
        name: location.name,
        daily: forecastRes.data.daily,
      });
    } catch (err) {
      console.error("Erro ao buscar cidade:", err);
    }
  }


  return (
    <Container
      maxW="4xl"
      minH="100vh"
      py={50}
      centerContent
      bgGradient="linear(to-b, orange.500, yellow.400)"
    >
      <Stack spacing={30} w="100%" textAlign="center" align="center">
        <TextTitle title="Previsão do tempo" />

        {weather && <WeatherCard weather={weather} />}
        
        <InputText
          placeholder="Insira aqui o nome da cidade"
          onSearch={searchWeather}
        />

        <div className="flex-grow"></div>

        <WeatherTable weathers={weathers} />
      </Stack>
    </Container>
  );
}
