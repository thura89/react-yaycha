import React from "react";

import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import {
  Add as AddIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Menu as MenuIcon,
  Remove as RemoveIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import { useApp } from "../ThemedApp";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  const { setShowDrawer, showForm, setShowForm, mode, setMode, auth } =
    useApp();
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={() => setShowDrawer(true)}
        >
          <MenuIcon />
        </IconButton>

        <Typography sx={{ flexGrow: 1, ml: 2 }}>YayCha</Typography>

        <Box sx={{ display: "flex", gap: 1 }}>
          {auth && (
            <IconButton color="inherit" onClick={() => setShowForm(!showForm)}>
              <AddIcon />
            </IconButton>
          )}

          <IconButton color="inherit" onClick={() => navigate("/search")}>
            <SearchIcon />
          </IconButton>

          {mode === "dark" ? (
            <IconButton
              color="inherit"
              edge="end"
              onClick={() => setMode("light")}
            >
              <LightModeIcon />
            </IconButton>
          ) : (
            <IconButton
              color="inherit"
              edge="end"
              onClick={() => setMode("dark")}
            >
              <DarkModeIcon />
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
