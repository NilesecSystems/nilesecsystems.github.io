#!/bin/bash

# Start both frontend and backend servers
echo "Starting development servers..."

# Start backend in background
npm run dev:server &
BACKEND_PID=$!

# Start frontend
npm run dev &
FRONTEND_PID=$!

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID

