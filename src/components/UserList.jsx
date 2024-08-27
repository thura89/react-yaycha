import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import FollowButton from "./FollowButton";

const UserList = ({ title, data }) => {
  const navigate = useNavigate();
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        {title}
      </Typography>
      <List>
        {data.data.map((item) => (
          <ListItem key={item.id}>
            <ListItemButton
              onClick={() => navigate(`/profile/${item.user.id}`)}
            >
              <ListItemAvatar>
                <Avatar />
              </ListItemAvatar>
              <ListItemText
                primary={item.user.name}
                secondary={item.user.bio}
              />
              <ListItemSecondaryAction>
                <FollowButton user={item.user} />
              </ListItemSecondaryAction>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default UserList;
