import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import {
  getStaffFromID,
  getStaffRole,
} from "../../controller/staff-controller";
import {
  departmentChatRole,
  roles,
} from "../../controller/variable-controller";
import { useEffect, useRef, useState } from "react";
import { auth, firestore } from "../../lib/firebase-database";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import theme from "../../lib/theme";
import SendIcon from "@mui/icons-material/Send";

export default function DepartmentChat() {
  const [message, setMessage] = useState("");
  const [departmentMessage, setDepartmentMessage] = useState([]);
  const chatBottom = useRef(null);
  const [currChatRoom, setCurrChatRoom] = useState(null);
  const [currUnsubscribe, setCurrUnsubscribe] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const staffRole = getStaffRole();

  const getRoom = (role1, role2) => {
    return [role1, role2].sort().join("-");
  };

  const subscribeToChat = (room) => {
    const chatRoomRef = collection(
      firestore,
      "department-chat",
      room,
      "messages"
    );
    const queryMessages = query(chatRoomRef, orderBy("sentAt"));

    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let msg = [];
      snapshot.forEach((doc) => {
        msg.push({ ...doc.data(), id: doc.id });
      });
      setDepartmentMessage(msg);
      chatBottom.current?.scrollIntoView({ behaviour: "smooth" });
    });
    setCurrUnsubscribe(unsubscribe);
  };

  const unsubscribeFromChat = () => {
    if (currUnsubscribe) {
      currUnsubscribe();
    }
  };

  const handleOpenChatRoom = (department) => {
    const room = getRoom(staffRole, department);
    setCurrChatRoom(room);
    unsubscribeFromChat();
    subscribeToChat(room);
    setSelectedDepartment(department);
  };

  useEffect(() => {
    if (currChatRoom) {
      const chatRoomRef = collection(
        firestore,
        "department-chat",
        currChatRoom,
        "messages"
      );
      const queryMessages = query(chatRoomRef, orderBy("sentAt"));
      const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
        let msg = [];
        snapshot.forEach((doc) => {
          msg.push({ ...doc.data(), id: doc.id });
        });
        setDepartmentMessage(msg);
        chatBottom.current?.scrollIntoView({ behaviour: "smooth" });
      });
      setCurrUnsubscribe(() => unsubscribe);
      return () => unsubscribe();
    }
  }, [currChatRoom]);

  const handleMessage = async (e) => {
    e.preventDefault();

    const staffDetails = await getStaffFromID(auth.currentUser.uid);

    if (message == "") {
      return;
    }
    const roomRef = collection(
      firestore,
      "department-chat",
      currChatRoom,
      "messages"
    );
    await addDoc(roomRef, {
      text: message,
      sentAt: serverTimestamp(),
      user: auth.currentUser.uid,
      staffName: staffDetails?.name,
      staffRole: staffDetails?.role,
    });

    setMessage("");
  };

  useEffect(() => {
    const defaultRole = roles.filter((role) => role !== staffRole);
    if (defaultRole.length > 0) {
      const defaultRoom = getRoom(staffRole, defaultRole[0]);
      handleOpenChatRoom(defaultRole[0]);
      setCurrChatRoom(defaultRoom);
    }
  }, [staffRole]);

  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
      <Box
        component={Paper}
        sx={{
          width: "100%",
          height: "85vh",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexWrap: "nowrap",
            justifyContent: "flex-start",
            padding: "1rem",
            width: "25%",
            height: "100%",
            overflowY: "auto",
            gap: "1rem"
          }}
        >
          {roles.map((role, index) => {
            if (role != staffRole) {
              return (
                <Button
                  key={index}
                  sx={{
                    padding: "0.8rem",
                    // width: "18vw"
                  }}
                  variant={
                    selectedDepartment === role ? "contained" : "outlined"
                  }
                  disableElevation
                  onClick={() => handleOpenChatRoom(role)}
                >
                  {role}
                </Button>
              );
            }
          })}
        </Box>
        {/* chat */}
        <Box
          sx={{
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Grid>
            <Typography variant="h5">Department Room</Typography>
            <Divider />
          </Grid>
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              margin: "1rem 0",
              width: "55vw",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                // gap: "1rem",
              }}
            >
              {departmentMessage.map((msg, idx, arr) => {
                const isSender = auth.currentUser.uid === msg.user;
                const showName = arr[idx - 1]!?.staffName != msg.staffName;
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
                return (
                  <Grid key={msg.id}>
                    <Typography
                      sx={{
                        textAlign: isSender ? "right" : "left",
                        margin: "0 1rem",
                        fontSize: "14px",
                      }}
                    >
                      {showName && (
                        <Typography mt={3}>
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
                  handleMessage(e);
                }
              }}
              sx={{
                width: "90%",
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
              onClick={handleMessage}
            >
              <SendIcon sx={{ color: "white" }} />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
