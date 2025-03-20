import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  FormControlLabel,
  FormGroup,
  Divider,
  Button,
  Snackbar,
  Alert,
  Switch,
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";

function Settings() {
  const { user } = useAuth();
  const [settings, setSettings] = useState({
    notifications: true,
    autoRefresh: true,
    refreshInterval: 60, // seconds
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSettingChange = (setting) => (event) => {
    setSettings({
      ...settings,
      [setting]: event.target.checked,
    });
  };

  const handleSave = () => {
    // Save settings to localStorage
    localStorage.setItem("dashboardSettings", JSON.stringify(settings));
    setSnackbar({
      open: true,
      message: "Settings saved successfully!",
      severity: "success",
    });
  };

  const handleSnackbarClose = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Settings
        </Typography>
        <Typography variant="body1" paragraph>
          Customize your dashboard experience
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            User Information
          </Typography>
          <Typography variant="body1">
            <strong>Username:</strong> {user?.login}
          </Typography>
          {user?.name && (
            <Typography variant="body1">
              <strong>Name:</strong> {user.name}
            </Typography>
          )}
          {user?.email && (
            <Typography variant="body1">
              <strong>Email:</strong> {user.email}
            </Typography>
          )}
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Data Settings
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.autoRefresh}
                  onChange={handleSettingChange("autoRefresh")}
                />
              }
              label="Auto Refresh Data"
            />
          </FormGroup>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save Settings
          </Button>
        </Box>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Settings;
