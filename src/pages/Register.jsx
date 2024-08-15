import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import React from "react";

const Register = () => {
  return (
    <Box>
      <Typography variant="h3">Register</Typography>
      <Alert sx={{ mt: 2 }} severity="warning">
        All Field Required
      </Alert>
      <form action="">
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 2 }}>
          <TextField placeholder="Username" fullWidth />
          <TextField placeholder="Name" fullWidth />
          <TextField placeholder="Bio" fullWidth />
          <TextField placeholder="Password" type="password" fullWidth />
          <Button type="submit" variant="contained" fullWidth>
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Register;
