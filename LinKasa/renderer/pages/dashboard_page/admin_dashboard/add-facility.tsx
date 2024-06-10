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
import ViewAirplane from "./view-airplane";

export default function AddFacility() {
  const [facility, setFacility] = useState<Facility>({
    name: "",
    description: "",
    status: "Available",
    maintenanceSchedule: null,
    maintenanceCheckSchedule: null,
  });


  const handleAdd = (e) => {
    e.preventDefault();
    const {
      name,
      description,
      status,
    } = facility;
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

  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 4, position: "relative" }}>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Add Facility
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleAdd}
          >
            Add Facility
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
