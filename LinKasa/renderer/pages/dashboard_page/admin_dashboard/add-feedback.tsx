import { Box, Grid, TextField, Button, Typography } from "@mui/material";
import { MenuItem } from "electron";
import { roles } from "../../../controller/variable-controller";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "../../../lib/firebase-database";

export default function AddFeedback() {
  const [feedback, setFeedback] = useState<Feedback>({
    title: "",
    content: "",
  });

  const handleSubmitFeedback = () => {
    const { title, content } = feedback;
    const feedbackRef = collection(firestore, "feedback");
    let data = {
      title: title,
      content: content,
    };
    try {
      addDoc(feedbackRef, data);
    } catch (error) {
      console.log(error);
    }

    setFeedback({
      title: "",
      content: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback((prevStaff) => ({
      ...prevStaff,
      [name]: value,
    }));
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        Add Feedback
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              autoComplete="title"
              onChange={handleChange}
              value={feedback.title}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="content"
              label="Content"
              name="content"
              multiline
              minRows={4}
              autoComplete="content"
              onChange={handleChange}
              value={feedback.content}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleSubmitFeedback}
        >
          Add Feedback
        </Button>
      </Box>
    </Box>
  );
}
