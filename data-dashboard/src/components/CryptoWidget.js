import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Avatar,
  Chip,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

function CryptoWidget({ data }) {
  if (!data || data.length === 0) return null;

  return (
    <TableContainer
      component={Paper}
      elevation={3}
      sx={{
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{ p: 2, bgcolor: "primary.main", color: "primary.contrastText" }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Cryptocurrency Market
        </Typography>
      </Box>
      <Table size="small">
        <TableHead sx={{ bgcolor: "grey.400" }}>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Coin</TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Price (USD)
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              24h Change
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Market Cap
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((coin) => (
            <TableRow
              key={coin.id}
              sx={{
                "&:hover": {
                  bgcolor: "rgba(0, 0, 0, 0.04)",
                },
                transition: "background-color 0.2s",
              }}
            >
              <TableCell component="th" scope="row">
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    src={coin.image}
                    alt={coin.name}
                    sx={{ width: 28, height: 28, mr: 1.5 }}
                  />
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                      {coin.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {coin.symbol.toUpperCase()}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                  ${coin.current_price.toLocaleString()}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Chip
                  size="small"
                  icon={
                    coin.price_change_percentage_24h > 0 ? (
                      <TrendingUpIcon fontSize="small" />
                    ) : (
                      <TrendingDownIcon fontSize="small" />
                    )
                  }
                  label={`${Math.abs(coin.price_change_percentage_24h).toFixed(
                    2
                  )}%`}
                  color={
                    coin.price_change_percentage_24h > 0 ? "success" : "error"
                  }
                  sx={{
                    fontWeight: "medium",
                    minWidth: "80px",
                  }}
                />
              </TableCell>
              <TableCell align="right">
                <Typography variant="body2">
                  ${(coin.market_cap / 1000000000).toFixed(2)}B
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CryptoWidget;
