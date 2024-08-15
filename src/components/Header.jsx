import React from "react";

import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import {
  Add as AddIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Menu as MenuIcon,
  Remove as RemoveIcon,
} from "@mui/icons-material";
import { useApp } from "../ThemedApp";
const Header = () => {
  const { setShowDrawer, showForm, setShowForm, mode, setMode } = useApp();
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton color="inherit" edge="start" onClick={() => setShowDrawer(true)}>
          <MenuIcon />
        </IconButton>
        <Typography sx={{ flexGrow: 1, ml: 2 }}>YayCha</Typography>
        <Box>
          <IconButton color="inherit" onClick={() => setShowForm(!showForm)}>
            {
              showForm === true ?  <RemoveIcon/> : <AddIcon />
            }
            
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
