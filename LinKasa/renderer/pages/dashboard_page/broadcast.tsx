import {
  Box,
  Grid,
  Paper,
  TextField,
  IconButton,
  InputAdornment,
  Typography,
  Divider,
  Dialog,
  Button,
  DialogContent,
} from "@mui/material";
import CallMadeIcon from "@mui/icons-material/CallMade";
import { useEffect, useRef, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, firestore } from "../../lib/firebase-database";
import { ThemeProvider, useTheme } from "@emotion/react";
import theme from "../../lib/theme";
import {
  getStaffFromID,
  getStaffRole,
} from "../../controller/staff-controller";
import SendIcon from "@mui/icons-material/Send";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

export default function Broadcast() {
  const [message, setMessage] = useState("");
  const broadcastRef = collection(firestore, "new-broadcast");
  const [broadcastMessage, setBroadcastMessage] = useState([]);
  const chatBottom = useRef(null);
  const role = getStaffRole();

  // dialog
  const [open, setOpen] = useState(false);
  const [msgID, setMsgID] = useState("");
  const [selectedMsg, setSelectedMsg] = useState(null);

  const openDialog = (msg) => {
    if(msg.user !== auth.currentUser.uid){
      return;
    }
    setOpen(true);
    setMsgID(msg.id);
    setSelectedMsg({ text: msg.text });
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedMsg((prevMsg) => ({
      ...prevMsg,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    console.log(msgID);
    if (msgID) {
      const msgRef = doc(firestore, "new-broadcast", msgID);

      try {
        await updateDoc(msgRef, {
          text: selectedMsg.text,
        });
        closeDialog();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDelete = async () => {
    if (msgID) {
      const msgRef = doc(firestore, "new-broadcast", msgID);
      try {
        await deleteDoc(msgRef);
        closeDialog();
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const queryMessages = query(broadcastRef, orderBy("sentAt"));
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let msg = [];
      snapshot.forEach((doc) => {
        msg.push({ ...doc.data(), id: doc.id });
      });
      setBroadcastMessage(msg);
      chatBottom.current?.scrollIntoView({ behaviour: "smooth" });
    });
    return () => unsubscribe();
  }, []);

  const handleBroadcast = async (e) => {
    e.preventDefault();

    const staffDetails = await getStaffFromID(auth.currentUser.uid);

    if (message == "") {
      return;
    }
    await addDoc(broadcastRef, {
      text: message,
      sentAt: serverTimestamp(),
      user: auth.currentUser.uid,
      staffName: staffDetails?.name,
      staffRole: staffDetails?.role,
    });

    setMessage("");
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        component={Paper}
        sx={{
          margin: "1rem",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          height: "85%",
        }}
      >
        <Grid>
          <Typography variant="h5">Broadcast Room</Typography>
          <Divider />
        </Grid>
        <Box
          sx={{
            overflowY: "auto",
            margin: "1rem 0",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              // gap: "1rem",
            }}
          >
            {broadcastMessage.map((msg, idx, arr) => {
              const isSender = auth.currentUser.uid === msg.user;
              const showName = arr[idx - 1]!?.staffName !== msg.staffName;
              var time = "";
              if (msg.sentAt) {
                const date = msg.sentAt.toDate();
                time = date.toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                });
              }
              // msg box

              return (
                <Grid
                  key={msg.id}
                  sx={{
                    cursor: "pointer",
                  }}
                  onClick={() => openDialog(msg)}
                >
                  <Typography
                    sx={{
                      textAlign: isSender ? "right" : "left",
                      margin: "0 1rem",
                      fontSize: "14px",
                    }}
                  >
                    {showName && (
                      <Typography>
                        {msg.staffName} ({msg.staffRole})
                      </Typography>
                    )}
                  </Typography>
                  <Box
                    sx={{
                      maxWidth: "35%",
                      width: "fit-content",
                      px: 2,
                      py: 1,
                      backgroundColor: isSender ? "#034d96" : "#e8e8e8",
                      marginLeft: isSender ? "auto" : "1rem",
                      marginRight: isSender ? "1rem" : "auto",
                      borderWidth: isSender ? "none" : "10px",
                      borderColor: "black",
                      borderRadius: 2,
                    }}
                  >
                    <Typography
                      align={isSender ? "right" : "left"}
                      sx={{
                        color: isSender ? "white" : "black",
                        wordWrap: "break-word",
                      }}
                    >
                      {msg.text}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      textAlign: isSender ? "right" : "left",
                      margin: "0 1rem",
                      fontSize: "12px",
                      color: theme.palette.text.secondary,
                    }}
                  >
                    {time}
                  </Typography>
                </Grid>
              );
            })}
            <div ref={chatBottom} />
          </Box>
        </Box>
        {role === "Customer Service Manager" && (
          <Box
            sx={{
              marginTop: "auto",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TextField
                id="chat"
                label="Chat"
                type="chat"
                variant="filled"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleBroadcast(e);
                  }
                }}
                sx={{
                  width: "93%",
                }}
              />
              <IconButton
                aria-label="send"
                sx={{
                  backgroundColor: "#034d96",
                  padding: 2,
                  "&:hover": {
                    backgroundColor: "#034d96",
                  },
                }}
                onClick={handleBroadcast}
              >
                <SendIcon sx={{ color: "white" }} />
              </IconButton>
            </Box>
          </Box>
        )}
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
              name="text"
              label="Text"
              type="text"
              id="text"
              autoComplete="text"
              onChange={handleChange}
              value={selectedMsg?.text}
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
              Update Message
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
              Delete Message
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
}
