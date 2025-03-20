import React from "react";
import { Box, Button, Typography, Container, Paper } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useAuth } from "../contexts/AuthContext";

function Login() {
  const { login, error } = useAuth();

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Paper
          elevation={6}
          sx={{
            p: 5,
            width: "100%",
            borderRadius: 3,
            textAlign: "center",
            background: "linear-gradient(135deg, #1e3c72 30%, #2a5298 90%)",
            color: "white",
          }}
        >
          <Typography component="h1" variant="h4" gutterBottom>
            Data Dashboard
          </Typography>
          <Typography variant="body1" paragraph>
            Sign in to access your personalized data dashboard
          </Typography>

          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}

          <Button
            variant="contained"
            fullWidth
            startIcon={<GitHubIcon />}
            onClick={login}
            sx={{
              mt: 3,
              backgroundColor: "#24292e",
              color: "white",
              "&:hover": { backgroundColor: "#57606a" },
              fontSize: "1rem",
              fontWeight: "bold",
              padding: "10px",
              borderRadius: "10px",
              transition: "all 0.3s ease-in-out",
            }}
          >
            Sign in with GitHub
          </Button>

          <Box sx={{ mt: 4 }}>
            <Typography variant="body2" color="white" opacity={0.8}>
              This application uses OAuth 2.0 with GitHub for authentication.
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default Login;
