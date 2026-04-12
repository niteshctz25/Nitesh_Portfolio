#!/bin/bash

echo "🚀 Nitesh Singh Portfolio - Quick Setup"
echo "========================================"
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    exit 1
fi

# Check Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.11+ first."
    exit 1
fi

# Check Yarn
if ! command -v yarn &> /dev/null; then
    echo "📦 Yarn not found. Installing Yarn..."
    npm install -g yarn
fi

echo "✅ Prerequisites check passed!"
echo ""

# Setup Frontend
echo "🎨 Setting up Frontend..."
cd frontend
yarn install
echo "✓ Frontend dependencies installed"
echo ""

# Setup Backend
echo "🔧 Setting up Backend..."
cd ../backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
echo "✓ Backend dependencies installed"
echo ""

echo "✅ Setup Complete!"
echo ""
echo "📝 Next Steps:"
echo "1. Create frontend/.env with REACT_APP_BACKEND_URL=http://localhost:8001"
echo "2. Create backend/.env with your MongoDB connection"
echo "3. Start backend: cd backend && source venv/bin/activate && uvicorn server:app --reload --port 8001"
echo "4. Start frontend: cd frontend && yarn start"
echo ""
echo "🌐 Portfolio will be available at http://localhost:3000"
