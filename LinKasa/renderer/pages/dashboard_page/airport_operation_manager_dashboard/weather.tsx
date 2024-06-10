import { ThemeProvider } from "@emotion/react";
import {
  Box,
  Container,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import theme from "../../../lib/theme";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import WeatherCard from "../../../components/weather-card";
import axios from "axios";

export default function Weather() {
  const [location, setLocation] = useState("Seoul");
  const [data, setData] = useState<WeatherData>({});
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=aaf39c80bdf95b162d6be1f4cf103713`;

  const fetchWeatherData = async () => {
    try {
      await axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
    } catch (error) {

    }
  };

  const handleSearch = (e) => {
    if (e.key == "Enter") {
      fetchWeatherData();
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
        <TextField
          id="location"
          label="Location"
          variant="standard"
          sx={{
            width: "25%",
            mb: 2,
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
          }}
          onKeyDown={handleSearch}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box
            component={Paper}
            sx={{
              padding: 3,
              backgroundColor:
              (data.main ? parseFloat((data.main.temp - 273.15 ?? 0).toFixed(2)) < 10
              ? "#52c8ff"
              : parseFloat((data.main.temp - 273.15 ?? 0).toFixed(2)) < 20
              ? "#ffa952"
              : "#ff5252" : null),
              color:
              (data.main ? parseFloat((data.main.temp - 273.15 ?? 0).toFixed(2)) < 10
              ? "#003d69"
              : parseFloat((data.main.temp - 273.15 ?? 0).toFixed(2)) < 20
              ? "#694100"
              : "#690000" : null),  
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 5,
              }}
            >
              <Box>
                {data.main ? (
                  <Typography variant="h2">
                    {(data.main.temp - 273.15).toFixed(2)}°C
                  </Typography>
                ) : null}
                <Typography variant="h4">
                  {data.name}, {data.sys?.country}
                </Typography>
                {data.weather ? (
                  <Typography>{data.weather[0].main}</Typography>
                ) : null}
              </Box>
              <Box
                sx={
                  {
                    // color: theme.palette.primary.main,
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <WeatherCard location={"jakarta"} />
            <WeatherCard location={"singapore"} />
            <WeatherCard location={"japan"} />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
