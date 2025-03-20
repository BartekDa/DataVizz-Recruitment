import React from "react";
import { Box, Typography, Grid, Card, CardContent, Paper } from "@mui/material";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import OpacityIcon from "@mui/icons-material/Opacity";
import AirIcon from "@mui/icons-material/Air";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { styled } from "@mui/material/styles";

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
  overflow: "hidden",
  background: "linear-gradient(135deg, #6b8cce, #61dafb)",
  color: "white",
}));

const WeatherIconWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(1),
  position: "relative",
}));

const WeatherIcon = styled("img")(({ theme }) => ({
  width: 120,
  height: 120,
  filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2))",
}));

const MetricCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1.5),
  display: "flex",
  alignItems: "center",
  borderRadius: 12,
  background: "rgba(255, 255, 255, 0.2)",
  backdropFilter: "blur(10px)",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "translateY(-4px)",
  },
}));

const MetricIcon = styled(Box)(({ theme }) => ({
  borderRadius: "50%",
  width: 36,
  height: 36,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "rgba(255, 255, 255, 0.3)",
  marginRight: theme.spacing(1.5),
}));

function WeatherWidget({ data }) {
  if (!data) return null;

  const { name, main, weather, wind } = data;
  const weatherIconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  return (
    <StyledCard>
      <CardContent sx={{ p: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={7}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <LocationOnIcon sx={{ mr: 1, fontSize: 20 }} />
              <Typography variant="h5" fontWeight="500">
                {name}
              </Typography>
            </Box>
            <Typography variant="h2" fontWeight="bold" sx={{ mb: 1 }}>
              {Math.round(main.temp)}°C
            </Typography>
            <Typography
              variant="h6"
              sx={{ textTransform: "capitalize", opacity: 0.9 }}
            >
              {weather[0].description}
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <WeatherIconWrapper>
              <WeatherIcon src={weatherIconUrl} alt={weather[0].description} />
            </WeatherIconWrapper>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <MetricCard>
                <MetricIcon>
                  <ThermostatIcon sx={{ color: "white" }} />
                </MetricIcon>
                <Box>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Feels Like
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {Math.round(main.feels_like)}°C
                  </Typography>
                </Box>
              </MetricCard>
            </Grid>
            <Grid item xs={4}>
              <MetricCard>
                <MetricIcon>
                  <OpacityIcon sx={{ color: "white" }} />
                </MetricIcon>
                <Box>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Humidity
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {main.humidity}%
                  </Typography>
                </Box>
              </MetricCard>
            </Grid>
            <Grid item xs={4}>
              <MetricCard>
                <MetricIcon>
                  <AirIcon sx={{ color: "white" }} />
                </MetricIcon>
                <Box>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Wind
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {wind.speed} m/s
                  </Typography>
                </Box>
              </MetricCard>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </StyledCard>
  );
}

export default WeatherWidget;
