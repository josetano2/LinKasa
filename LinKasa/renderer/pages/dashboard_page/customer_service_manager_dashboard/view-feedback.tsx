import {
  Box,
  Container,
  Paper,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { firestore } from "../../../lib/firebase-database";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import theme from "../../../lib/theme";

export default function ViewFeedback() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    const feedbackRef = collection(firestore, "feedback");

    const unsubscribe = onSnapshot(feedbackRef, (QuerySnapshot) => {
      let feedbackArr = [];
      QuerySnapshot.forEach((doc) => {
        feedbackArr.push({ ...doc.data(), id: doc.id });
      });
      setFeedbacks(feedbackArr);
    });

    return () => unsubscribe();
  }, [feedbacks]);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
        <Box
        sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2
        }}
        >
          {feedbacks.map((feedback) => (
            <Box
              component={Paper}
              sx={{
                display: "flex",
                flexDirection: "column",
                padding: 2,
              }}
            >
              <Typography 
              sx={{
                wordWrap: "break-word",
              }}>{
              feedback.title}
              </Typography>
              <Typography color={theme.palette.secondary.main}
              sx={{
                wordWrap: "break-word",
              }}
              >
                {feedback.content}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
