import { Box, Container } from "@mui/material";
import Clock from "./clock";
import { ThemeProvider } from "@emotion/react";
import theme from "../lib/theme";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function NavBar() {
  return (
    <ThemeProvider theme={theme}>
      <Container
        sx={{
          padding: 1.5,
          position: "sticky",
          top: 0,
          zIndex: 999,
          backgroundColor: "rgba(245, 245, 245, 0.1)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        <Box
          sx={{
            margin: 0,
            display: "flex",
            justifyContent: "space-between"
          }}
        >
            <Clock />
            <AccountCircleIcon />
        </Box>
      </Container>
    </ThemeProvider>
  );
}
