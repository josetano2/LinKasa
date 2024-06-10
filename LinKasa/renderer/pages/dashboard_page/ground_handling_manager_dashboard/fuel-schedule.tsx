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
import ViewFuelSchedule from "./view-fuel-schedule";

export default function FuelSchedule() {

  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 4, position: "relative" }}>
        <Typography sx={{ mb: 2 }} variant="h5" color="initial">
            Select Airplane
        </Typography>
      <ViewFuelSchedule />
    </Container>
  );
}
