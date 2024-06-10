import {
  Alert,
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Snackbar,
  TextField,
  Typography,
  createTheme,
} from "@mui/material";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Image from "next/image";
import React, { useState } from "react";
import { auth } from "../lib/firebase-database";
import { Router, useRouter } from "next/router";
import { ThemeProvider } from "@emotion/react";
import Link from "../components/Link";
import Paper from "@mui/material/Paper";
import theme from "../lib/theme";
import { getStaffFromID } from "../controller/staff-controller";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        LinKasa
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleLogin = () => {
    if (email == "" || password == "") {
      setOpenSnackbar(true);
      setSnackbarMessage("Email and password field must be filled!");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then(async (account) => {
        const staffID = account.user.uid;
        router.push({
          pathname: '/dashboard',
          query: { staffID: staffID },
        })
        // const staffData = await getStaffFromID(staffID);
        // if (staffData && staffData.role) {
        //   sessionStorage.setItem("staffID", staffID);
        //   sessionStorage.setItem("staffRole", staffData.role);
        // }
        // router.push("/dashboard");
      })
      .catch(() => {
        setOpenSnackbar(true);
        setSnackbarMessage("Invalid Credential!");
        setPassword("");
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://w.forfun.com/fetch/f4/f4f8c3c6d0924f3c9c6a12439666c5dd.jpeg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Image
              src="/images/logo.png"
              alt="Logo image"
              width="100px"
              height="100px"
            />
            <Typography component="h1" variant="h2" fontWeight="bold">
              LinKasa
            </Typography>
            <Box sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => handleLogin()}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item></Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="error">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
