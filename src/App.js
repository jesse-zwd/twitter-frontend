import React from "react";
import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import { ToastContainer } from "react-toastify";
import { lightTheme } from "./styles/themes";
import GlobalStyle from "./styles/GlobalStyle";
import Router from "./Router";
import Auth from "./components/Auth/Auth";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const theme = lightTheme
  const user = useSelector((state) => state.user.data);
  
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ToastContainer
        toastClassName="toast-style"
        autoClose={2000}
        closeButton={false}
        draggable={false}
      />
      {user.username ? <Router /> : <Auth />}
    </ThemeProvider>
  );
};

export default App;
