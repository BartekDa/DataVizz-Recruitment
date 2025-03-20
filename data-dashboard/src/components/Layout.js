import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// MUI Components
import {
  Box,
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Tooltip,
  Menu,
  MenuItem,
  useTheme,
  alpha,
  Chip,
} from "@mui/material";

// MUI Icons
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { styled } from "@mui/material/styles";

const drawerWidth = 260;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(4),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
    backgroundColor:
      theme.palette.mode === "dark"
        ? alpha(theme.palette.background.default, 0.9)
        : "#f5f7fa",
    minHeight: "100vh",
  })
);

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  boxShadow: "0 4px 20px 0 rgba(0,0,0,0.05)",
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.background.paper : "#ffffff",
  color: theme.palette.text.primary,
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2),
  ...theme.mixins.toolbar,
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    boxSizing: "border-box",
    borderRight: "none",
    boxShadow: "0 10px 30px 0 rgba(0,0,0,0.1)",
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.background.paper
        : "#ffffff",
  },
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  borderRadius: "8px",
  margin: "6px 14px",
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
  },
  "&.Mui-selected": {
    backgroundColor: alpha(theme.palette.primary.main, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.primary.main, 0.2),
    },
  },
}));

function Layout() {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const { user, logout } = useAuth();
  const [selectedItem, setSelectedItem] = useState("Dashboard");

  // Menu handlers
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleListItemClick = (text) => {
    setSelectedItem(text);
  };

  // Menu items
  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },

    { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
  ];

  const supportItems = [
    { text: "Help Center", icon: <HelpOutlineIcon />, path: "/help" },
  ];

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <StyledAppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            {selectedItem}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Menu
              anchorEl={notificationAnchor}
              open={Boolean(notificationAnchor)}
              onClose={handleNotificationClose}
              PaperProps={{
                sx: {
                  width: 320,
                  borderRadius: 2,
                  mt: 1,
                  boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                },
              }}
            >
              <Box
                sx={{
                  p: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="subtitle1" fontWeight="600">
                  Notifications
                </Typography>
                <Chip label="3 new" size="small" color="primary" />
              </Box>
              <Divider />
              <MenuItem onClick={handleNotificationClose} sx={{ py: 2 }}>
                <Box>
                  <Typography variant="body2" fontWeight="500">
                    New team member joined
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    2 minutes ago
                  </Typography>
                </Box>
              </MenuItem>
              <MenuItem onClick={handleNotificationClose} sx={{ py: 2 }}>
                <Box>
                  <Typography variant="body2" fontWeight="500">
                    Meeting scheduled
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    1 hour ago
                  </Typography>
                </Box>
              </MenuItem>
              <MenuItem onClick={handleNotificationClose} sx={{ py: 2 }}>
                <Box>
                  <Typography variant="body2" fontWeight="500">
                    Weekly report available
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    1 day ago
                  </Typography>
                </Box>
              </MenuItem>
              <Divider />
              <Box sx={{ p: 1, display: "flex", justifyContent: "center" }}>
                <Typography
                  variant="body2"
                  color="primary"
                  sx={{ cursor: "pointer" }}
                >
                  View all notifications
                </Typography>
              </Box>
            </Menu>

            <Tooltip title="Account">
              <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                <Avatar
                  sx={{
                    bgcolor: theme.palette.primary.main,
                    width: 40,
                    height: 40,
                    fontWeight: 600,
                  }}
                >
                  {user && getInitials(user.name || user.login)}
                </Avatar>
              </IconButton>
            </Tooltip>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                sx: {
                  width: 220,
                  borderRadius: 2,
                  mt: 1,
                  boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                },
              }}
            >
              <Box sx={{ px: 2, py: 2 }}>
                <Typography variant="subtitle1" fontWeight="600">
                  {user && (user.name || user.login)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user && user.email}
                </Typography>
              </Box>
              <Divider />
              <MenuItem
                component={Link}
                to="/profile"
                onClick={handleMenuClose}
              >
                <ListItemIcon>
                  <AccountCircleIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </MenuItem>
              <MenuItem
                component={Link}
                to="/settings"
                onClick={handleMenuClose}
              >
                <ListItemIcon>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </MenuItem>
              <Divider />
              <MenuItem onClick={logout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </StyledAppBar>

      <StyledDrawer variant="persistent" anchor="left" open={open}>
        <DrawerHeader>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: 1,
                bgcolor: theme.palette.primary.main,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h6" color="white" fontWeight="bold">
                D
              </Typography>
            </Box>
            <Typography variant="h6" fontWeight="bold">
              DataViz
            </Typography>
          </Box>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>

        <Divider sx={{ opacity: 0.3 }} />

        <Box sx={{ my: 2, px: 3 }}>
          <Typography variant="caption" color="text.secondary" fontWeight={500}>
            MAIN MENU
          </Typography>
        </Box>

        <List sx={{ px: 1 }}>
          {menuItems.map((item) => (
            <StyledListItem
              button
              key={item.text}
              component={Link}
              to={item.path}
              selected={selectedItem === item.text}
              onClick={() => handleListItemClick(item.text)}
            >
              <ListItemIcon
                sx={{
                  color:
                    selectedItem === item.text
                      ? theme.palette.primary.main
                      : "inherit",
                  minWidth: 42,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: selectedItem === item.text ? 600 : 500,
                  color:
                    selectedItem === item.text
                      ? theme.palette.primary.main
                      : "inherit",
                }}
              />
              {item.text === "Dashboard" && (
                <Chip
                  label="4"
                  size="small"
                  sx={{
                    bgcolor: theme.palette.primary.main,
                    color: "white",
                    height: 22,
                    fontWeight: 600,
                  }}
                />
              )}
            </StyledListItem>
          ))}
        </List>

        <Box sx={{ my: 2, px: 3 }}>
          <Typography variant="caption" color="text.secondary" fontWeight={500}>
            SUPPORT
          </Typography>
        </Box>

        <List sx={{ px: 1 }}>
          {supportItems.map((item) => (
            <StyledListItem
              button
              key={item.text}
              component={Link}
              to={item.path}
              selected={selectedItem === item.text}
              onClick={() => handleListItemClick(item.text)}
            >
              <ListItemIcon
                sx={{
                  color:
                    selectedItem === item.text
                      ? theme.palette.primary.main
                      : "inherit",
                  minWidth: 42,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: selectedItem === item.text ? 600 : 500,
                  color:
                    selectedItem === item.text
                      ? theme.palette.primary.main
                      : "inherit",
                }}
              />
            </StyledListItem>
          ))}
        </List>

        <Box sx={{ mt: "auto", mb: 3, mx: 3 }}>
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <HelpOutlineIcon color="primary" sx={{ mb: 1 }} />
            <Typography variant="body2" fontWeight={500} gutterBottom>
              Need help?
            </Typography>
            <Typography variant="caption" color="text.secondary" paragraph>
              Check our documentation
            </Typography>
            <Chip
              label="View Documentation"
              component={Link}
              to="/docs"
              clickable
              size="small"
              color="primary"
              sx={{ fontWeight: 500 }}
            />
          </Box>
        </Box>
      </StyledDrawer>

      <Main open={open}>
        <Outlet />
      </Main>
    </Box>
  );
}

export default Layout;
