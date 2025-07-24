const express = require('express');
const app = express();
const logger = require('./index');

app.use(express.json());
app.use(logger);

// Accept multiple URLs in one request 🚀
app.post('/api/shorten', (req, res) => {
  const urls = req.body; // Expecting an array

  if (!Array.isArray(urls)) {
    return res.status(400).json({ message: 'Expected an array of URLs' });
  }

  const results = urls.map(({ url, shortcode, validity }) => ({
    originalUrl: url,
    shortUrl: `http://localhost:3000/${shortcode || Math.random().toString(36).slice(2, 8)}`,
    validity: validity || 30,
  }));

  res.status(200).json(results);
});

app.get('/api/redirect/:code', (req, res) => {
  const code = req.params.code;
  res.redirect('https://example.com');
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
app.get('/', (req, res) => {
  res.send('🔥 Express Server is running! Use POST /api/shorten');
});

