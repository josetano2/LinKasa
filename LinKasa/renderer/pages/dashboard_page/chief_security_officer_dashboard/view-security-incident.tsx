import {
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  MenuItem,
  Paper,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { firestore } from "../../../lib/firebase-database";
import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import theme from "../../../lib/theme";
import { lostAndFoundStatus } from "../../../controller/variable-controller";

export default function ViewSecurityIncident() {
  const [securityIncidents, setSecurityIncidents] = useState<
    SecurityIncident[]
  >([]);
  const [open, setOpen] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState<SecurityIncident>({
    title: "",
    description: "",
  });
  const [selectedID, setSelectedID] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedIncident((prevSecurityIncident) => ({
      ...prevSecurityIncident,
      [name]: value,
    }));
  };

  const openDialog = (incident) => {
    setOpen(true);
    setSelectedID(incident.id)
    setSelectedIncident({
      ...incident,
    });
  };

  const closeDialog = () => {
    setOpen(false);
  };

  useEffect(() => {
    const securityIncidentsRef = collection(firestore, "security-incident");

    const unsubscribe = onSnapshot(securityIncidentsRef, (QuerySnapshot) => {
      let incidentArr = [];
      QuerySnapshot.forEach((doc) => {
        incidentArr.push({ ...doc.data(), id: doc.id });
      });
      setSecurityIncidents(incidentArr);
    });

    return () => unsubscribe();
  }, [securityIncidents]);

  const handleUpdate = async () => {
    if (selectedID) {
      const incidentRef = doc(firestore, "security-incident", selectedID);

      try {
        await updateDoc(incidentRef, {
            title: selectedIncident.title,
            description: selectedIncident.description,
        });
        closeDialog();
      } catch (error) {

      }
    }
  };

  const handleDelete = async () => {
    if(selectedID){
      const incidentRef = doc(firestore, "security-incident", selectedID);
      try {
        await deleteDoc(incidentRef);
        closeDialog();
      } catch (error) {
        
      }
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {securityIncidents.map((incident) => (
            <Box
              component={Paper}
              sx={{
                display: "flex",
                flexDirection: "column",
                padding: 2,
                cursor: "pointer",
              }}
              onClick={() => openDialog(incident)}
            >
              <Typography
                sx={{
                  wordWrap: "break-word",
                }}
              >
                {incident.title}
              </Typography>
              <Typography
                color={theme.palette.secondary.main}
                sx={{
                  wordWrap: "break-word",
                }}
              >
                {incident.description}
              </Typography>
            </Box>
          ))}
        </Box>
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
                name="title"
                label="Incident Title"
                type="text"
                id="title"
                autoComplete="title"
                onChange={handleChange}
                value={selectedIncident.title}
              />
              <TextField
                required
                fullWidth
                name="description"
                label="Description"
                type="text"
                id="description"
                autoComplete="description"
                onChange={handleChange}
                value={selectedIncident.description}
                multiline={true}
                minRows={3}
              />
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
                Update Security Incident
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
                Delete Security Incident
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}
