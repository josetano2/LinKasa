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
  
  export default function ViewAirportFacility() {
    const [facilities, setFacilities] = useState<
      Facility[]
    >([]);
    const [open, setOpen] = useState(false);
    const [selectedFacility, setSelectedFacility] = useState<Facility>({
        name: "",
        description: "",
        status: "Available",
        maintenanceSchedule: null,
        maintenanceCheckSchedule: null,
    });
    const [selectedID, setSelectedID] = useState("");
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setSelectedFacility((prevFacility) => ({
        ...prevFacility,
        [name]: value,
      }));
    };
  
    const openDialog = (facility) => {
      setOpen(true);
      setSelectedID(facility.id)
      setSelectedFacility({
        ...facility,
      });
    };
  
    const closeDialog = () => {
      setOpen(false);
    };
  
    useEffect(() => {
      const facilityRef = collection(firestore, "facility");
  
      const unsubscribe = onSnapshot(facilityRef, (QuerySnapshot) => {
        let facilityArr = [];
        QuerySnapshot.forEach((doc) => {
            facilityArr.push({ ...doc.data(), id: doc.id });
        });
        setFacilities(facilityArr);
      });
  
      return () => unsubscribe();
    }, [facilities]);
  
    const handleUpdate = async () => {
      if (selectedID) {
        const facilityRef = doc(firestore, "facility", selectedID);
  
        try {
          await updateDoc(facilityRef, {
            name: selectedFacility.name,
            description: selectedFacility.description,
            status: selectedFacility.status,
            maintenanceSchedule: selectedFacility.maintenanceSchedule,
            maintenanceCheckSchedule: selectedFacility.maintenanceCheckSchedule,
          });
          closeDialog();
        } catch (error) {
  
        }
      }
    };
  
    const handleDelete = async () => {
      if(selectedID){
        const facilityRef = doc(firestore, "facility", selectedID);
        try {
          await deleteDoc(facilityRef);
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
            {facilities.map((facility) => (
              <Box
                component={Paper}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  padding: 2,
                  cursor: "pointer",
                }}
                onClick={() => openDialog(facility)}
              >
                <Typography
                  sx={{
                    wordWrap: "break-word",
                  }}
                >
                  {facility.name}
                </Typography>
                <Typography
                  color={theme.palette.secondary.main}
                  sx={{
                    wordWrap: "break-word",
                  }}
                >
                  {facility.description}
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
                  name="name"
                  label="Facility Name"
                  type="text"
                  id="name"
                  autoComplete="name"
                  onChange={handleChange}
                  value={selectedFacility.name}
                />
                <TextField
                  required
                  fullWidth
                  name="description"
                  label="Facility Description"
                  type="text"
                  id="description"
                  autoComplete="description"
                  onChange={handleChange}
                  value={selectedFacility.description}
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
                  Update Facility
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
                  Delete Facility
                </Button>
              </Box>
            </DialogContent>
          </Dialog>
        </Box>
      </ThemeProvider>
    );
  }
  