import { Avatar, Box, Typography } from "@mui/material";
import { pink } from "@mui/material/colors";
import React from "react";
import Item from "../components/Item";

const Profile = () => {
  return (
    <Box>
      <Box sx={{ bgcolor: "banner", borderRadius: 4, height: 150 }}></Box>
      <Box
        sx={{
          marginTop: "-60px",
          mb: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Avatar sx={{ width: 100, height: 100, bgcolor: pink[500] }} />
        <Box sx={{ textAlign: "center" }}>
          <Typography>Alice</Typography>
          <Typography sx={{ fontSize: "0.8em", color: "text.fade" }}>
            Alice Profile Bio Content Here
          </Typography>
        </Box>
      </Box>
      <Item
        key={1}
        remove={() => {}}
        item={{
          id: 1,
          content: "Alice Pot content from alice",
          name: "Alice",
        }}
      />
    </Box>
  );
};

export default Profile;
