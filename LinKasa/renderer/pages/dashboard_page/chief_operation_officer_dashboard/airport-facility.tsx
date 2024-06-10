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
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { airlines } from "../../../controller/variable-controller";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "../../../lib/firebase-database";
import ViewAirportFacility from "./view-airport-facility";

export default function AirportFacility() {
  const [open, setOpen] = useState(false);
  const [facility, setFacility] = useState<Facility>({
    name: "",
    description: "",
    status: "Available",
    maintenanceSchedule: null,
    maintenanceCheckSchedule: null,
  });

  const handleAdd = (e) => {
    e.preventDefault();
    const { name, description, status } = facility;
    const facilityRef = collection(firestore, "facility");

    let data = {
      name: name,
      description: description,
      status: status,
      maintenanceSchedule: null,
      maintenanceCheckSchedule: null,
    };
    try {
      addDoc(facilityRef, data);
      setFacility({
        name: "",
        description: "",
        status: "Available",
        maintenanceSchedule: null,
        maintenanceCheckSchedule: null,
      });
      closeDialog();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFacility((prevFacility) => ({
      ...prevFacility,
      [name]: value,
    }));
  };

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 4, position: "relative" }}>
      <ViewAirportFacility />
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
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              onChange={handleChange}
              value={facility.name}
            />
            <TextField
              required
              fullWidth
              id="description"
              label="Description"
              name="description"
              multiline
              minRows={4}
              autoComplete="description"
              onChange={handleChange}
              value={facility.description}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={handleAdd}
            >
              Add Facility
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Container>
  );
}
