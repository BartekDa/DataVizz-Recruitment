import React, { useEffect } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { useLocation } from "react-router-dom";

function Callback() {
  const { handleCallback, loading, error } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get("code");
    const state = queryParams.get("state");

    if (code) {
      handleCallback(code, state);
    }
  }, [location, handleCallback]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {loading ? (
        <>
          <CircularProgress />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Authenticating...
          </Typography>
        </>
      ) : error ? (
        <Typography color="error" variant="h6">
          {error}
        </Typography>
      ) : (
        <Typography variant="h6">Redirecting to dashboard...</Typography>
      )}
    </Box>
  );
}

export default Callback;
