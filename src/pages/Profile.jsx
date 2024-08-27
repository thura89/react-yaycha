import {
  Alert,
  Avatar,
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { green, pink } from "@mui/material/colors";
import React from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { fetchUser } from "../libs/fetcher";
import { Alarm as TimeIcon } from "@mui/icons-material";
import { formatRelative } from "date-fns";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, error, isError, isLoading } = useQuery(
    `users/${id}`,
    async () => fetchUser(id)
  );

  if (isError) {
    return (
      <Box>
        <Alert severity="warning">{error.message()}</Alert>
      </Box>
    );
  }
  if (isLoading) {
    return <Box sx={{ textAlign: "center" }}>Loading...</Box>;
  }
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
          <Typography>{data.name}</Typography>
          <Typography sx={{ fontSize: "0.8em", color: "text.fade" }}>
            {data.bio}
          </Typography>
        </Box>
      </Box>

      {data.posts.map((item) => (
        <Card sx={{ mb: 2 }} key={item.id}>
          <CardContent
            onClick={() => {
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
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "row",
                  justifyItems: "center",
                }}
              >
                <TimeIcon fontSize="10" color="success" />
                <Typography
                  variant="caption"
                  sx={{ color: green[500], marginLeft: 1 }}
                >
                  {formatRelative(item.created, new Date())}
                </Typography>
              </Box>
            </Box>
            <Typography sx={{ my: 3 }}>{item.content}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default Profile;
