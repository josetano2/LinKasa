import { ThemeProvider } from "@emotion/react";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  Fab,
  MenuItem,
  TextField,
} from "@mui/material";
import theme from "../../../lib/theme";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import {
  airlines,
  airports,
  crewRoles,
  crewStatus,
} from "../../../controller/variable-controller";
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "../../../lib/firebase-database";
import ViewFlightCrew from "./view-flight-crew";

export default function FlightCrew() {
  const initialFlightCrew = {
    name: "",
    role: "Cabin Crew",
    status: "Active",
    airline: "",
  };

  const [open, setOpen] = useState(false);
  const [flightCrew, setFlightCrew] = useState<FlightCrew>(
    initialFlightCrew as FlightCrew
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFlightCrew((prevCrew) => ({
      ...prevCrew,
      [name]: value,
    }));
  };

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const { name, role, status, airline } = flightCrew;
    const crewRef = collection(firestore, "flight-crews");
    let data = {
      name: name,
      role: role,
      status: status,
      airline: airline,
    };

    try {
      addDoc(crewRef, data);
    } catch (error) {
      console.log(error);
    }
    setFlightCrew(initialFlightCrew as FlightCrew);
    closeDialog();
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ mt: 2, mb: 4, position: "relative" }}>
        <Fab
          sx={{
            position: "fixed",
            bottom: 32,
            right: 32,
          }}
          onClick={openDialog}
        >
          <AddIcon />
        </Fab>
        <ViewFlightCrew />
        <Dialog open={open} onClose={closeDialog}>
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                width: "100%",
                ".MuiTextField-root": {
                  mb: 1.5,
                },
              }}
            >
              <TextField
                required
                fullWidth
                name="name"
                label="Name"
                type="text"
                id="name"
                autoComplete="name"
                onChange={handleChange}
                value={flightCrew.name}
              />
              <TextField
                name="role"
                label="Role"
                select
                fullWidth
                required
                value={flightCrew.role}
                onChange={handleChange}
                SelectProps={{
                  MenuProps: {
                    PaperProps: {
                      style: {
                        maxHeight: 200,
                      },
                    },
                  },
                }}
              >
                {crewRoles.map((crewRole, index) => (
                  <MenuItem key={index} value={crewRole}>
                    {crewRole}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                name="status"
                label="Status"
                select
                fullWidth
                required
                value={flightCrew.status}
                onChange={handleChange}
                SelectProps={{
                  MenuProps: {
                    PaperProps: {
                      style: {
                        maxHeight: 200,
                      },
                    },
                  },
                }}
              >
                {crewStatus.map((status, index) => (
                  <MenuItem key={index} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                name="airline"
                label="Airline"
                select
                fullWidth
                required
                value={flightCrew.airline}
                onChange={handleChange}
                SelectProps={{
                  MenuProps: {
                    PaperProps: {
                      style: {
                        maxHeight: 200,
                      },
                    },
                  },
                }}
              >
                {airlines.map((airline, index) => (
                  <MenuItem key={index} value={airline}>
                    {airline}
                  </MenuItem>
                ))}
              </TextField>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={handleAdd}
              >
                Add Flight Crew
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
}
