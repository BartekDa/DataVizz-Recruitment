import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Typography,
  Box,
  CircularProgress,
  TextField,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import WeatherWidget from "../components/WeatherWidget";
import CryptoWidget from "../components/CryptoWidget";
import NewsWidget from "../components/NewsWidget";
import { useAuth } from "../contexts/AuthContext";

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [citySearch, setCitySearch] = useState("");
  const [city, setCity] = useState("London");
  const [weatherData, setWeatherData] = useState(null);
  const [cryptoData, setCryptoData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const { user } = useAuth();
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const weatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}&units=metric`
        );

        if (!weatherResponse.ok) {
          throw new Error(
            `Weather API responded with ${weatherResponse.status}`
          );
        }

        const weatherJson = await weatherResponse.json();
        setWeatherData(weatherJson);

        const cryptoResponse = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=true"
        );

        if (!cryptoResponse.ok) {
          throw new Error(`Crypto API responded with ${cryptoResponse.status}`);
        }

        const cryptoJson = await cryptoResponse.json();
        setCryptoData(cryptoJson);

        if (user) {
          const token = localStorage.getItem("accessToken");
          const newsResponse = await fetch(
            `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!newsResponse.ok) {
            throw new Error(`News API responded with ${newsResponse.status}`);
          }

          const newsJson = await newsResponse.json();
          setNewsData(newsJson.articles.slice(0, 5));
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 60000);

    return () => clearInterval(interval);
  }, [city, user]);

  const handleCitySearch = (e) => {
    e.preventDefault();
    if (citySearch.trim()) {
      setCity(citySearch);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Typography color="error" variant="h6">
          Error: {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: { xs: 1, sm: 3 },
        maxWidth: "100vw",
        overflowX: "hidden",
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{ fontSize: { xs: "1.5rem", sm: "2.125rem" } }}
            >
              Dashboard
            </Typography>
            <Typography variant="body1">
              Welcome to your personalized data dashboard. View real-time
              weather, cryptocurrency prices, and latest news.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontSize: { xs: "1.1rem", sm: "1.25rem" } }}
            >
              Weather Information
            </Typography>
            <Box
              component="form"
              onSubmit={handleCitySearch}
              sx={{
                mb: 2,
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 1,
              }}
            >
              <TextField
                label="Search City"
                variant="outlined"
                size="small"
                value={citySearch}
                onChange={(e) => setCitySearch(e.target.value)}
                sx={{ flexGrow: 1 }}
              />
              <Button variant="contained" type="submit" size="small">
                Search
              </Button>
            </Box>
            {weatherData && <WeatherWidget data={weatherData} />}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontSize: { xs: "1.1rem", sm: "1.25rem" } }}
            >
              Cryptocurrency Prices
            </Typography>
            <CryptoWidget data={cryptoData} />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2, overflowX: "auto" }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontSize: { xs: "1.1rem", sm: "1.25rem" } }}
            >
              Cryptocurrency Trends
            </Typography>
            <Box sx={{ minWidth: "500px" }}>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={cryptoData.map((coin) => ({
                    name: coin.symbol.toUpperCase(),
                    price: coin.current_price,
                    marketCap: coin.market_cap / 1_000_000_000, // Market Cap w miliardach
                  }))}
                  margin={{ top: 20, right: 50, left: 50, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />

                  {/* Oś Y dla ceny */}
                  <YAxis
                    yAxisId="left"
                    label={{
                      value: "Price (USD)",
                      angle: -90,
                      position: "insideLeft",
                    }}
                    tick={{ fontSize: 12 }}
                    domain={[0, "auto"]} // Dynamiczna skala
                  />

                  {/* Oś Y dla marketCap (logarytmiczna) */}
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    label={{
                      value: "Market Cap (B USD)",
                      angle: -90,
                      position: "insideRight",
                    }}
                    tick={{ fontSize: 12 }}
                    scale="log" // Logarytmiczna skala
                    domain={[0.01, "auto"]} // Aby uniknąć problemu z wartościami bliskimi 0
                  />

                  <Tooltip
                    contentStyle={{ backgroundColor: "#222", color: "#fff" }}
                  />
                  <Legend />

                  {/* Linia ceny */}
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="price"
                    stroke={theme.palette.primary.main}
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />

                  {/* Linia marketCap */}
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="marketCap"
                    stroke={theme.palette.secondary.main}
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {user && (
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontSize: { xs: "1.1rem", sm: "1.25rem" } }}
              >
                Latest News
              </Typography>
              <NewsWidget data={newsData} />
            </Paper>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default Dashboard;
