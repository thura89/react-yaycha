import { useRef } from "react";
import { Box, Button, TextField } from "@mui/material";

const Form = ({ add }) => {
  const contentRef = useRef();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const content = contentRef.current.value;

        add(content, "Halice");
        e.currentTarget.reset();
      }}
    >
      <Box sx={{ mb: 4, textAlign: "right" }}>
        <TextField
          sx={{ mb: 1 }}
          inputRef={contentRef}
          type="text"
          placeholder="content"
          fullWidth
          multiline
        />
        <Button variant="contained" type="submit">
          Post
        </Button>
      </Box>
    </form>
  );
};

export default Form;
