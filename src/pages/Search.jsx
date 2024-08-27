import { useDebounce } from "@uidotdev/usehooks";
import { useState } from "react";
import { useQuery } from "react-query";
import { fetchQuery } from "../libs/fetcher";
import {
  Alert,
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
} from "@mui/material";
import FollowButton from "../components/FollowButton";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const { data, isLoading, isError, error } = useQuery(
    ["search", debouncedQuery],
    () => {
      return fetchQuery(debouncedQuery);
    }
  );
  if (isError) {
    return (
      <Box>
        <Alert>{error.message}</Alert>
      </Box>
    );
  }
  return (
    <Box>
      <TextField
        onKeyUp={(e) => setQuery(e.target.value)}
        fullWidth
        variant="outlined"
        placeholder="Search..."
      />
      {isLoading ? (
        <Box sx={{ textAlign: "center", mt: 4 }}>Loading...</Box>
      ) : (
        <List>
          {data.map((user) => {
            return (
              <ListItem key={user.id}>
                <ListItemButton
                  onClick={(e) => navigate(`/profile/${user.id}`)}
                >
                  <ListItemAvatar>
                    <Avatar />
                  </ListItemAvatar>
                  <ListItemText primary={user.name} secondary={user.bio} />
                  <ListItemSecondaryAction>
                    <FollowButton user={user} />
                  </ListItemSecondaryAction>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      )}
    </Box>
  );
};

export default Search;
