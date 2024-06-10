import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1b1f24",
    },
    secondary: {
      main: "#8d9596",
    },
    error: {
      main: red.A400,
    },
    text: {
      primary: "#000000",
      secondary: "#8d9596",
    },
  },
  typography: {
    fontFamily: ["Plus Jakarta Sans", "IBM Plex Sans"].join(","),
  },
});

export default theme;
