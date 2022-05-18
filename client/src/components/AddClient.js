import React, {useEffect, useState} from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Axios from "axios";
import {useSnackbar} from "notistack";
import {useHistory} from "react-router";
import FormControl from '@mui/material/FormControl';



const server = 'https://localhost:3005';

export default function AddClient() {
    const history = useHistory();
    const {enqueueSnackbar} = useSnackbar();
    const headers = {
      "x-access-token": localStorage.getItem("token"),
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        Axios.post(
          server + "/clients/addClient",
          {
            firstName: data.get("firstName"),
            lastName: data.get("lastName"),
            product: data.get("product"),
          },
          { headers: headers }
        )
          .then((response) => {
            enqueueSnackbar(response.data, { variant: "success" });
            history.push("/Home");
          })
          .catch((error) => {
            const massage = error.response
              ? error.response.data
              : "Network Error";
            enqueueSnackbar(massage, { variant: "error" });
          });
    };


    return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <AccountCircleIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Add Client
            </Typography>

            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    variant="filled"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    variant="filled"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="product"
                    label="Product"
                    name="product"
                    variant="filled"
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl variant="filled">
                  </FormControl>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Add Client
              </Button>
            </Box>
          </Box>
        </Container>
    );
}
