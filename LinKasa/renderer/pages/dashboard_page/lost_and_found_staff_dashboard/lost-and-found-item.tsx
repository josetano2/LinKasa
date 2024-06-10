import { ThemeProvider } from "@emotion/react";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  Fab,
  Grid,
  MenuItem,
  Paper,
  TextField,
} from "@mui/material";
import { useState } from "react";
import theme from "../../../lib/theme";
import AddIcon from "@mui/icons-material/Add";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "../../../lib/firebase-database";
import ViewLostAndFoundItem from "./view-lost-and-found-item";

export default function LostAndFoundItem() {
  const [open, setOpen] = useState(false);
  const initialLostAndFoundItem = {
    itemName: "",
    image: "",
    description: "",
    status: "Unclaimed",
  };

  const [item, setItem] = useState<LostAndFoundItem>(
    initialLostAndFoundItem as LostAndFoundItem
  );

  const handleAdd = (e) => {
    e.preventDefault();
    const { itemName, image, description, status } = item;
    const lostItemRef = collection(firestore, "lost-and-found-items")
    let data = {
        itemName: itemName,
        image: image,
        description: description,
        status: status
    }

    try {
        addDoc(lostItemRef, data)
    } catch (error) {
        console.log(error)
    }
    closeDialog();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const openDialog = () => {
    setItem(initialLostAndFoundItem as LostAndFoundItem);
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
        <ViewLostAndFoundItem />
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
                ".MuiTextField-root": {
                  mb: 1.5,
                },
              }}
            >
              <TextField
                required
                fullWidth
                name="itemName"
                label="Item Name"
                type="text"
                id="itemName"
                autoComplete="itemName"
                onChange={handleChange}
                value={item.itemName}
              />
              <TextField
                required
                fullWidth
                name="image"
                label="Image"
                type="text"
                id="image"
                autoComplete="image"
                onChange={handleChange}
                value={item.image}
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
                value={item.description}
                multiline={true}
                minRows={3}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={handleAdd}
              >
                Add Lost and Found Item
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
}
