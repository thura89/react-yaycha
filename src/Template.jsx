import { Box, Container, Snackbar } from "@mui/material";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import AppDrawer from "./components/AppDrawer";
import { useApp } from "./ThemedApp";

const Template = () => {
  const { globalMsg, setGlobalMsg } = useApp();

  return (
    <Box>
      <Header />
      <AppDrawer />
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Outlet />
      </Container>
      <Snackbar
        anchorOrigin={{
          horizontal: "center",
          vertical: "bottom",
        }}
        message={globalMsg}
        autoHideDuration={6000}
        open={Boolean(globalMsg)}
        onClose={() => setGlobalMsg(null)}
      />
    </Box>
  );
};

export default Template;
