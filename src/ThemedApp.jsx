import {
  React,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { deepPurple, grey } from "@mui/material/colors";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Template from "./Template";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Comments from "./pages/Comments";
import Profile from "./pages/Profile";
import Likes from "./pages/Likes";
import { QueryClient, QueryClientProvider } from "react-query";
import { fetchVerify } from "./libs/fetcher";
import Search from "./pages/Search";

const AppContext = createContext();

export const useApp = () => {
  return useContext(AppContext);
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Template />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/comments/:id",
        element: <Comments />,
      },
      {
        path: "/profile/:id",
        element: <Profile />,
      },
      {
        path: "/likes/:id/:type",
        element: <Likes />,
      },
      {
        path: "/search",
        element: <Search />,
      },
    ],
  },
]);

export const queryClient = new QueryClient();
const ThemedApp = () => {
  const [auth, setAuth] = useState(null);
  const [mode, setMode] = useState("dark");
  const [showForm, setShowForm] = useState(false);
  const [globalMsg, setGlobalMsg] = useState(null);
  const [showDrawer, setShowDrawer] = useState(false);

  useEffect(() => {
    fetchVerify().then((user) => {
      if (user) setAuth(user);
    });
  }, []);

  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode,
        primary: deepPurple,
        banner: mode === "dark" ? grey["800"] : grey["200"],
        text: { fade: grey["500"] },
      },
    });
  }, [mode]);

  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider
        value={{
          globalMsg,
          setGlobalMsg,
          auth,
          setAuth,
          showDrawer,
          setShowDrawer,
          showForm,
          setShowForm,
          mode,
          setMode,
        }}
      >
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
        <CssBaseline />
      </AppContext.Provider>
    </ThemeProvider>
  );
};

export default ThemedApp;
