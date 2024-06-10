import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ThemeProvider,
} from "@mui/material";
import { Timestamp, collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../../lib/firebase-database";
import theme from "../../lib/theme";
import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function FlightInformation() {
  const [open, setOpen] = useState(false);
  const [flightInformation, setFlightInformation] = useState<
    ScheduledFlights[]
  >([]);


  useEffect(() => {
    const flightInfoRef = collection(firestore, "scheduled-flights");
    const q = query(flightInfoRef, orderBy("arrivalTime"));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let scheduledFlightsArr = [];
      QuerySnapshot.forEach((doc) => {
        scheduledFlightsArr.push({ ...doc.data(), id: doc.id });
      });
      setFlightInformation(scheduledFlightsArr);
    });

    return () => unsubscribe();
  }, []);

  if (flightInformation.length == 0) {
    return <Box></Box>;
  } else {
    return (
      <ThemeProvider theme={theme}>
        <Container sx={{ mt: 2, mb: 4 }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow sx={{backgroundColor: theme.palette.primary.main}}>
                  <TableCell sx={{color: "white"}} align="center">Flight Number</TableCell>
                  <TableCell sx={{color: "white"}} align="center">Arrival Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {flightInformation.map((fi) => (
                  <TableRow
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      console.log("Row");
                    }}
                  >
                    <TableCell align="center">{fi.flightNumber}</TableCell>
                    <TableCell align="center">
                      {fi.arrivalTime.toDate().toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </ThemeProvider>
    );
  }
}
