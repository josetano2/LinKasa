import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import theme from "../lib/theme";
// import { mainListItems } from '../components/dashboard_items/dashboard-items';
import CreateAccount from "./dashboard_page/hrd_dashboard/create-account";
import { AppBar, Fab } from "@mui/material";
import HrdDashboard from "./dashboard_page/hrd_dashboard/hrd-dashboard";
import { DashboardItems } from "./dashboard_page/dashboard-items";
import { DashboardConfig } from "../controller/dashboard-config";
import { firestore } from "../lib/firebase-database";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import AirportDirectorDashboard from "./dashboard_page/airport_director_dashboard/airport-director-dashboard";
import Button from "@mui/material/Button";
import Image from "next/image";
import Clock from "../components/clock";
import NavBar from "../components/navbar";
import { getStaffRole } from "../controller/staff-controller";

const drawerWidth: number = 260;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));


export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const [content, setContent] = React.useState(null);

  const staffRole = getStaffRole();

  const changeContent = (contentKey) => {
    setContent(contentKey);
  };

  const renderContent = () => {
    const ContentToRender = staffRole
      ? DashboardConfig[staffRole]!!!!!!?.components[content]
      : null;
    return ContentToRender ? <ContentToRender /> : null;
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <CssBaseline />
        <Drawer
          variant="permanent"
          open={open}
          sx={{
            "& .MuiDrawer-paper": {
              bgcolor: "primary.main",
            },
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                pt: 1,
                gap: "0.5rem",
                pr: 1,
              }}
            >
              <Image
                src="/images/logo.png"
                alt="Logo image"
                width="45px"
                height="45px"
              />
              <Typography
                fontSize={30}
                fontWeight="bold"
                sx={{ color: "#cccccc" }}
              >
                LinKasa
              </Typography>
            </Box>
          </Toolbar>
          <List
            sx={{
              height: "100%",
              overflowX: "hidden",
            }}
            component="nav"
          >
            <DashboardItems role={staffRole} changeContent={changeContent} />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <NavBar />
          {renderContent()}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
