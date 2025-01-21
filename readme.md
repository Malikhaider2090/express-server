# Healthcare API

A Node.js Express API for healthcare appointment management.

## Project Setup

### Prerequisites
- Node.js (v18 or higher)
- pnpm (v8 or higher)
- PostgreSQL (v14 or higher)
- Git

# Healthcare API Setup Guide

## Step 1: Project Setup

## Step 2: Initialize Prisma

## Step 3: Configure Database

1. Create `.env` file:

## Step 4: Create Project Structure

## Step 5: Create Base Files

1. Create `src/lib/prisma.js`:

```javascript
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
module.exports = prisma;
```
