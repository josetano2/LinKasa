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
import ViewEmployeeTraining from "./view-employee-training";
  
  export default function EmployeeTraining() {
    const [employeeTraining, setEmployeeTraining] = useState<EmployeeTraining>({
      title: "",
      description: "",
    });
    const [open, setOpen] = useState(false);
  
    const handleAdd = (e) => {
      e.preventDefault();
      const { title, description } = employeeTraining;
      const employeeTrainingRef = collection(firestore, "employee-training");
  
      let data = {
        title: title,
        description: description,
      };
      try {
        addDoc(employeeTrainingRef, data);
        setEmployeeTraining({
            title: "",
            description: ""
        })
        closeDialog();
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
      setEmployeeTraining((prevEmployeeTraining) => ({
        ...prevEmployeeTraining,
        [name]: value,
      }));
    };
  
    return (
      <Container maxWidth="lg" sx={{ mt: 2, mb: 4, position: "relative" }}>
        <Typography sx={{ mb: 2 }} variant="h5" color="initial">
          Employee Training
        </Typography>
        <ViewEmployeeTraining />
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
              gap: 2,
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
                label="Training Title"
                type="text"
                id="title"
                autoComplete="title"
                onChange={handleChange}
                value={employeeTraining.title}
              />
  
              <TextField
                required
                fullWidth
                name="description"
                label="Training Description"
                type="text"
                id="description"
                autoComplete="description"
                onChange={handleChange}
                value={employeeTraining.description}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={handleAdd}
              >
                Add Employee Training
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      </Container>
    );
  }
  