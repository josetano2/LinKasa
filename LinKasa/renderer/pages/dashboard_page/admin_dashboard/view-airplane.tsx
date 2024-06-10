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
  onSnapshot,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../../../lib/firebase-database";

export default function ViewAirplane() {
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

  if (airplanes.length == 0) {
    return <Box>Airplane list is empty!</Box>;
  } else {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell align="center">Tail Number</TableCell>
              <TableCell align="center">Airline</TableCell>
              <TableCell align="center">Model</TableCell>
              <TableCell align="center">Capacity</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {airplanes.map((airplane) => (
              <TableRow>
                <TableCell>{airplane.tailNumber}</TableCell>
                <TableCell>{airplane.airline}</TableCell>
                <TableCell>{airplane.model}</TableCell>
                <TableCell>{airplane.capacity}</TableCell>
                <TableCell>{airplane.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
