import {
  Container,
  Fab,
  Grid,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  TextField,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import { firestore } from "../../../lib/firebase-database";
import {
  getAirplanes,
  getAvailableAirplane,
} from "../../../controller/airplane-controller";
import { airports } from "../../../controller/variable-controller";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import ViewScheduledFlights from "./view-scheduled-flight";
import { ThemeProvider } from "@emotion/react";
import theme from "../../../lib/theme";
import { getStaffRole } from "../../../controller/staff-controller";

export default function ScheduledFlights() {
  const staffRole = getStaffRole();

  const [open, setOpen] = useState(false);
  const airplanes = getAirplanes();

  const initialScheduledFlights = {
    airplaneTailNumber: "",
    flightNumber: "",
    gate: "",
    terminal: "",
    flightStatus: "On Time",
    departureTime: Timestamp.now(),
    arrivalTime: Timestamp.now(),
    origin: "",
    destination: "",
    seats: [],
    pilot: "",
    crews: [],
  };

  const [scheduledFlights, setScheduledFlights] = useState<ScheduledFlights>(
    initialScheduledFlights as ScheduledFlights
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setScheduledFlights((prevAirplane) => ({
      ...prevAirplane,
      [name]: value,
    }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const {
      airplaneTailNumber,
      flightNumber,
      gate,
      terminal,
      flightStatus,
      departureTime,
      arrivalTime,
      origin,
      destination,
      seats,
      pilot,
      crews,
    } = scheduledFlights;

    const batch = writeBatch(firestore);

    const scheduledFlightsRef = collection(firestore, "scheduled-flights");
    const newScheduledFlightRef = doc(scheduledFlightsRef);

    let data = {
      airplaneTailNumber: airplaneTailNumber,
      flightNumber: flightNumber,
      gate: gate,
      terminal: terminal,
      flightStatus: flightStatus,
      departureTime: departureTime,
      arrivalTime: arrivalTime,
      origin: origin,
      destination: destination,
      seats: seats,
      pilot: pilot,
      crews: crews,
    };
    batch.set(newScheduledFlightRef, data);

    const airplaneRef = collection(firestore, "airplane");
    const q = query(airplaneRef, where("tailNumber", "==", airplaneTailNumber));

    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const airplaneDocRef = querySnapshot.docs[0].ref;
        batch.update(airplaneDocRef, { status: "Not Available" });
      } else {
        throw new Error("Not Found");
      }
      batch.commit();
    } catch (error) {
      console.log(error);
    }

    closeDialog();
  };

  const openDialog = () => {
    setScheduledFlights(initialScheduledFlights as ScheduledFlights);
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ mt: 2, mb: 4, position: "relative" }}>
        <ViewScheduledFlights />
        {staffRole && staffRole === "Flight Operation Manager" ? (
          <>
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
          </>
        ) : (
          <></>
        )}

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
                name="airplaneTailNumber"
                label="Airplane"
                select
                fullWidth
                required
                value={scheduledFlights.airplaneTailNumber}
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
                {airplanes &&
                  airplanes.map((airplane, index) => (
                    <MenuItem
                      key={index}
                      value={airplane.tailNumber}
                      disabled={airplane.status !== "Available"}
                      sx={{
                        color:
                          airplane.status === "Available"
                            ? theme.palette.text.primary
                            : theme.palette.text.secondary,
                      }}
                    >
                      {airplane.tailNumber} - {airplane.airline}
                    </MenuItem>
                  ))}
              </TextField>
              <TextField
                required
                fullWidth
                name="flightNumber"
                label="Flight Number"
                type="text"
                id="flightNumber"
                autoComplete="flightNumber"
                onChange={handleChange}
                value={scheduledFlights.flightNumber}
              />
              <TextField
                required
                fullWidth
                name="gate"
                label="Gate"
                type="text"
                id="gate"
                autoComplete="gate"
                onChange={handleChange}
                value={scheduledFlights.gate}
              />
              <TextField
                required
                fullWidth
                name="terminal"
                label="Terminal"
                type="text"
                id="terminal"
                autoComplete="terminal"
                onChange={handleChange}
                value={scheduledFlights.terminal}
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  sx={{
                    width: "100%",
                  }}
                  label="Departure Time"
                  value={scheduledFlights.departureTime}
                  onChange={(newValue) => {
                    setScheduledFlights((prev) => ({
                      ...prev,
                      departureTime: newValue,
                    }));
                  }}
                />
                <DateTimePicker
                  sx={{
                    width: "100%",
                  }}
                  label="Arrival Time"
                  value={scheduledFlights.arrivalTime}
                  onChange={(newValue) => {
                    setScheduledFlights((prev) => ({
                      ...prev,
                      arrivalTime: newValue,
                    }));
                  }}
                />
              </LocalizationProvider>
              <TextField
                name="origin"
                label="Origin"
                select
                fullWidth
                required
                value={scheduledFlights.origin}
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
                {airports.map((airport, index) => (
                  <MenuItem key={index} value={airport.code}>
                    {airport.code}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                name="destination"
                label="Destination"
                select
                fullWidth
                required
                value={scheduledFlights.destination}
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
                {airports.map((airport, index) => (
                  <MenuItem key={index} value={airport.code}>
                    {airport.code}
                  </MenuItem>
                ))}
              </TextField>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={handleAdd}
              >
                Add Schedule
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
}
