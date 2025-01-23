require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const routes = require('./src/routes');
const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 3000;

// Use Morgan for logging
app.use(morgan('dev'));

// Parse JSON bodies
app.use(express.json());

// Use the main routes
app.use('/api', routes);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Express API!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    return res.status(400).json({ error: err.message });
  }
  next(err);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit();
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})
.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use.`);
    process.exit(1); // Exit the process with an error code
  } else {
    console.error('An error occurred:', err);
  }
});
