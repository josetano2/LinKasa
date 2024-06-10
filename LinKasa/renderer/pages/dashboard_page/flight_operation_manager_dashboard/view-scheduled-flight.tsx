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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  MenuItem,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import {
  Timestamp,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import { firestore } from "../../../lib/firebase-database";
import InfoIcon from "@mui/icons-material/Info";
import CreateIcon from "@mui/icons-material/Create";
import { ThemeProvider } from "@emotion/react";
import theme from "../../../lib/theme";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  airports,
  flightStatus,
} from "../../../controller/variable-controller";
import { getAirplanes } from "../../../controller/airplane-controller";
import { getStaffRole } from "../../../controller/staff-controller";

export default function ViewScheduledFlights() {
  // var
  const staffRole = getStaffRole();
  const [open, setOpen] = useState(false);
  const airplanes = getAirplanes();
  const [scheduledFlights, setScheduledFlights] = useState<ScheduledFlights[]>(
    []
  );
  const [selectedScheduledFlight, setSelectedScheduledFlight] =
    useState<ScheduledFlights>({
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
    });

  // func
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedScheduledFlight((prevAirplane) => ({
      ...prevAirplane,
      [name]: value,
    }));
  };

  const openDialog = (flight) => {
    setOpen(true);
    setSelectedScheduledFlight({
      ...flight,
      departureTime: flight.departureTime.toDate(),
      arrivalTime: flight.arrivalTime.toDate(),
    });
    console.log(flight);
  };

  const closeDialog = () => {
    setOpen(false);
  };
  
  const handleUpdate = async (scheduledFlight) => {
    const batch = writeBatch(firestore);
    const scheduledFlightsRef = collection(firestore, "scheduled-flights");
    const airplaneRef = collection(firestore, "airplane");

    const q = query(
      scheduledFlightsRef,
      where("flightNumber", "==", scheduledFlight.flightNumber)
    );

    console.log(scheduledFlight.flightNumber);
    try {
      const scheduleFlightSnapshot = await getDocs(q);

      if (!scheduleFlightSnapshot.empty) {
        const dbScheduledFlight = scheduleFlightSnapshot.docs[0].data();

        if (
          dbScheduledFlight.airplaneTailNumber !==
          scheduledFlight.airplaneTailNumber
        ) {
          const prevAirplaneDoc = await getDocs(
            query(
              airplaneRef,
              where("tailNumber", "==", dbScheduledFlight.airplaneTailNumber)
            )
          );
          if (!prevAirplaneDoc.empty) {
            batch.update(prevAirplaneDoc.docs[0].ref, { status: "Available" });
          }
          const newAirplaneDoc = await getDocs(
            query(
              airplaneRef,
              where("tailNumber", "==", scheduledFlight.airplaneTailNumber)
            )
          );
          if (!newAirplaneDoc.empty) {
            batch.update(newAirplaneDoc.docs[0].ref, {
              status: "Not Available",
            });
          }
        }

        batch.update(scheduleFlightSnapshot.docs[0].ref, scheduledFlight);
        await batch.commit();
        closeDialog();
      }
    } catch (error) {}
  };

  const handleDelete = async (scheduledFlight) => {
    console.log(scheduledFlight.airplaneTailNumber);
    const batch = writeBatch(firestore);
    const scheduledFlightsRef = collection(firestore, "scheduled-flights");
    const q1 = query(
      scheduledFlightsRef,
      where("flightNumber", "==", scheduledFlight.flightNumber)
    );

    try {
      const scheduleFlightSnapshot = await getDocs(q1);

      if (!scheduleFlightSnapshot.empty) {
        const scheduledFlightDocRef = scheduleFlightSnapshot.docs[0].ref;

        const airplaneRef = collection(firestore, "airplane");
        const q2 = query(
          airplaneRef,
          where("tailNumber", "==", scheduledFlight.airplaneTailNumber)
        );

        try {
          const airplaneSnapshot = await getDocs(q2);
          if (!airplaneSnapshot.empty) {
            const airplaneDocRef = airplaneSnapshot.docs[0].ref;
            batch.update(airplaneDocRef, { status: "Available" });
          }
        } catch (error) {}

        batch.delete(scheduledFlightDocRef);
        batch.commit();
      }
    } catch (error) {
      console.error("Error performing batch operation: ", error);
    }
  };

  useEffect(() => {
    const scheduledFlightsRef = collection(firestore, "scheduled-flights");
    const q = query(scheduledFlightsRef);
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let scheduledFlightsArr = [];
      QuerySnapshot.forEach((doc) => {
        scheduledFlightsArr.push({ ...doc.data(), id: doc.id });
      });
      setScheduledFlights(scheduledFlightsArr);
    });

    return () => unsubscribe();
  }, []);

  const repeatedScheduledFlights = [].concat(
    ...Array(20).fill(scheduledFlights)
  );

  if (scheduledFlights.length == 0) {
    return <Box></Box>;
  } else {
    return (
      <ThemeProvider theme={theme}>
        <Box>
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
                  value={selectedScheduledFlight.airplaneTailNumber}
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
                        disabled={
                          airplane.status !== "Available" &&
                          airplane.tailNumber !==
                            selectedScheduledFlight.airplaneTailNumber
                        }
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
                  value={selectedScheduledFlight.flightNumber}
                  InputProps={{
                    readOnly: true,
                  }}
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
                  value={selectedScheduledFlight.gate}
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
                  value={selectedScheduledFlight.terminal}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    sx={{
                      width: "100%",
                    }}
                    label="Departure Time"
                    value={selectedScheduledFlight.departureTime}
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
                    value={selectedScheduledFlight.arrivalTime}
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
                  value={selectedScheduledFlight.origin}
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
                  value={selectedScheduledFlight.destination}
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
                  name="flightStatus"
                  label="Flight Status"
                  select
                  fullWidth
                  required
                  value={selectedScheduledFlight.flightStatus}
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
                  {flightStatus.map((status, index) => (
                    <MenuItem key={index} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </TextField>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  onClick={() => handleUpdate(selectedScheduledFlight)}
                >
                  Update Schedule
                </Button>
              </Box>
            </DialogContent>
          </Dialog>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow sx={{backgroundColor: theme.palette.primary.main}}>
                  <TableCell sx={{color: "white"}} align="center">Flight Number</TableCell>
                  <TableCell sx={{color: "white"}} align="center">Airplane</TableCell>
                  <TableCell sx={{color: "white"}} align="center">Origin</TableCell>
                  <TableCell sx={{color: "white"}} align="center">Destination</TableCell>
                  <TableCell sx={{color: "white"}} align="center">Departure Time</TableCell>
                  <TableCell sx={{color: "white"}} align="center">Arrival Time</TableCell>
                  <TableCell sx={{color: "white"}}align="center">Flight Status</TableCell>
                  {staffRole && staffRole === "Flight Operation Manager" ? (
                    <>
                      <TableCell align="left"></TableCell>
                      <TableCell align="left"></TableCell>
                    </>
                  ) : (
                    <></>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {scheduledFlights.map((sf) => (
                  <TableRow>
                    <TableCell sx={{ textAlign: "center" }}>
                      {sf.flightNumber}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {sf.airplaneTailNumber}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {sf.origin}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {sf.destination}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {sf.departureTime.toDate().toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {sf.arrivalTime.toDate().toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: "center",
                      }}
                    >
                      <Box
                        sx={{
                          backgroundColor:
                            sf.flightStatus === "On Time" ||
                            sf.flightStatus === "Arrived"
                              ? "#52ff52"
                              : sf.flightStatus === "Delayed" ||
                                sf.flightStatus === "Cancelled"
                              ? "#ff5252"
                              : "#ffd752",
                          borderRadius: "5rem",
                          height: "2rem",
                          alignItems: "center",
                          justifyContent: "center",
                          display: "flex",
                          color:
                            sf.flightStatus === "On Time" ||
                            sf.flightStatus === "Arrived"
                              ? "#006900"
                              : sf.flightStatus === "Delayed" ||
                                sf.flightStatus === "Cancelled"
                              ? "#690000"
                              : "#694200",
                        }}
                      >
                        {sf.flightStatus}
                      </Box>
                    </TableCell>
                    {staffRole && staffRole === "Flight Operation Manager" ? (
                      <>
                        {" "}
                        <TableCell sx={{ textAlign: "center" }}>
                          <CreateIcon
                            sx={{
                              cursor: "pointer",
                            }}
                            onClick={() => openDialog(sf)}
                          />
                        </TableCell>
                        <TableCell sx={{ textAlign: "center" }}>
                          <DeleteOutlineIcon
                            sx={{
                              cursor: "pointer",
                              color: "red",
                            }}
                            onClick={() => handleDelete(sf)}
                          />
                        </TableCell>{" "}
                      </>
                    ) : (
                      <></>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </ThemeProvider>
    );
  }
}
