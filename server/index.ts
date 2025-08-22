import 'dotenv/config';
import express, { type Request, Response, NextFunction } from "express";
import { createServer } from "http";
import authRoutes from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import fetch from 'node-fetch';

// Debug environment variables
console.log('Environment check:');
console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'SET' : 'NOT SET');
console.log('NODE_ENV:', process.env.NODE_ENV);

const app = express();

// Add CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// Mount API routes
app.use('/api', authRoutes);

// Proxy endpoint for OpenRouter
app.post('/api/chat', async (req, res) => {
  console.log('Received /api/chat request:', req.body); // Debug log
  try {
    const response = await fetch('https://openrouter.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': req.headers.origin || 'http://localhost:5000',
        'X-Title': 'SomaSmart EduHub'
      },
      body: JSON.stringify(req.body)
    });
    console.log('OpenRouter response status:', response.status); // Debug log
    const text = await response.text();
    console.log('OpenRouter raw response:', text); // Log raw response
    let data;
    try {
      data = JSON.parse(text);
    } catch (err) {
      console.error('Failed to parse JSON:', err);
      return res.status(500).json({ error: 'Proxy error', details: 'OpenRouter returned non-JSON response', raw: text });
    }
    console.log('OpenRouter response data:', data); // Debug log
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Proxy error:', error); // Debug log
    res.status(500).json({ error: 'Proxy error', details: error instanceof Error ? error.message : error });
  }
});

(async () => {
  const server = createServer(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 5000;
  const host = "0.0.0.0";
  server.listen(port, host, () => {
    log(`serving on port ${port}`);
  });
})();
