import {
  Home as HomeIcon,
  Logout as LogoutIcon,
  PersonAdd as RegisterIcon,
  Person as ProfileIcon,
  Login as LoginIcon,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import React from "react";
import { useApp } from "../ThemedApp";
import { useNavigate } from "react-router-dom";


const AppDrawer = () => {
  const { showDrawer, setShowDrawer, auth, setAuth } = useApp();
  const navigate = useNavigate();
  return (
    <div>
      <Drawer open={showDrawer} onClose={() => setShowDrawer(false)}>
        <Box
          sx={{
            width: 300,
            height: 140,
            bgcolor: "banner",
            position: "relative",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexDirection: "row",
              alignItems: "center",
              position: "absolute",
              left: 20,
              bottom: -30,
            }}
          >
            <Avatar
              sx={{
                width: 92,
                height: 92,
                color: "white",
                background: deepPurple[500],
              }}
            />
            <Typography sx={{ fontWeight: "bold" }}>YZK</Typography>
          </Box>
        </Box>
        <List>
          <ListItem>
            <ListItemButton onClick={() => navigate('/')}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText>Home</ListItemText>
            </ListItemButton>
          </ListItem>
          <Divider />
          {auth && (
            <>
              <ListItem>
                <ListItemButton onClick={() => navigate('/profile/1')}>
                  <ListItemIcon>
                    <ProfileIcon />
                  </ListItemIcon>
                  <ListItemText>Profile</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton onClick={() => setAuth(null)}>
                  <ListItemIcon>
                    <LogoutIcon color="error" />
                  </ListItemIcon>
                  <ListItemText>Logout</ListItemText>
                </ListItemButton>
              </ListItem>
            </>
          )}
          {!auth && (
            <>
              <ListItem>
                <ListItemButton onClick={() => navigate('/register')}>
                  <ListItemIcon>
                    <RegisterIcon />
                  </ListItemIcon>
                  <ListItemText>Register</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton onClick={() => setAuth(true)}>
                  <ListItemIcon>
                    <LoginIcon />
                  </ListItemIcon>
                  <ListItemText>Login</ListItemText>
                </ListItemButton>
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </div>
  );
};

export default AppDrawer;
