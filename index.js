require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const routes = require('./src/routes');
const prisma = require('./src/lib/prisma');
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

// Error handling middleware for Prisma
app.use((err, req, res, next) => {
  if (err instanceof prisma.PrismaClientKnownRequestError) {
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
  console.log(`Server is running on port ${port}`);
});
