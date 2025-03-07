import { useState } from "react";
import { Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(message);
    const response = await axios.post(`http://localhost:5050/prompt`, {
      message,
    });

    console.log(response.data.response);

    setResponseMessage(response.data.response);
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to Vite + Material UI
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Your Prompt"
          variant="outlined"
          multiline
          rows={4} // Makes it a textarea
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>

      <Typography
        variant="body1"
        align="left"
        sx={{ textAlign: "left", marginTop: 2, marginBottom: 2 }}
      >
        {responseMessage}
      </Typography>
    </Container>
  );
}

export default App;
