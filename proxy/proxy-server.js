const express = require('express');
const request = require('request');
const app = express();

const PORT = process.env.PORT || 3000;

app.use('/proxy', (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) return res.status(400).send('Missing url parameter');

  const options = {
    url: targetUrl,
    headers: {
      Origin: 'https://yourdomain.com', // Replace with your domain or localhost for testing
      // 'X-Requested-With': 'XMLHttpRequest' // Optional header if needed
    },
  };

  req.pipe(request(options)).pipe(res);
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
