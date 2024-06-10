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
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import theme from "../../../lib/theme";
import { lostAndFoundStatus } from "../../../controller/variable-controller";

export default function ViewEmployeeTraining() {
  const [employeeTrainings, setEmployeeTrainings] = useState<
    EmployeeTraining[]
  >([]);
  const [open, setOpen] = useState(false);
  const [selectedEmployeeTraining, setSelectedEmployeeTraining] =
    useState<EmployeeTraining>({
      title: "",
      description: "",
    });
  const [selectedID, setSelectedID] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedEmployeeTraining((prevEmployeeTraining) => ({
      ...prevEmployeeTraining,
      [name]: value,
    }));
  };

  const openDialog = (training) => {
    setOpen(true);
    setSelectedID(training.id);
    setSelectedEmployeeTraining({
      ...training,
    });
  };

  const closeDialog = () => {
    setOpen(false);
  };

  useEffect(() => {
    const employeeTrainingRef = collection(firestore, "employee-training");

    const unsubscribe = onSnapshot(employeeTrainingRef, (QuerySnapshot) => {
      let trainingArr = [];
      QuerySnapshot.forEach((doc) => {
        trainingArr.push({ ...doc.data(), id: doc.id });
      });
      setEmployeeTrainings(trainingArr);
    });

    return () => unsubscribe();
  }, [employeeTrainings]);

  const handleUpdate = async () => {
    if (selectedID) {
      const employeeTrainingRef = doc(firestore, "employee-training", selectedID);

      try {
        await updateDoc(employeeTrainingRef, {
          title: selectedEmployeeTraining.title,
          description: selectedEmployeeTraining.description,
        });
        closeDialog();
      } catch (error) {}
    }
  };

  const handleDelete = async () => {
    if (selectedID) {
      const employeeTrainingRef = doc(firestore, "employee-training", selectedID);
      try {
        await deleteDoc(employeeTrainingRef);
        closeDialog();
      } catch (error) {}
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {employeeTrainings.map((training) => (
            <Box
              component={Paper}
              sx={{
                display: "flex",
                flexDirection: "column",
                padding: 2,
                cursor: "pointer",
              }}
              onClick={() => openDialog(training)}
            >
              <Typography
                sx={{
                  wordWrap: "break-word",
                }}
              >
                {training.title}
              </Typography>
              <Typography
                color={theme.palette.secondary.main}
                sx={{
                  wordWrap: "break-word",
                }}
              >
                {training.description}
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
                value={selectedEmployeeTraining.title}
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
                value={selectedEmployeeTraining.description}
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
                Update Employee Training
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
                Delete Employee Training
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
}
