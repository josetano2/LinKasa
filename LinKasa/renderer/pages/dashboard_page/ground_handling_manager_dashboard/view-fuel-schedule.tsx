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
  TextField,
  MenuItem,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import {
  QuerySnapshot,
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../../../lib/firebase-database";
import { ThemeProvider } from "@emotion/react";
import theme from "../../../lib/theme";
import { format } from "date-fns";
import { DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export default function ViewFuelSchedule() {
  const [airplanes, setAirplanes] = useState<Airplane[]>([]);

  useEffect(() => {
    const airplaneRef = collection(firestore, "airplane");
    const q = query(airplaneRef);
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let airplaneArr = [];
      QuerySnapshot.forEach((doc) => {
        airplaneArr.push({ ...doc.data(), id: doc.id });
      });
      setAirplanes(airplaneArr);
    });

    return () => unsubscribe();
  }, []);

  // refueling schedule
  const [selectedAirplane, setSelectedAirplane] = useState<Airplane>({
    tailNumber: "",
    airline: "",
    model: "",
    status: "Available",
    capacity: 0,
    refuelingSchedule: null,
  });
  const [open, setOpen] = useState(false);
  const [airplaneID, setAirplaneID] = useState("");

  const handleUpdate = async () => {
    if (
      !selectedAirplane.refuelingSchedule ||
      selectedAirplane.status == "On Schedule"
    ) {
      return;
    }

    if (airplaneID) {
      const airplaneRef = doc(firestore, "airplane", airplaneID);

      try {
        await updateDoc(airplaneRef, {
          refuelingSchedule: selectedAirplane.refuelingSchedule,
        });
        closeDialog();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDelete = async () => {
    if (!selectedAirplane.refuelingSchedule) {
      return;
    }

    if (airplaneID) {
      const airplaneRef = doc(firestore, "airplane", airplaneID);

      try {
        await updateDoc(airplaneRef, {
          refuelingSchedule: null,
        });
        closeDialog();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const openDialog = (airplane) => {
    setOpen(true);
    setAirplaneID(airplane.id);
    setSelectedAirplane({
      ...airplane,
      refuelingSchedule: airplane.refuelingSchedule
      ? airplane.refuelingSchedule.toDate() 
      : null
    });
  };

  const closeDialog = () => {
    setOpen(false);
  };

  if (airplanes.length == 0) {
    return <Box>Airplane list is empty!</Box>;
  } else {
    return (
      <ThemeProvider theme={theme}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: theme.palette.primary.main }}>
                <TableCell sx={{ color: "white" }} align="center">
                  Tail Number
                </TableCell>
                <TableCell sx={{ color: "white" }} align="center">
                  Airline
                </TableCell>
                <TableCell sx={{ color: "white" }} align="center">
                  Model
                </TableCell>
                <TableCell sx={{ color: "white" }} align="center">
                  Refueling Schedule
                </TableCell>
                <TableCell sx={{ color: "white" }} align="center">
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {airplanes.map((airplane) => (
                <TableRow
                  sx={{
                    cursor: "pointer",
                  }}
                  onClick={() => openDialog(airplane)}
                >
                  <TableCell align="center">{airplane.tailNumber}</TableCell>
                  <TableCell align="center">{airplane.airline}</TableCell>
                  <TableCell align="center">{airplane.model}</TableCell>
                  <TableCell align="center">
                    {airplane.refuelingSchedule
                      ? airplane.refuelingSchedule
                          .toDate()
                          .toLocaleString("en-GB", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                      : "No Schedule"}
                  </TableCell>
                  <TableCell align="center">
                    <Box
                      sx={{
                        backgroundColor:
                          airplane.status === "Available"
                            ? "#52ff52"
                            : "#ff5252",
                        borderRadius: "5rem",
                        height: "2rem",
                        alignItems: "center",
                        justifyContent: "center",
                        display: "flex",
                        color:
                          airplane.status === "Available"
                            ? "#006900"
                            : "#690000",
                      }}
                    >
                      {airplane.status}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  sx={{
                    width: "100%",
                  }}
                  label="Refueling Schedule"
                  value={selectedAirplane.refuelingSchedule}
                  onChange={(newValue) => {
                    setSelectedAirplane((prev) => ({
                      ...prev,
                      refuelingSchedule: newValue,
                    }));
                  }}
                />
              </LocalizationProvider>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disableElevation
                onClick={handleUpdate}
                sx={{
                  mb: 1.5,
                }}
              >
                Update Schedule
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={handleDelete}
                disableElevation
                sx={{
                  backgroundColor: "#ff5252",
                  "&:hover": {
                    backgroundColor: "#c62828",
                  },
                }}
              >
                Delete Schedule
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      </ThemeProvider>
    );
  }
}
