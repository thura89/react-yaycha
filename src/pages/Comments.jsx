import { Alert, Box, Button, TextField } from "@mui/material";
import React, { useRef } from "react";
import Item from "../components/Item";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { queryClient, useApp } from "../ThemedApp";
import { createComment, deleteComment } from "../libs/fetcher";

const api = import.meta.env.VITE_API;

const Comments = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const contentInput = useRef();

  const { setGlobalMsg, auth } = useApp();

  const { isLoading, isError, error, data } = useQuery("comments", async () => {
    const res = await fetch(`${api}/content/posts/${id}`);
    return res.json();
  });

  const removePost = useMutation(async (id) => {
    await fetch(`${api}/content/posts/${id}`, {
      method: "DELETE",
    });

    navigate("/");
    setGlobalMsg("A post deleted");
  });

  const removeComment = useMutation(async (id) => deleteComment(id), {
    onMutate: async (id) => {
      await queryClient.cancelQueries("comments");
      await queryClient.setQueryData("comments", (old) => {
        old.comments = old.comments.filter((comment) => comment.id !== id);
        return { ...old };
      });
      setGlobalMsg("A comment deleted");
    },
  });

  const addComment = useMutation((content) => createComment(content, id), {
    onSuccess: async (comment) => {
      await queryClient.cancelQueries("comments");
      await queryClient.setQueryData("comments", (old) => {
        old.comments = [...old.comments, comment];
        return { ...old };
      });
      setGlobalMsg("Comment Added");
    },
  });

  if (isError) {
    return (
      <Box>
        <Alert severity="warning">{error.message}</Alert>
      </Box>
    );
  }

  if (isLoading) {
    return <Box sx={{ textAlign: "center" }}>Loading...</Box>;
  }

  return (
    <Box>
      <Item primary item={data} remove={removePost.mutate} />
      {data.comments.map((comment) => {
        return (
          <Item
            comment
            item={comment}
            key={comment.id}
            remove={removeComment.mutate}
          />
        );
      })}

      {auth && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const content = contentInput.current.value;
            if (!content) return false;

            addComment.mutate(content);

            e.currentTarget.reset();
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              mt: 3,
            }}
          >
            <TextField
              inputRef={contentInput}
              multiline
              placeholder="Your Comment"
            />
            <Button type="submit" variant="contained">
              Reply
            </Button>
          </Box>
        </form>
      )}
    </Box>
  );
};

export default Comments;
