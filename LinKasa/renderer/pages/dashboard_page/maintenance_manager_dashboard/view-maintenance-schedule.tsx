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
import { facilityStatus } from "../../../controller/variable-controller";
import { getStaffRole } from "../../../controller/staff-controller";

export default function ViewMaintenanceSchedule() {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const role = getStaffRole();

  useEffect(() => {
    const facilityRef = collection(firestore, "facility");
    const q = query(facilityRef);
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let facilityArr = [];
      QuerySnapshot.forEach((doc) => {
        facilityArr.push({ ...doc.data(), id: doc.id });
      });
      setFacilities(facilityArr);
    });

    return () => unsubscribe();
  }, []);

  // maintenance schedule
  const [selectedFacility, setSelectedFacility] = useState<Facility>({
    name: "",
    description: "",
    status: "Available",
    maintenanceSchedule: null,
    maintenanceCheckSchedule: null,
  });
  const [open, setOpen] = useState(false);
  const [facilityID, setFacilityID] = useState("");

  const handleUpdate = async () => {
    if (facilityID) {
      console.log(selectedFacility);
      const facilityRef = doc(firestore, "facility", facilityID);

      try {
        await updateDoc(facilityRef, {
          maintenanceSchedule: selectedFacility.maintenanceSchedule,
          status: selectedFacility.status,
        });
        closeDialog();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDelete = async () => {
    if (!selectedFacility.maintenanceSchedule) {
      return;
    }

    if (facilityID) {
      const facilityRef = doc(firestore, "facility", facilityID);

      try {
        await updateDoc(facilityRef, {
          maintenanceSchedule: null,
        });
        closeDialog();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const openDialog = (facility) => {
    setOpen(true);
    setFacilityID(facility.id);
    setSelectedFacility({
      ...facility,
      maintenanceSchedule: facility.maintenanceSchedule
        ? facility.maintenanceSchedule.toDate()
        : null,
    });
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedFacility((prevFacility) => ({
      ...prevFacility,
      [name]: value,
    }));
  };

  if (facilities.length == 0) {
    return <Box>Airplane list is empty!</Box>;
  } else {
    return (
      <ThemeProvider theme={theme}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: theme.palette.primary.main }}>
                <TableCell sx={{ color: "white" }} align="center">
                  Name
                </TableCell>
                <TableCell sx={{ color: "white" }} align="center">
                  Maintenance
                </TableCell>
                <TableCell sx={{ color: "white" }} align="center">
                  Maintenance Check
                </TableCell>
                <TableCell sx={{ color: "white" }} align="center">
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {facilities.map((facility) => (
                <TableRow
                  sx={{
                    cursor: "pointer",
                  }}
                  onClick={() => openDialog(facility)}
                >
                  <TableCell align="center">{facility.name}</TableCell>
                  <TableCell align="center">
                    {facility.maintenanceSchedule
                      ? facility.maintenanceSchedule
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
                    {facility.maintenanceCheckSchedule
                      ? facility.maintenanceCheckSchedule
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
                          facility.status === "Available"
                            ? "#52ff52"
                            : "#ff5252",
                        borderRadius: "5rem",
                        height: "2rem",
                        alignItems: "center",
                        justifyContent: "center",
                        display: "flex",
                        color:
                          facility.status === "Available"
                            ? "#006900"
                            : "#690000",
                      }}
                    >
                      {facility.status}
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
                  label="Maintenance Schedule"
                  value={selectedFacility.maintenanceSchedule}
                  onChange={(newValue) => {
                    setSelectedFacility((prev) => ({
                      ...prev,
                      maintenanceSchedule: newValue,
                    }));
                  }}
                />
              </LocalizationProvider>
              {role === "Maintenance Manager" && (
                <TextField
                  name="status"
                  label="Status"
                  select
                  fullWidth
                  required
                  value={selectedFacility.status}
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
                  {facilityStatus.map((status, index) => (
                    <MenuItem key={index} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </TextField>
              )}
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
                Update
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
                Delete
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      </ThemeProvider>
    );
  }
}
