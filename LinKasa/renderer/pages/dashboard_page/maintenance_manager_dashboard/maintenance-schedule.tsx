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
    Box, Typography,
  } from "@mui/material";
  import AddIcon from "@mui/icons-material/Add";
  import { useState } from "react";
  import { airlines } from "../../../controller/variable-controller";
  import { addDoc, collection } from "firebase/firestore";
  import { firestore } from "../../../lib/firebase-database";
import ViewMaintenanceSchedule from "./view-maintenance-schedule";

  
  export default function MaintenanceSchedule() {
  
    return (
      <Container maxWidth="lg" sx={{ mt: 2, mb: 4, position: "relative" }}>
          <Typography sx={{ mb: 2 }} variant="h5" color="initial">
              Select Facility
          </Typography>
        <ViewMaintenanceSchedule />
      </Container>
    );
  }
  