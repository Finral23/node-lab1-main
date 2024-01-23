import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

// Create a simple route in your local Express app
app.get('/', (req, res) => {
  res.send('Hello, World! This is the local server.');
});

// Define the target server to proxy to
const targetServer = 'https://node-lab1-main.fly.dev'; // Replace with the target server URL

// Create the proxy middleware
const proxyMiddleware = createProxyMiddleware({
  target: targetServer,
  changeOrigin: true, // Necessary for the correct target server routing
});

// Use the proxy middleware for all routes
app.use('/', proxyMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Proxy server is running on http://localhost:${PORT}');
});