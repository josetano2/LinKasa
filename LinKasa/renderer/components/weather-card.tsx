import { Box, Paper, Typography } from "@mui/material";
import theme from "../lib/theme";
import { ThemeProvider } from "@emotion/react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function WeatherCard({ location }: { location: string }) {
  const [data, setData] = useState<WeatherData>({});
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=aaf39c80bdf95b162d6be1f4cf103713`;

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }, [location]);

  return (
    <ThemeProvider theme={theme}>
      <Box
        component={Paper}
        sx={{
          display: "flex",
          padding: 3,
          width: "22rem",
          height: "20rem",
          backgroundColor: data.main
            ? parseFloat((data.main.temp - 273.15 ?? 0).toFixed(2)) < 10
              ? "#52c8ff"
              : parseFloat((data.main.temp - 273.15 ?? 0).toFixed(2)) < 20
              ? "#ffa952"
              : "#ff5252"
            : null,
          color: data.main
            ? parseFloat((data.main.temp - 273.15 ?? 0).toFixed(2)) < 10
              ? "#003d69"
              : parseFloat((data.main.temp - 273.15 ?? 0).toFixed(2)) < 20
              ? "#694100"
              : "#690000"
            : null,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            {data.main ? (
              <Typography variant="h3">
                {(data.main.temp - 273.15).toFixed(2)}°C
              </Typography>
            ) : null}
            <Typography variant="h4">{data.name}</Typography>
            {data.weather ? (
              <Typography>{data.weather[0].main}</Typography>
            ) : null}
          </Box>
          <Box
            sx={
              {
                // color: theme.palette.text.secondary,
              }
            }
          >
            {data.main ? (
              <Typography>
                Feels Like: {(data.main.feels_like - 273.15).toFixed(2)}°C
              </Typography>
            ) : null}
            {data.main ? (
              <Typography>Humidity: {data.main.humidity}%</Typography>
            ) : null}
            {data.wind ? (
              <Typography>
                Wind Speed: {(data.wind.speed * 1.609).toFixed(2)} km/h
              </Typography>
            ) : null}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
