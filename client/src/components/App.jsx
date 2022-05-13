import React from "react";
import Nav from "./Nav";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Register from "./Register.js";
import ChangePass from "./Changepass.js";
import Login from "./Login.js";
import HomePage from "./HomePage";
import AddClient from "./AddClient";
import Forgotpass from "./Forgotpass";
import Resetpass from "./Resetpass";
import { SnackbarProvider } from "notistack";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from "@mui/material";


export default function App() {

let theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
      contrastText: '#ffcc00',
    },
    secondary: {
      main: '#0044ff',
      contrastText: '#ffcc00',
    },
     background: {
      default: "#f4cc90",
    },
    text: {
        primary : '#000000',
        secondary : '#000000',
        disabled : '#ffffff'
    },
  },
});

  return (
    <div>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <BrowserRouter>
        <SnackbarProvider maxSnack={5}>
          <Nav />
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/changepass" component={ChangePass} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/Home" component={HomePage} />
            <Route exact path="/AddClient" component={AddClient} />
            <Route exact path="/forgotpass" component={Forgotpass} />
            <Route exact path="/resetpass/:id/:token" component={Resetpass} />
          </Switch>
        </SnackbarProvider>
      </BrowserRouter>
    </ThemeProvider>
    </div>
  );
}
