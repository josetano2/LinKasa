import { ThemeProvider } from "@emotion/react";
import {
  Box,
  Container,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import theme from "../../../lib/theme";
import { getAllFlight } from "../../../controller/flight-controller";
import { crewRoles } from "../../../controller/variable-controller";
import flightCrew from "./flight-crew";
import { useEffect, useState } from "react";
import {
  Timestamp,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  getAllCabinCrew,
  getAllPilot,
} from "../../../controller/crew-controller";
import { firestore } from "../../../lib/firebase-database";

export default function AssignFlightCrew() {
  const flights = getAllFlight();
  const cabinCrews = getAllCabinCrew();
  const pilots = getAllPilot();
  const [selectedFlight, setSelectedFlight] = useState(null);

  const handleChange = (e) => {
    const flight = flights.find((f) => f.flightNumber === e.target.value);
    setSelectedFlight(flight);
  };

  const handleCrewSelection = (crew) => {
    console.log(crew.id);
    if (selectedFlight) {
      if (crew.role === "Pilot") {
        const updatedFlight = { ...selectedFlight, pilot: crew.id };

        setSelectedFlight(updatedFlight);
        updateFlight(updatedFlight);
      } else if (crew.role === "Cabin Crew") {
        let updatedCrews;
        if (selectedFlight.crews.includes(crew.id)) {
          updatedCrews = selectedFlight.crews.filter((id) => id !== crew.id);
        } else {
          updatedCrews = [...selectedFlight.crews, crew.id];
        }
        const updatedFlight = { ...selectedFlight, crews: updatedCrews };
        setSelectedFlight(updatedFlight);
        updateFlight(updatedFlight);
      }
    }
  };

  const updateFlight = async (flight) => {
    const flightsRef = collection(firestore, "scheduled-flights");
    const q = query(
      flightsRef,
      where("flightNumber", "==", flight.flightNumber)
    );

    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const flightDoc = querySnapshot.docs[0];
        await updateDoc(flightDoc.ref, {
          pilot: flight.pilot,
          crews: flight.crews,
        });
      } else {
        console.log("a");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (flights.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ mt: 2, mb: 4, position: "relative" }}>
        No Flight!
      </Container>
    );
  } else {
    return (
      <ThemeProvider theme={theme}>
        <Container maxWidth="lg" sx={{ mt: 2, mb: 4, position: "relative" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "25%",
                gap: 2,
              }}
            >
              <Typography variant="h5" color="initial">
                1. Select Flight
              </Typography>
              <TextField
                name="flights"
                label="Flights"
                select
                fullWidth
                required
                value={selectedFlight ? selectedFlight.flightNumber : ""}
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
                {flights.map((flight, index) => (
                  <MenuItem key={index} value={flight.flightNumber}>
                    {flight.flightNumber}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            {selectedFlight && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <Typography variant="h5" color="initial">
                  2. Select Crew
                </Typography>
                <Typography variant="h5" color="initial">
                  Select Pilot
                </Typography>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                      <TableRow
                        sx={{ backgroundColor: theme.palette.primary.main }}
                      >
                        <TableCell sx={{ color: "white" }} align="center">
                          Crew Name
                        </TableCell>
                        <TableCell sx={{ color: "white" }} align="center">
                          Role
                        </TableCell>
                        <TableCell sx={{ color: "white" }} align="center">
                          Airline
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {pilots.map((pilot) => (
                        <TableRow
                          sx={{
                            cursor: "pointer",
                            transition: 'background-color 0.3s ease',
                            backgroundColor:
                              selectedFlight?.pilot === pilot.id
                                ? "#90ee90"
                                : "none",
                          }}
                          onClick={() => handleCrewSelection(pilot)}
                        >
                          <TableCell sx={{ textAlign: "center" }}>
                            {pilot.name}
                          </TableCell>
                          <TableCell sx={{ textAlign: "center" }}>
                            {pilot.role}
                          </TableCell>
                          <TableCell sx={{ textAlign: "center" }}>
                            {pilot.airline}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Typography variant="h5" color="initial">
                  Select Cabin Crew
                </Typography>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                      <TableRow
                        sx={{ backgroundColor: theme.palette.primary.main }}
                      >
                        <TableCell sx={{ color: "white" }} align="center">
                          Crew Name
                        </TableCell>
                        <TableCell sx={{ color: "white" }} align="center">
                          Role
                        </TableCell>
                        <TableCell sx={{ color: "white" }} align="center">
                          Airline
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cabinCrews.map((cc) => (
                        <TableRow
                          sx={{
                            cursor: "pointer",
                            transition: 'background-color 0.3s ease',
                            backgroundColor:
                              selectedFlight &&
                              selectedFlight.crews.includes(cc.id)
                                ? "#90ee90"
                                : "none",
                          }}
                          onClick={() => handleCrewSelection(cc)}
                        >
                          <TableCell sx={{ textAlign: "center" }}>
                            {cc.name}
                          </TableCell>
                          <TableCell sx={{ textAlign: "center" }}>
                            {cc.role}
                          </TableCell>
                          <TableCell sx={{ textAlign: "center" }}>
                            {cc.airline}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}
          </Box>
        </Container>
      </ThemeProvider>
    );
  }
}
