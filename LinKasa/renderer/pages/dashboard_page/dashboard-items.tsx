import React from 'react';
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import DashboardConfig from "../../controller/dashboard-config";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import { red } from "@mui/material/colors";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase-database";
import { useRouter } from "next/router";
import { Box, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import useAuth from "../../lib/auth-detail";


export const DashboardItems = ({ role, changeContent }) => {
  const menuItems = DashboardConfig[role]?.menu;
  const router = useRouter();
  const theme = useTheme();
  const [activeItem, setActiveItem] = React.useState(null);
  const { staffDetails } = useAuth();

  React.useEffect(() => {
    if (staffDetails?.role) {
      const defaultMenu = DashboardConfig[staffDetails.role]?.defaultContentKey;
      setActiveItem(defaultMenu);
      changeContent(defaultMenu);
    }
  }, [staffDetails]);

  const handleActiveItem = (item) => {
    setActiveItem(item.contentKey);
    changeContent(item.contentKey);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        router.push("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (!menuItems) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <Box>
        <Box
          sx={{
            padding: "1rem",
          }}
        >
          <Paper
            sx={{
              backgroundColor: theme.palette.secondary.main,
              padding: "0.5rem",
              wordWrap: "break-word",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography fontSize={14}>{staffDetails?.name || ""}</Typography>
            <Typography fontSize={12}>({staffDetails?.role || ""} )</Typography>
          </Paper>
        </Box>
        {menuItems.map((item, index) => (
          <ListItemButton
            key={index}
            selected={activeItem === item.contentKey}
            onClick={() => handleActiveItem(item)}
            sx={{
              color:
                activeItem === item.contentKey
                  ? theme.palette.text.primary
                  : theme.palette.text.secondary,
              "&.Mui-selected": {
                color: "common.white",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color:
                  activeItem === item.contentKey
                    ? "common.white"
                    : theme.palette.text.secondary,
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </Box>
      <Box>
        <ListItemButton sx={{ color: red[500] }} onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon sx={{ color: red[500] }} />
          </ListItemIcon>
          <ListItemText primary="Log Out" />
        </ListItemButton>
      </Box>
    </Box>
  );
};

export default DashboardItems;
