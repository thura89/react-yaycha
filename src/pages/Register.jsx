import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { useMutation } from "react-query";

import { postUser } from "../libs/fetcher";
import { useApp } from "../ThemedApp";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { setGlobalMsg } = useApp();

  const usernameInput = useRef();
  const nameInput = useRef();
  const bioInput = useRef();
  const passwordInput = useRef();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = () => {
    const username = usernameInput.current.value;
    const name = nameInput.current.value;
    const bio = bioInput.current.value;
    const password = passwordInput.current.value;

    if (!username || !name || !password) {
      setError("Username , name and password Required");
      return false;
    }
    create.mutate({ username, name, bio, password });
  };
  const create = useMutation(async (data) => postUser(data), {
    onError: async () => {
      setError("Cannot Create Account");
    },
    onSuccess: async () => {
      setGlobalMsg("Account created");
      navigate("/login");
    },
  });

  return (
    <Box>
      <Typography variant="h3">Register</Typography>

      {error && (
        <Alert sx={{ mt: 2 }} severity="warning">
          {error}
        </Alert>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 2 }}>
          <TextField
            inputRef={usernameInput}
            placeholder="Username"
            fullWidth
          />
          <TextField inputRef={nameInput} placeholder="Name" fullWidth />
          <TextField inputRef={bioInput} placeholder="Bio" fullWidth />
          <TextField
            inputRef={passwordInput}
            placeholder="Password"
            type="password"
            fullWidth
          />
          <Button type="submit" variant="contained" fullWidth>
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Register;
