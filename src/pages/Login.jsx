import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useApp } from "../ThemedApp";
import { useRef, useState } from "react";
import { useMutation } from "react-query";
import { postLogin } from "../libs/fetcher";

const Login = () => {
  const navigate = useNavigate();
  const { setAuth } = useApp();
  const [error, setError] = useState(null);
  const usernameInput = useRef();
  const passwordInput = useRef();

  const handleSubmit = () => {
    const username = usernameInput.current.value;
    const password = passwordInput.current.value;

    if (!username || !password) {
      setError("Username and Password is required");
      return false;
    }
    setLogin.mutate({ username, password });
  };

  const setLogin = useMutation(
    async ({ username, password }) => postLogin(username, password),
    {
      onError: async () => {
        setError("Error: Can not Login ");
      },
      onSuccess: async (result) => {
        setAuth(result);
        localStorage.setItem("token", result.token);
        navigate("/");
      },
    }
  );

  return (
    <Box>
      <Typography variant="h3">Login</Typography>
      {error && (
        <Alert severity="warning" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Box
          sx={{
            gap: 1,
            display: "flex",
            flexDirection: "column",
            mt: 2,
          }}
        >
          <TextField
            inputRef={usernameInput}
            placeholder="Username"
            fullWidth
          />
          <TextField
            inputRef={passwordInput}
            placeholder="Password"
            type="password"
            fullWidth
          />
          <Button type="submit" variant="contained" fullWidth>
            Login
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Login;
