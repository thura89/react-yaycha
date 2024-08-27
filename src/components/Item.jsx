import React from "react";
import { Box, Card, CardContent, IconButton, Typography } from "@mui/material";
import {
  AccountCircle as UserIcon,
  Delete as DeleteIcon,
  Alarm as TimeIcon,
} from "@mui/icons-material";
import { green } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { formatRelative } from "date-fns";
import LikeButton from "./LikeButton";
import CommentButton from "./CommentButton";

const Item = ({ item, remove, primary, comment }) => {
  const navigate = useNavigate();
  return (
    <Card sx={{ mb: 2 }}>
      {primary && <Box sx={{ height: 50, bgcolor: green[500] }} />}
      <CardContent
        onClick={() => {
          if (comment) return false;
          navigate(`/comments/${item.id}`);
        }}
        sx={{ cursor: "pointer" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
            }}
          >
            <TimeIcon color="success" fontSize="10" />
            <Typography variant="caption" sx={{ color: green[500] }}>
              {formatRelative(item.created, new Date())}
            </Typography>
            <Typography>{item.id}</Typography>
          </Box>
          <IconButton
            size="small"
            onClick={(e) => {
              remove(item.id);
              e.stopPropagation();
            }}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </Box>
        <Typography sx={{ my: 3 }}>{item.content}</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            onClick={(e) => {
              navigate(`/profile/${item.user.id}`);
              e.stopPropagation();
            }}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
            }}
          >
            <UserIcon fontSize="12" color="info" />
            <Typography variant="caption">{item.user.name}</Typography>
          </Box>
          <Box>
            <LikeButton item={item} comment={comment} />
            <CommentButton item={item} comment={comment} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Item;
