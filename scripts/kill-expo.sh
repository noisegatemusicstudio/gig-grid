#!/bin/bash

echo "🔄 Killing existing Expo/Metro processes..."

# Kill Expo processes
pkill -f "expo start" 2>/dev/null || true
pkill -f "expo run" 2>/dev/null || true

# Kill Metro bundler
pkill -f "metro" 2>/dev/null || true
pkill -f "react-native" 2>/dev/null || true

# Kill processes on common ports
echo "🔄 Freeing up ports 8080, 8081, 19000-19002..."
lsof -ti:8080 | xargs kill -9 2>/dev/null || true
lsof -ti:8081 | xargs kill -9 2>/dev/null || true
lsof -ti:19000 | xargs kill -9 2>/dev/null || true
lsof -ti:19001 | xargs kill -9 2>/dev/null || true
lsof -ti:19002 | xargs kill -9 2>/dev/null || true

# Kill any Node.js processes that might be running Expo
ps aux | grep -i "node.*expo" | grep -v grep | awk '{print $2}' | xargs kill -9 2>/dev/null || true

# Wait a moment for processes to fully terminate
sleep 1

echo "✅ Cleanup complete!"
