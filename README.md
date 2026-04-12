# Nitesh Portfolio

Full-stack portfolio website built with React on the frontend and FastAPI on the backend. The project showcases personal information, featured projects, technologies, roadmap items, certificates, and a contact flow.

## Tech Stack

- Frontend: React 19, CRACO, Tailwind CSS, Framer Motion, Radix UI
- Backend: FastAPI, Motor, MongoDB
- Data sources: MongoDB for portfolio data, GitHub API for project data

## Features

- Responsive portfolio landing page
- Animated hero and section transitions
- GitHub project integration with fallback mock data
- Portfolio data API for personal info, technologies, roadmap, and certificates
- Contact form endpoint
- Certificate category routing

## Project Structure

```text
.
|-- frontend/
|   |-- public/
|   |-- src/
|   |-- package.json
|   `-- craco.config.js
|-- backend/
|   |-- services/
|   |-- tests/
|   |-- server.py
|   `-- requirements.txt
|-- tests/
|-- backend_test.py
`-- QUICK_START.txt
```

## Local Setup

### Frontend

1. Install dependencies:

```bash
cd frontend
npm install --legacy-peer-deps
```

2. Create `frontend/.env`:

```env
REACT_APP_BACKEND_URL=http://localhost:8001
```

3. Start the frontend:

```bash
npm start
```

The frontend runs on `http://localhost:3000`.

### Backend

1. Install Python 3.11+.

2. Create and activate a virtual environment:

```bash
cd backend
python -m venv venv
```

Windows PowerShell:

```powershell
.\venv\Scripts\Activate.ps1
```

macOS/Linux:

```bash
source venv/bin/activate
```

3. Install backend dependencies:

```bash
pip install -r requirements.txt
```

4. Create `backend/.env`:

```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=portfolio_db
CORS_ORIGINS=*
```

5. Start the backend:

```bash
uvicorn server:app --reload --port 8001
```

The backend runs on `http://localhost:8001`, with the API available under `http://localhost:8001/api`.

## Important Notes

- The frontend can fall back to mock data if the backend is unavailable.
- The backend expects MongoDB to be running locally unless you change `MONGO_URL`.
- Project data is fetched from the GitHub account configured in `backend/server.py`.

## Helpful Commands

Frontend:

```bash
cd frontend
npm start
npm test
npm run build
```

Backend:

```bash
cd backend
uvicorn server:app --reload --port 8001
pytest
```

## API Overview

- `GET /api/` - health check
- `GET /api/projects` - GitHub-backed project list
- `GET /api/portfolio` - portfolio data
- `POST /api/contact` - contact form submission
- `POST /api/seed-data` - seed initial MongoDB data

## Deployment

### Frontend (Vercel)

1. Sign up at [vercel.com](https://vercel.com) with your GitHub account
2. Click "New Project" and import your repository
3. Configure:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install --legacy-peer-deps`
4. Add environment variable: `REACT_APP_BACKEND_URL` with your backend URL
5. Deploy

### Backend (Railway)

1. Sign up at [railway.app](https://railway.app)
2. Create new project from GitHub repo
3. Configure:
   - **Root Directory**: `backend`
   - Add MongoDB database to project
4. Set environment variables:
   - `MONGO_URL`: Your Railway MongoDB connection string
   - `DB_NAME`: `portfolio_db`
   - `CORS_ORIGINS`: Your Vercel frontend URL
5. Deploy

### Production Environment Setup

After deployment, update the frontend's `REACT_APP_BACKEND_URL` in Vercel with the Railway backend URL.

## Repository Notes

- The Emergent badge and dev overlay references have been removed from the app UI.
- Local `.env` files, logs, and workspace-specific tooling files should stay out of version control.
