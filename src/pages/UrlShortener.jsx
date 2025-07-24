import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
} from '@mui/material';

const UrlShortener = () => {
  const [inputs, setInputs] = useState([
    { url: '', validity: '', shortcode: '' }
  ]);
  const [results, setResults] = useState([]);

  const handleChange = (index, field, value) => {
    const updated = [...inputs];
    updated[index][field] = value;
    setInputs(updated);
  };

  const handleAdd = () => {
    if (inputs.length < 5) {
      setInputs([...inputs, { url: '', validity: '', shortcode: '' }]);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });

      if (!response.ok) throw new Error("Failed to shorten URLs");

      const data = await response.json();
      setResults(data);
    } catch (err) {
      console.error("Error submitting URLs:", err.message);
      alert("Something went wrong!");
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #fceabb, #f8b500)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 4,
          maxWidth: 900,
          width: '100%',
          backgroundColor: '#fff',
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
          🔗 URL Shortener
        </Typography>

        {inputs.map((input, idx) => (
          <Grid container spacing={2} key={idx} sx={{ mb: 2 }}>
            <Grid item xs={12} md={4}>
              <TextField
                label="Long URL"
                value={input.url}
                onChange={(e) => handleChange(idx, 'url', e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField
                label="Validity (mins)"
                type="number"
                value={input.validity}
                onChange={(e) => handleChange(idx, 'validity', e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField
                label="Custom Shortcode"
                value={input.shortcode}
                onChange={(e) => handleChange(idx, 'shortcode', e.target.value)}
                fullWidth
              />
            </Grid>
          </Grid>
        ))}

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
          <Button variant="outlined" onClick={handleAdd}>
            ➕ Add URL
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            🚀 Submit
          </Button>
        </Box>

        {results.length > 0 && (
          <Box mt={4}>
            <Typography variant="h5" gutterBottom>✨ Shortened URLs</Typography>
            {results.map((r, i) => (
              <Paper key={i} elevation={2} sx={{ mb: 2, p: 2, borderRadius: 2 }}>
                <Typography>🔗 <a href={r.shortUrl} target="_blank" rel="noreferrer">{r.shortUrl}</a></Typography>
                <Typography>⏳ Valid for: {r.validity} minutes</Typography>
                <Typography>🌐 Original: {r.originalUrl}</Typography>
              </Paper>
            ))}
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default UrlShortener;
