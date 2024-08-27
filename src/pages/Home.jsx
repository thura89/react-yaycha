import { AlertTitle, Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import Item from "../components/Item";
import Form from "../components/Form";
import { queryClient, useApp } from "../ThemedApp";
import { useMutation, useQuery } from "react-query";
import {
  createPost,
  deletePost,
  fetchFollowingPosts,
  fetchPost,
} from "../libs/fetcher";

const Home = () => {
  const { setGlobalMsg, showForm, auth } = useApp();
  const [showLatest, setShowLatest] = useState(true);

  const { isLoading, isError, data } = useQuery(
    ["posts", showLatest],

    () => {
      if (showLatest) {
        return fetchPost();
      } else {
        return fetchFollowingPosts();
      }
    }
  );

  const remove = useMutation(async (id) => deletePost(id), {
    onMutate: async (id) => {
      await queryClient.cancelQueries("posts");
      await queryClient.setQueryData(["posts", showLatest], (old) =>
        old.filter((item) => item.id !== id)
      );

      setGlobalMsg("A post deleted");
    },
  });

  const add = useMutation((content) => createPost(content), {
    onSuccess: async (post) => {
      await queryClient.cancelQueries("posts");
      await queryClient.setQueryData(["posts", showLatest], (old) => [
        post,
        ...old,
      ]);
      setGlobalMsg("A post added");
    },
  });

  if (isError) {
    return (
      <Box>
        <AlertTitle variant="warning">Data cannot fetch</AlertTitle>
      </Box>
    );
  }
  if (isLoading) {
    return (
      <Box>
        <AlertTitle variant="info">Loading...</AlertTitle>
      </Box>
    );
  }

  return (
    <Box>
      {showForm && auth && <Form add={add} />}
      {auth && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Button disabled={showLatest} onClick={() => setShowLatest(true)}>
            Latest
          </Button>
          <Typography sx={{ color: "text.fade", fontSize: 15 }}>|</Typography>
          <Button disabled={!showLatest} onClick={() => setShowLatest(false)}>
            Following
          </Button>
        </Box>
      )}
      {data.map((item) => {
        return <Item key={item.id} item={item} remove={remove.mutate} />;
      })}
    </Box>
  );
};

export default Home;
