import {
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import {
  QuerySnapshot,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../../../lib/firebase-database";
import Image from "next/image";
import { ThemeProvider } from "@emotion/react";
import theme from "../../../lib/theme";
import { lostAndFoundStatus } from "../../../controller/variable-controller";

export default function ViewLostAndFoundItem() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<LostAndFoundItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<LostAndFoundItem>({
    itemName: "",
    image: "",
    description: "",
    status: "Unclaimed",
  });
  const [selectedID, setSelectedID] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  useEffect(() => {
    const itemRef = collection(firestore, "lost-and-found-items");
    const q = query(itemRef);

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let itemArr = [];
      QuerySnapshot.forEach((doc) => {
        itemArr.push({ ...doc.data(), id: doc.id });
      });
      setItems(itemArr);
    });
    return () => unsubscribe();
  }, []);

  const handleUpdate = async () => {
    if (selectedID) {
      const itemRef = doc(firestore, "lost-and-found-items", selectedID);

      try {
        await updateDoc(itemRef, {
          itemName: selectedItem.itemName,
          image: selectedItem.image,
          description: selectedItem.description,
          status: selectedItem.status,
        });
        closeDialog();
      } catch (error) {

      }
    }
  };

  const handleDelete = async () => {
    if(selectedID){
      const itemRef = doc(firestore, "lost-and-found-items", selectedID);
      try {
        await deleteDoc(itemRef);
        closeDialog();
      } catch (error) {
        
      }
    }
  }

  const openDialog = (item) => {
    setOpen(true);
    setSelectedID(item.id)
    setSelectedItem({
      ...item,
    });
  };

  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="lg"
        sx={{
          mt: 2,
          mb: 4,
          ml: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            justifyContent: "flex-start",
          }}
        >
          {items.map((item) => (
            <Box
              component={Paper}
              sx={{
                width: "20rem",
                display: "flex",
                padding: 2,
                flexDirection: "column",
                cursor: "pointer",
              }}
              onClick={() => openDialog(item)}
            >
              <Box
                sx={{
                  padding: 1,
                  width: "100%",
                }}
              >
                <Image
                  src={item.image}
                  width={250}
                  height={250}
                  objectFit="contain"
                  layout="responsive"
                />
              </Box>
              <Box sx={{}}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body1" color="initial">
                    {item.itemName}
                  </Typography>
                  <Box
                    sx={{
                      backgroundColor:
                        item.status === "Returned to Owner"
                          ? "#52ff52"
                          : "#ff5252",
                      padding: 1,
                      borderRadius: 2,
                      color:
                        item.status === "Returned to Owner"
                          ? "#006900"
                          : "#690000",
                    }}
                  >
                    {item.status}
                  </Box>
                </Box>
                <Typography
                  sx={{ color: theme.palette.text.secondary, mt: 1 }}
                  variant="body1"
                  color="initial"
                >
                  {item.description}
                </Typography>
              </Box>
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
                name="itemName"
                label="Item Name"
                type="text"
                id="itemName"
                autoComplete="itemName"
                onChange={handleChange}
                value={selectedItem.itemName}
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
                value={selectedItem.image}
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
                value={selectedItem.description}
                multiline={true}
                minRows={3}
              />
              <TextField
                name="status"
                label="Status"
                select
                fullWidth
                required
                value={selectedItem.status}
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
                {lostAndFoundStatus.map((s, index) => (
                  <MenuItem key={index} value={s}>
                    {s}
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
                Update Item
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
                Delete Item
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
}
