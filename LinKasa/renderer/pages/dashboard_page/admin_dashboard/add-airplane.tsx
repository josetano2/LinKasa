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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { airlines } from "../../../controller/variable-controller";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "../../../lib/firebase-database";
import ViewAirplane from "./view-airplane";

export default function AddAirplane() {
  const [airplane, setAirplane] = useState<Airplane>({
    tailNumber: "",
    airline: "",
    model: "",
    status: "Available",
    capacity: 0,
    refuelingSchedule: null,
  });
  const [open, setOpen] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    const { tailNumber, airline, model, status, capacity } = airplane;
    const airplaneRef = collection(firestore, "airplane");

    let data = {
      tailNumber: tailNumber,
      airline: airline,
      model: model,
      status: status,
      capacity: capacity,
      refuelingSchedule: null
    };
    try {
      addDoc(airplaneRef, data);
    } catch (error) {
      console.log(error);
    }
  };

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAirplane((prevAirplane) => ({
      ...prevAirplane,
      [name]: value,
    }));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 4, position: "relative" }}>
      <ViewAirplane />
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
              "& > *": {
                mb: 1.5,
              },
            }}
          >
            <TextField
              required
              fullWidth
              name="tailNumber"
              label="Tail Number"
              type="text"
              id="tailNumber"
              autoComplete="tail-number"
              onChange={handleChange}
              value={airplane.tailNumber}
            />
            <TextField
              name="airline"
              label="Airline"
              select
              fullWidth
              required
              value={airplane.airline}
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
            <TextField
              required
              fullWidth
              name="model"
              label="Model"
              type="text"
              id="model"
              autoComplete="model"
              onChange={handleChange}
              value={airplane.model}
            />
            <TextField
              required
              fullWidth
              name="capacity"
              label="Capacity"
              type="text"
              id="capacity"
              autoComplete="capacity"
              onChange={handleChange}
              value={airplane.capacity}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={handleAdd}
            >
              Add Airplane
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Container>
  );
}
