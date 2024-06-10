import { ThemeProvider } from "@emotion/react";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { collection, query, onSnapshot, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { firestore } from "../../../lib/firebase-database";
import theme from "../../../lib/theme";
import {
  crewRoles,
  crewStatus,
  airlines,
} from "../../../controller/variable-controller";

export default function ViewFlightCrew() {
  const [open, setOpen] = useState(false);
  const [flightCrews, setFlightCrews] = useState<FlightCrew[]>([]);
  const [selectedFlightCrew, setSelectedFlightCrew] = useState<FlightCrew>({
    name: "",
    role: "Cabin Crew",
    status: "Active",
    airline: "",
  });
  const [selectedID, setSelectedID] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedFlightCrew((prevCrew) => ({
      ...prevCrew,
      [name]: value,
    }));
  };

  useEffect(() => {
    const crewRef = collection(firestore, "flight-crews");
    const q = query(crewRef);

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let crewArr = [];
      QuerySnapshot.forEach((doc) => {
        crewArr.push({ ...doc.data(), id: doc.id });
      });
      setFlightCrews(crewArr);
    });
    return () => unsubscribe();
  }, []);

  const handleUpdate = async () => {
    if (selectedID) {
      const crewRef = doc(firestore, "flight-crews", selectedID);

      try {
        await updateDoc(crewRef, {
            name: selectedFlightCrew.name,
            role: selectedFlightCrew.role,
            status: selectedFlightCrew.status,
            airline: selectedFlightCrew.airline,
        });
        closeDialog();
      } catch (error) {

      }
    }
  };

  const handleDelete = async () => {
    if(selectedID){
        const crewRef = doc(firestore, "flight-crews", selectedID);
      try {
        await deleteDoc(crewRef);
        closeDialog();
      } catch (error) {
        
      }
    }
  }

  const openDialog = (crew) => {
    setOpen(true);
    setSelectedID(crew.id);
    setSelectedFlightCrew({
      ...crew,
    });
  };

  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: theme.palette.primary.main }}>
                <TableCell sx={{ color: "white" }} align="center">
                  Crew Name
                </TableCell>
                <TableCell sx={{ color: "white" }} align="center">
                  Role
                </TableCell>
                <TableCell sx={{ color: "white" }} align="center">
                  Airline
                </TableCell>
                <TableCell sx={{ color: "white" }} align="center">
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {flightCrews.map((crew) => (
                <TableRow
                  sx={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    openDialog(crew);
                  }}
                >
                  <TableCell sx={{ textAlign: "center" }}>
                    {crew.name}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {crew.role}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {crew.airline}
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor:
                          crew.status === "Active" ? "#52ff52" : "#ff5252",
                        borderRadius: "5rem",
                        height: "2rem",
                        alignItems: "center",
                        justifyContent: "center",
                        display: "flex",
                        color: crew.status === "Active" ? "#006900" : "#690000",
                      }}
                    >
                      {crew.status}
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
              <TextField
                required
                fullWidth
                name="name"
                label="Name"
                type="text"
                id="name"
                autoComplete="name"
                onChange={handleChange}
                value={selectedFlightCrew.name}
              />
              <TextField
                name="role"
                label="Role"
                select
                fullWidth
                required
                value={selectedFlightCrew.role}
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
                {crewRoles.map((crewRole, index) => (
                  <MenuItem key={index} value={crewRole}>
                    {crewRole}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                name="status"
                label="Status"
                select
                fullWidth
                required
                value={selectedFlightCrew.status}
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
                {crewStatus.map((status, index) => (
                  <MenuItem key={index} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                name="airline"
                label="Airline"
                select
                fullWidth
                required
                value={selectedFlightCrew.airline}
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
                Update Flight Crew
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
                Delete Flight Crew
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}
