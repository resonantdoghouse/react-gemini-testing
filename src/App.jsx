import { useState } from "react";
import { marked } from "marked";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post(`http://localhost:5050/prompt`, {
      message,
    });

    setResponseMessage(marked(response.data.response));
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        React Gemini Chat
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
      <Box sx={{ padding: 2 }}>
        <Box
          sx={{
            mt: 2,
            p: 2,
            border: "1px solid #ddd",
            borderRadius: 1,
            backgroundColor: "#f9f9f9",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            textAlign: "left",
            // maxHeight: "300px",
            overflowY: "auto",
          }}
          dangerouslySetInnerHTML={{ __html: responseMessage }}
        />
      </Box>
    </Container>
  );
}

export default App;
